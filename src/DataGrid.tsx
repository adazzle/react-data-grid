import React, {
  forwardRef,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  useEffect,
  useImperativeHandle,
  createElement
} from 'react';

import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import HeaderRow from './HeaderRow';
import FilterRow from './FilterRow';
import RowRenderer from './RowRenderer';
import SummaryRow from './SummaryRow';
import { ValueFormatter } from './formatters';
import {
  assertIsValidKey,
  getColumnMetrics,
  getColumnScrollPosition,
  getHorizontalRangeToRender,
  getScrollbarSize,
  getVerticalRangeToRender,
  getViewportColumns
} from './utils';

import {
  CalculatedColumn,
  CheckCellIsEditableEvent,
  Column,
  Filters,
  FormatterProps,
  Position,
  RowExpandToggleEvent,
  RowRendererProps,
  RowsUpdateEvent,
  ScrollPosition,
  SelectedRange,
  SelectRowEvent
} from './common/types';
import { CellNavigationMode, SortDirection } from './common/enums';

export interface DataGridHandle {
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  selectCell: (position: Position, openEditor?: boolean) => void;
  openCellEditor: (rowIdx: number, colIdx: number) => void;
}

export interface DataGridProps<R, K extends keyof R, SR = unknown> {
  /**
   * Grid and data Props
   */
  /** An array of objects representing each column on the grid */
  columns: readonly Column<R, SR>[];
  /** A function called for each rendered row that should return a plain key/value pair object */
  rows: readonly R[];
  /**
   * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
   * Bottom horizontal scroll bar can move the row left / right. Or a customized row renderer can be used to disabled the scrolling support.
   */
  summaryRows?: readonly SR[];
  /** The primary key property of each row */
  rowKey?: K;
  /**
   * Callback called whenever row data is updated
   * When editing is enabled, this callback will be called for the following scenarios
   * 1. Using the supplied editor of the column. The default editor is the SimpleTextEditor.
   * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
   * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
   * 4. Update all cells under a given cell by double clicking the cell's fill handle.
   */
  onRowsUpdate?: <E extends RowsUpdateEvent>(event: E) => void;

  /**
   * Dimensions props
   */
  /** The width of the grid in pixels */
  width?: number;
  /** The height of the grid in pixels */
  height?: number;
  /** Minimum column width in pixels */
  minColumnWidth?: number;
  /** The height of each row in pixels */
  rowHeight?: number;
  /** The height of the header row in pixels */
  headerRowHeight?: number;
  /** The height of the header filter row in pixels */
  headerFiltersHeight?: number;

  /**
   * Feature props
   */
  /** Set of selected row keys */
  selectedRows?: ReadonlySet<R[K]>;
  /** Function called whenever row selection is changed */
  onSelectedRowsChange?: (selectedRows: Set<R[K]>) => void;
  /** The key of the column which is currently being sorted */
  sortColumn?: string;
  /** The direction to sort the sortColumn*/
  sortDirection?: SortDirection;
  /** Function called whenever grid is sorted*/
  onSort?: (columnKey: string, direction: SortDirection) => void;
  filters?: Filters;
  onFiltersChange?: (filters: Filters) => void;

  /**
   * Custom renderers
   */
  defaultFormatter?: React.ComponentType<FormatterProps<R, SR>>;
  rowRenderer?: React.ComponentType<RowRendererProps<R, SR>>;
  rowGroupRenderer?: React.ComponentType;
  emptyRowsView?: React.ComponentType<{}>;
  /** Component used to render a draggable header cell */
  draggableHeaderCell?: React.ComponentType<{ column: CalculatedColumn<R, SR>; onHeaderDrop: () => void }>;

  /**
   * Event props
   */
  /** Function called whenever a row is clicked */
  onRowClick?: (rowIdx: number, row: R, column: CalculatedColumn<R, SR>) => void;
  /** Called when the grid is scrolled */
  onScroll?: (scrollPosition: ScrollPosition) => void;
  /** Called when a column is resized */
  onColumnResize?: (idx: number, width: number) => void;
  onHeaderDrop?: () => void;
  onRowExpandToggle?: (event: RowExpandToggleEvent) => void;
  /** Function called whenever selected cell is changed */
  onSelectedCellChange?: (position: Position) => void;
  /** Function called whenever selected cell range is changed */
  onSelectedCellRangeChange?: (selectedRange: SelectedRange) => void;
  /** called before cell is set active, returns a boolean to determine whether cell is editable */
  onCheckCellIsEditable?: (event: CheckCellIsEditableEvent<R, SR>) => boolean;

  /**
   * Toggles and modes
   */
  /** Toggles whether filters row is displayed or not */
  enableFilters?: boolean;
  /** Toggles whether cells should be autofocused */
  enableCellAutoFocus?: boolean;
  enableCellCopyPaste?: boolean;
  enableCellDragAndDrop?: boolean;
  cellNavigationMode?: CellNavigationMode;

  /**
   * Miscellaneous
   */
  /** The node where the editor portal should mount. */
  editorPortalTarget?: Element;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
*/
function DataGrid<R, K extends keyof R, SR>({
  rowKey,
  rowHeight = 35,
  headerRowHeight = rowHeight,
  headerFiltersHeight = 45,
  minColumnWidth = 80,
  height = 350,
  width,
  enableCellAutoFocus = true,
  enableFilters = false,
  enableCellCopyPaste = false,
  enableCellDragAndDrop = false,
  cellNavigationMode = CellNavigationMode.NONE,
  editorPortalTarget = document.body,
  defaultFormatter = ValueFormatter,
  columns: rawColumns,
  rows,
  rowRenderer,
  rowGroupRenderer,
  summaryRows,
  selectedRows,
  onRowClick,
  onRowExpandToggle,
  onSelectedCellChange,
  onSelectedCellRangeChange,
  onSelectedRowsChange,
  ...props
}: DataGridProps<R, K, SR>, ref: React.Ref<DataGridHandle>) {
  /**
   * refs
   * */
  const gridRef = useRef<HTMLDivElement>(null);
  const lastSelectedRowIdx = useRef(-1);

  /**
   * states
   */
  const [eventBus] = useState(() => new EventBus());
  const [gridWidth, setGridWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState<ReadonlyMap<string, number>>(() => new Map());

  /**
   * computed values
   */
  const viewportWidth = (width || gridWidth) - 2; // 2 for border width;

  const columnMetrics = useMemo(() => {
    return getColumnMetrics<R, SR>({
      columns: rawColumns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultFormatter
    });
  }, [columnWidths, rawColumns, defaultFormatter, minColumnWidth, viewportWidth]);

  const { columns, lastFrozenColumnIndex } = columnMetrics;
  // FIXME?
  const clientHeight = height - (columnMetrics.totalColumnWidth > viewportWidth ? getScrollbarSize() : 0);

  const [colOverscanStartIdx, colOverscanEndIdx] = useMemo((): [number, number] => {
    return getHorizontalRangeToRender({
      columnMetrics,
      viewportWidth,
      scrollLeft
    });
  }, [scrollLeft, columnMetrics, viewportWidth]);

  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    return getViewportColumns(
      columns,
      colOverscanStartIdx,
      colOverscanEndIdx
    );
  }, [colOverscanEndIdx, colOverscanStartIdx, columns]);

  const [rowOverscanStartIdx, rowOverscanEndIdx] = getVerticalRangeToRender(
    clientHeight,
    rowHeight,
    scrollTop,
    rows.length
  );

  /**
   * effects
   */
  useLayoutEffect(() => {
    // Do not calculate the width if width is provided
    if (width) return;
    function onResize() {
      // Immediately re-render when the component is mounted to get valid columnMetrics.
      setGridWidth(gridRef.current!.getBoundingClientRect().width);
    }
    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [width]);

  useEffect(() => {
    if (!onSelectedRowsChange) return;

    const handleRowSelectionChange = ({ rowIdx, checked, isShiftClick }: SelectRowEvent) => {
      assertIsValidKey(rowKey);
      const newSelectedRows = new Set(selectedRows);
      const rowId = rows[rowIdx][rowKey];

      if (checked) {
        newSelectedRows.add(rowId);
        const previousRowIdx = lastSelectedRowIdx.current;
        lastSelectedRowIdx.current = rowIdx;
        if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
          const step = Math.sign(rowIdx - previousRowIdx);
          for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
            newSelectedRows.add(rows[i][rowKey]);
          }
        }
      } else {
        newSelectedRows.delete(rowId);
        lastSelectedRowIdx.current = -1;
      }

      onSelectedRowsChange(newSelectedRows);
    };

    return eventBus.subscribe('SELECT_ROW', handleRowSelectionChange);
  }, [eventBus, onSelectedRowsChange, rows, rowKey, selectedRows]);

  useImperativeHandle(ref, () => ({
    scrollToColumn,
    scrollToRow,
    selectCell,
    openCellEditor
  }));

  /**
   * event handlers
   */
  function onScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    props.onScroll?.({ scrollTop, scrollLeft });
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, width: number) {
    const newColumnWidths = new Map(columnWidths);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);

    props.onColumnResize?.(column.idx, width);
  }

  function handleRowsUpdate(event: RowsUpdateEvent) {
    props.onRowsUpdate?.(event);
  }

  /**
   * utils
   */
  function getFrozenColumnsWidth() {
    if (lastFrozenColumnIndex === -1) return 0;
    const lastFrozenCol = columns[lastFrozenColumnIndex];
    return lastFrozenCol.left + lastFrozenCol.width;
  }

  function scrollToCell({ idx, rowIdx }: Partial<Position>) {
    const { current } = gridRef;
    if (!current) return;

    const { clientWidth, clientHeight, scrollLeft, scrollTop } = current;

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      const { left, width } = columns[idx];
      const isCellAtLeftBoundary = left < scrollLeft + width + getFrozenColumnsWidth();
      const isCellAtRightBoundary = left + width > clientWidth + scrollLeft;
      if (isCellAtLeftBoundary || isCellAtRightBoundary) {
        const newScrollLeft = getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
        current.scrollLeft = scrollLeft + newScrollLeft;
      }
    }

    if (typeof rowIdx === 'number') {
      if (rowIdx * rowHeight < scrollTop) {
        // at top boundary, scroll to the row's top
        current.scrollTop = rowIdx * rowHeight;
      } else if ((rowIdx + 1) * rowHeight > scrollTop + clientHeight) {
        // at bottom boundary, scroll the next row's top to the bottom of the viewport
        current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
      }
    }
  }

  function scrollToColumn(idx: number) {
    scrollToCell({ idx });
  }

  function scrollToRow(rowIdx: number) {
    const { current } = gridRef;
    if (!current) return;
    current.scrollTop = rowIdx * rowHeight;
  }

  function selectCell(position: Position, openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', position, openEditor);
  }

  function openCellEditor(rowIdx: number, idx: number) {
    selectCell({ rowIdx, idx }, true);
  }

  function getViewportRows() {
    const rowElements = [];
    for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
      const row = rows[rowIdx];
      let key: string | number = rowIdx;
      let isRowSelected = false;
      if (rowKey !== undefined) {
        const rowId = row[rowKey];
        isRowSelected = selectedRows?.has(rowId) ?? false;
        if (typeof rowId === 'string' || typeof rowId === 'number') {
          key = rowId;
        }
      }

      rowElements.push(
        <RowRenderer<R, SR>
          key={key}
          rowIdx={rowIdx}
          row={row}
          columnMetrics={columnMetrics}
          viewportColumns={viewportColumns}
          eventBus={eventBus}
          rowGroupRenderer={rowGroupRenderer}
          rowRenderer={rowRenderer}
          isRowSelected={isRowSelected}
          onRowClick={onRowClick}
          onRowExpandToggle={onRowExpandToggle}
          enableCellRangeSelection={typeof onSelectedCellRangeChange === 'function'}
        />
      );
    }

    return rowElements;
  }

  return (
    <div
      className="rdg-root"
      style={{
        width,
        height,
        '--header-row-height': `${headerRowHeight}px`,
        '--filter-row-height': `${headerFiltersHeight}px`,
        '--row-width': `${columnMetrics.totalColumnWidth}px`,
        '--row-height': `${rowHeight}px`
      } as React.CSSProperties}
      ref={gridRef}
      onScroll={onScroll}
    >
      {rows.length === 0 && props.emptyRowsView ? createElement(props.emptyRowsView) : (
        <>
          <InteractionMasks<R, SR>
            rows={rows}
            rowHeight={rowHeight}
            columns={columns}
            height={clientHeight}
            enableCellAutoFocus={enableCellAutoFocus}
            enableCellCopyPaste={enableCellCopyPaste}
            enableCellDragAndDrop={enableCellDragAndDrop}
            cellNavigationMode={cellNavigationMode}
            eventBus={eventBus}
            gridRef={gridRef}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            scrollToCell={scrollToCell}
            editorPortalTarget={editorPortalTarget}
            onCheckCellIsEditable={props.onCheckCellIsEditable}
            onRowsUpdate={handleRowsUpdate}
            onSelectedCellChange={onSelectedCellChange}
            onSelectedCellRangeChange={onSelectedCellRangeChange}
          />
          <HeaderRow<R, K, SR>
            rowKey={rowKey}
            rows={rows}
            columns={viewportColumns}
            onColumnResize={handleColumnResize}
            lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
            draggableHeaderCell={props.draggableHeaderCell}
            onHeaderDrop={props.onHeaderDrop}
            allRowsSelected={selectedRows?.size === rows.length}
            onSelectedRowsChange={onSelectedRowsChange}
            sortColumn={props.sortColumn}
            sortDirection={props.sortDirection}
            onSort={props.onSort}
          />
          {enableFilters && (
            <FilterRow<R, SR>
              lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
              columns={viewportColumns}
              filters={props.filters}
              onFiltersChange={props.onFiltersChange}
            />
          )}
          <div style={{ height: rowOverscanStartIdx * rowHeight }} />
          {getViewportRows()}
          <div style={{ height: (rows.length - 1 - rowOverscanEndIdx) * rowHeight }} />
          {summaryRows?.map((row, rowIdx) => (
            <SummaryRow<R, SR>
              key={rowIdx}
              rowIdx={rowIdx}
              row={row}
              viewportColumns={viewportColumns}
              lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default forwardRef(
  DataGrid as React.RefForwardingComponent<DataGridHandle>
) as <R, K extends keyof R, SR = unknown>(props: DataGridProps<R, K, SR> & { ref?: React.Ref<DataGridHandle> }) => JSX.Element;
