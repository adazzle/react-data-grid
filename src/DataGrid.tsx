import React, {
  forwardRef,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  useEffect,
  useImperativeHandle,
  useCallback,
  createElement
} from 'react';

import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import HeaderRow from './HeaderRow';
import FilterRow from './FilterRow';
import Row from './Row';
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
  RowRendererProps,
  RowsUpdateEvent,
  SelectRowEvent
} from './common/types';
import { CellNavigationMode, SortDirection } from './common/enums';

export interface DataGridHandle {
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  selectCell: (position: Position, openEditor?: boolean) => void;
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
  emptyRowsRenderer?: React.ComponentType<{}>;

  /**
   * Event props
   */
  /** Function called whenever a row is clicked */
  onRowClick?: (rowIdx: number, row: R, column: CalculatedColumn<R, SR>) => void;
  /** Called when the grid is scrolled */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  /** Called when a column is resized */
  onColumnResize?: (idx: number, width: number) => void;
  /** Function called whenever selected cell is changed */
  onSelectedCellChange?: (position: Position) => void;
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
  // Grid and data Props
  columns: rawColumns,
  rows,
  summaryRows,
  rowKey,
  onRowsUpdate,
  // Dimensions props
  width,
  height = 350,
  minColumnWidth = 80,
  rowHeight = 35,
  headerRowHeight = rowHeight,
  headerFiltersHeight = 45,
  // Feature props
  selectedRows,
  onSelectedRowsChange,
  sortColumn,
  sortDirection,
  onSort,
  filters,
  onFiltersChange,
  // Custom renderers
  defaultFormatter = ValueFormatter,
  rowRenderer: RowRenderer = Row,
  emptyRowsRenderer,
  // Event props
  onRowClick,
  onScroll,
  onColumnResize,
  onSelectedCellChange,
  onCheckCellIsEditable,
  // Toggles and modes
  enableFilters = false,
  enableCellAutoFocus = true,
  enableCellCopyPaste = false,
  enableCellDragAndDrop = false,
  cellNavigationMode = CellNavigationMode.NONE,
  // Miscellaneous
  editorPortalTarget = document.body
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

  const { columns, lastFrozenColumnIndex, totalColumnWidth } = useMemo(() => {
    return getColumnMetrics<R, SR>({
      columns: rawColumns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultFormatter
    });
  }, [columnWidths, rawColumns, defaultFormatter, minColumnWidth, viewportWidth]);

  const [colOverscanStartIdx, colOverscanEndIdx] = useMemo((): [number, number] => {
    return getHorizontalRangeToRender(
      columns,
      lastFrozenColumnIndex,
      viewportWidth,
      scrollLeft
    );
  }, [scrollLeft, columns, lastFrozenColumnIndex, viewportWidth]);

  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    return getViewportColumns(
      columns,
      colOverscanStartIdx,
      colOverscanEndIdx
    );
  }, [colOverscanEndIdx, colOverscanStartIdx, columns]);

  const totalHeaderHeight = headerRowHeight + (enableFilters ? headerFiltersHeight : 0);
  const clientHeight = height
    - 2 // border width
    - totalHeaderHeight
    - (summaryRows?.length ?? 0) * rowHeight
    - (totalColumnWidth > viewportWidth ? getScrollbarSize() : 0);

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
    if (typeof width === 'number') return;
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
    scrollToColumn(idx: number) {
      scrollToCell({ idx });
    },
    scrollToRow(rowIdx: number) {
      const { current } = gridRef;
      if (!current) return;
      current.scrollTop = rowIdx * rowHeight;
    },
    selectCell(position: Position, openEditor?: boolean) {
      eventBus.dispatch('SELECT_CELL', position, openEditor);
    }
  }));

  /**
   * event handlers
   */
  function onGridScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    onScroll?.(event);
  }

  const handleColumnResize = useCallback((column: CalculatedColumn<R, SR>, width: number) => {
    const newColumnWidths = new Map(columnWidths);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);

    onColumnResize?.(column.idx, width);
  }, [columnWidths, onColumnResize]);

  function handleRowsUpdate(event: RowsUpdateEvent) {
    onRowsUpdate?.(event);
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

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      const { clientWidth } = current;
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
        <RowRenderer
          key={key}
          rowIdx={rowIdx}
          row={row}
          viewportColumns={viewportColumns}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          eventBus={eventBus}
          isRowSelected={isRowSelected}
          onRowClick={onRowClick}
        />
      );
    }

    return rowElements;
  }

  return (
    <div
      className="rdg"
      style={{
        width,
        height,
        '--header-row-height': `${headerRowHeight}px`,
        '--filter-row-height': `${headerFiltersHeight}px`,
        '--row-width': `${totalColumnWidth}px`,
        '--row-height': `${rowHeight}px`
      } as React.CSSProperties}
      ref={gridRef}
      onScroll={onGridScroll}
    >
      <HeaderRow<R, K, SR>
        rowKey={rowKey}
        rows={rows}
        columns={viewportColumns}
        onColumnResize={handleColumnResize}
        lastFrozenColumnIndex={lastFrozenColumnIndex}
        allRowsSelected={selectedRows?.size === rows.length}
        onSelectedRowsChange={onSelectedRowsChange}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      {enableFilters && (
        <FilterRow<R, SR>
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          columns={viewportColumns}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}
      {rows.length === 0 && emptyRowsRenderer ? createElement(emptyRowsRenderer) : (
        <>
          {viewportWidth > 0 && (
            <InteractionMasks<R, SR>
              rows={rows}
              rowHeight={rowHeight}
              columns={columns}
              enableCellAutoFocus={enableCellAutoFocus}
              enableCellCopyPaste={enableCellCopyPaste}
              enableCellDragAndDrop={enableCellDragAndDrop}
              cellNavigationMode={cellNavigationMode}
              eventBus={eventBus}
              gridRef={gridRef}
              totalHeaderHeight={totalHeaderHeight}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
              scrollToCell={scrollToCell}
              editorPortalTarget={editorPortalTarget}
              onCheckCellIsEditable={onCheckCellIsEditable}
              onRowsUpdate={handleRowsUpdate}
              onSelectedCellChange={onSelectedCellChange}
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
              bottom={rowHeight * (summaryRows.length - 1 - rowIdx)}
              viewportColumns={viewportColumns}
              lastFrozenColumnIndex={lastFrozenColumnIndex}
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
