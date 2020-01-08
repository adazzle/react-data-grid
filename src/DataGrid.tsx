import React, {
  forwardRef,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  createElement
} from 'react';

import HeaderRow from './HeaderRow';
import FilterRow from './FilterRow';
import Canvas, { CanvasHandle as DataGridHandle } from './Canvas';
import { ValueFormatter } from './formatters';
import { getColumnMetrics, getHorizontalRangeToRender, isPositionStickySupported, getViewportColumns, getScrollbarSize, HorizontalRangeToRender } from './utils';
import { CellNavigationMode, DEFINE_SORT } from './common/enums';
import {
  CalculatedColumn,
  CheckCellIsEditableEvent,
  Column,
  GridRowsUpdatedEvent,
  Position,
  RowsContainerProps,
  RowExpandToggleEvent,
  RowGetter,
  SelectedRange,
  IRowRendererProps,
  ScrollPosition,
  Filters,
  FormatterProps
} from './common/types';

export { DataGridHandle };

export interface DataGridProps<R, K extends keyof R> {
  /** An array of objects representing each column on the grid */
  columns: Column<R>[];
  /** The minimum width of the grid in pixels */
  minWidth?: number;
  /** The height of the header row in pixels */
  headerRowHeight?: number;
  /** The height of the header filter row in pixels */
  headerFiltersHeight?: number;
  /** Toggles whether filters row is displayed or not */
  enableHeaderFilters?: boolean;
  /** Minimum column width in pixels */
  minColumnWidth?: number;
  /** Function called whenever row is clicked */
  onRowClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
  /** Function called whenever row is double clicked */
  onRowDoubleClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;

  filters?: Filters<R>;
  onFiltersChange?(filters: Filters<R>): void;
  /** Function called whenever keyboard key is released */
  onGridKeyUp?(event: React.KeyboardEvent<HTMLDivElement>): void;
  /** Function called whenever keyboard key is pressed down */
  onGridKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;

  selectedRows?: Set<R[K]>;
  /** Function called whenever row selection is changed */
  onSelectedRowsChange?(selectedRows: Set<R[K]>): void;

  /**
   * Callback called whenever row data is updated
   * When editing is enabled, this callback will be called for the following scenarios
   * 1. Using the supplied editor of the column. The default editor is the SimpleTextEditor.
   * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
   * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
   * 4. Update all cells under a given cell by double clicking the cell's fill handle.
   */
  onGridRowsUpdated?<E extends GridRowsUpdatedEvent<R>>(event: E): void;
  /** Called when a column is resized */
  onColumnResize?(idx: number, width: number): void;

  /** Grid Props */
  /** The primary key property of each row */
  rowKey?: K;
  /** The height of each row in pixels */
  rowHeight?: number;
  defaultFormatter?: React.ComponentType<FormatterProps<unknown, R>>;
  rowRenderer?: React.ComponentType<IRowRendererProps<R>>;
  rowGroupRenderer?: React.ComponentType;
  /** A function called for each rendered row that should return a plain key/value pair object */
  rowGetter: RowGetter<R>;
  /** The number of rows to be rendered */
  rowsCount: number;
  /** The minimum height of the grid in pixels */
  minHeight?: number;
  /** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
  contextMenu?: React.ReactElement;
  /** Used to toggle whether cells can be selected or not */
  enableCellSelect?: boolean;
  /** Toggles whether cells should be autofocused */
  enableCellAutoFocus?: boolean;
  enableCellCopyPaste?: boolean;
  enableCellDragAndDrop?: boolean;
  cellNavigationMode?: CellNavigationMode;
  /** The node where the editor portal should mount. */
  editorPortalTarget?: Element;
  /** The key of the column which is currently being sorted */
  sortColumn?: keyof R;
  /** The direction to sort the sortColumn*/
  sortDirection?: DEFINE_SORT;
  /** Function called whenever grid is sorted*/
  onGridSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
  /** Called when the grid is scrolled */
  onScroll?(scrollPosition: ScrollPosition): void;
  /** Component used to render a draggable header cell */
  draggableHeaderCell?: React.ComponentType<{ column: CalculatedColumn<R>; onHeaderDrop(): void }>;
  RowsContainer?: React.ComponentType<RowsContainerProps>;
  emptyRowsView?: React.ComponentType<{}>;
  onHeaderDrop?(): void;
  onRowExpandToggle?(event: RowExpandToggleEvent): void;

  /** Function called whenever selected cell is changed */
  onSelectedCellChange?(position: Position): void;
  /** Function called whenever selected cell range is changed */
  onSelectedCellRangeChange?(selectedRange: SelectedRange): void;
  /** called before cell is set active, returns a boolean to determine whether cell is editable */
  onCheckCellIsEditable?(event: CheckCellIsEditableEvent<R>): boolean;
  /**
   * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
   * Bottom horizontal scroll bar can move the row left / right. Or a customized row renderer can be used to disabled the scrolling support.
   */
  summaryRows?: R[];
  /** Control how big render row batches will be. */
  renderBatchSize?: number;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rowGetter={i => rows[i]} rowsCount={3} />
*/
function DataGrid<R, K extends keyof R>({
  rowKey = 'id' as K,
  rowHeight = 35,
  headerRowHeight = rowHeight,
  headerFiltersHeight = 45,
  minColumnWidth = 80,
  minHeight = 350,
  minWidth: width,
  enableCellAutoFocus = true,
  enableCellSelect = false,
  enableHeaderFilters = false,
  enableCellCopyPaste = false,
  enableCellDragAndDrop = false,
  cellNavigationMode = CellNavigationMode.NONE,
  editorPortalTarget = document.body,
  renderBatchSize = 8,
  defaultFormatter = ValueFormatter,
  columns,
  rowsCount,
  rowGetter,
  selectedRows,
  onSelectedRowsChange,
  ...props
}: DataGridProps<R, K>, ref: React.Ref<DataGridHandle>) {
  const [columnWidths, setColumnWidths] = useState(() => new Map<keyof R, number>());
  const [scrollLeft, setScrollLeft] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportWidth = (width || gridWidth) - 2; // 2 for border width;
  const nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;

  const columnMetrics = useMemo(() => {
    if (viewportWidth <= 0) return null;

    return getColumnMetrics<R>({
      columns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultFormatter
    });
  }, [columnWidths, columns, defaultFormatter, minColumnWidth, viewportWidth]);

  const horizontalRange: HorizontalRangeToRender = useMemo(() => {
    if (!columnMetrics) {
      return {
        colVisibleStartIdx: 0,
        colVisibleEndIdx: 0,
        colOverscanStartIdx: 0,
        colOverscanEndIdx: 0
      };
    }

    return getHorizontalRangeToRender({
      columnMetrics,
      scrollLeft
    });
  }, [columnMetrics, scrollLeft]);

  const viewportColumns: CalculatedColumn<R>[] = useMemo(() => {
    if (!columnMetrics) return [];

    return getViewportColumns(
      columnMetrics.columns,
      horizontalRange.colOverscanStartIdx,
      horizontalRange.colOverscanEndIdx
    );
  }, [columnMetrics, horizontalRange.colOverscanEndIdx, horizontalRange.colOverscanStartIdx]);

  useLayoutEffect(() => {
    // Do not calculate the width if minWidth is provided
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

  function handleColumnResize(column: CalculatedColumn<R>, width: number) {
    const newColumnWidths = new Map(columnWidths);
    width = Math.max(width, minColumnWidth);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);

    props.onColumnResize?.(column.idx, width);
  }

  function handleScroll(scrollPosition: ScrollPosition) {
    if (headerRef.current) {
      headerRef.current.scrollLeft = scrollPosition.scrollLeft;
    }
    setScrollLeft(scrollPosition.scrollLeft);
    props.onScroll?.(scrollPosition);
  }

  function handleGridRowsUpdated(event: GridRowsUpdatedEvent<R>) {
    props.onGridRowsUpdated?.(event);
  }

  const rowOffsetHeight = headerRowHeight + (enableHeaderFilters ? headerFiltersHeight : 0);

  return (
    <div
      className="rdg-root"
      style={{ width, lineHeight: `${rowHeight}px` }}
      ref={gridRef}
    >
      {columnMetrics && (
        <>
          <div
            ref={headerRef}
            className="rdg-header"
          >
            <HeaderRow<R, K>
              rowKey={rowKey}
              rowsCount={rowsCount}
              rowGetter={rowGetter}
              height={headerRowHeight}
              width={columnMetrics.totalColumnWidth + getScrollbarSize()}
              columns={viewportColumns}
              onColumnResize={handleColumnResize}
              lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
              draggableHeaderCell={props.draggableHeaderCell}
              onHeaderDrop={props.onHeaderDrop}
              allRowsSelected={selectedRows?.size === rowsCount}
              onSelectedRowsChange={onSelectedRowsChange}
              sortColumn={props.sortColumn}
              sortDirection={props.sortDirection}
              onGridSort={props.onGridSort}
              scrollLeft={nonStickyScrollLeft}
            />
            {enableHeaderFilters && (
              <FilterRow<R, K>
                height={headerFiltersHeight}
                width={columnMetrics.totalColumnWidth + getScrollbarSize()}
                lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
                columns={viewportColumns}
                scrollLeft={nonStickyScrollLeft}
                filters={props.filters}
                onFiltersChange={props.onFiltersChange}
              />
            )}
          </div>
          {rowsCount === 0 && props.emptyRowsView ? createElement(props.emptyRowsView) : (
            <Canvas<R, K>
              ref={ref}
              rowKey={rowKey}
              rowHeight={rowHeight}
              rowRenderer={props.rowRenderer}
              rowGetter={rowGetter}
              rowsCount={rowsCount}
              selectedRows={selectedRows}
              onSelectedRowsChange={onSelectedRowsChange}
              columnMetrics={columnMetrics}
              viewportColumns={viewportColumns}
              onScroll={handleScroll}
              height={minHeight - rowOffsetHeight}
              contextMenu={props.contextMenu}
              rowGroupRenderer={props.rowGroupRenderer}
              enableCellSelect={enableCellSelect}
              enableCellAutoFocus={enableCellAutoFocus}
              enableCellCopyPaste={enableCellCopyPaste}
              enableCellDragAndDrop={enableCellDragAndDrop}
              cellNavigationMode={cellNavigationMode}
              scrollLeft={scrollLeft}
              RowsContainer={props.RowsContainer}
              editorPortalTarget={editorPortalTarget}
              onCanvasKeydown={props.onGridKeyDown}
              onCanvasKeyup={props.onGridKeyUp}
              renderBatchSize={renderBatchSize}
              summaryRows={props.summaryRows}
              onCheckCellIsEditable={props.onCheckCellIsEditable}
              onGridRowsUpdated={handleGridRowsUpdated}
              onSelectedCellChange={props.onSelectedCellChange}
              onSelectedCellRangeChange={props.onSelectedCellRangeChange}
              onRowClick={props.onRowClick}
              onRowDoubleClick={props.onRowDoubleClick}
              onRowExpandToggle={props.onRowExpandToggle}
              {...horizontalRange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default forwardRef(
  DataGrid as React.RefForwardingComponent<DataGridHandle, DataGridProps<{ [key: string]: unknown }, string>>
) as <R, K extends keyof R>(props: DataGridProps<R, K> & { ref?: React.Ref<DataGridHandle> }) => JSX.Element;
