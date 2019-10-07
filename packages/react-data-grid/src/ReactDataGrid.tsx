import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useImperativeHandle
} from 'react';

import Grid from './Grid';
import ToolbarContainer, { ToolbarProps } from './ToolbarContainer';
import { getColumnMetrics } from './ColumnMetrics';
import { EventBus } from './masks';
import { CellNavigationMode, EventTypes, UpdateActions, HeaderRowType, DEFINE_SORT } from './common/enums';
import {
  AddFilterEvent,
  CalculatedColumn,
  CellActionButton,
  CellCopyPasteEvent,
  CellMetaData,
  CheckCellIsEditableEvent,
  ColumnList,
  CommitEvent,
  GridRowsUpdatedEvent,
  HeaderRowData,
  InteractionMasksMetaData,
  Position,
  RowsContainerProps,
  RowExpandToggleEvent,
  RowGetter,
  SelectedRange,
  SubRowDetails,
  SubRowOptions,
  RowRendererProps,
  ScrollState
} from './common/types';

export interface ReactDataGridProps<R extends {}> {
  /** An array of objects representing each column on the grid. Can also be an ImmutableJS object */
  columns: ColumnList<R>;
  /** The minimum width of the grid in pixels */
  minWidth?: number;
  /** The height of the header row in pixels */
  headerRowHeight?: number;
  /** The height of the header filter row in pixels */
  headerFiltersHeight?: number;
  /** Component used to render toolbar above the grid */
  toolbar?: React.ReactElement<ToolbarProps<R>> | React.ComponentType<ToolbarProps<R>>;
  cellRangeSelection?: {
    onStart(selectedRange: SelectedRange): void;
    onUpdate?(selectedRange: SelectedRange): void;
    onComplete?(selectedRange: SelectedRange): void;
  };
  /** Minimum column width in pixels */
  minColumnWidth?: number;
  /** Function called whenever row is clicked */
  onRowClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
  /** Function called whenever row is double clicked */
  onRowDoubleClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
  onAddFilter?(event: AddFilterEvent<R>): void;
  onClearFilters?(): void;
  /** Function called whenever grid is sorted*/
  onGridSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
  /** Function called whenever keyboard key is released */
  onGridKeyUp?(event: React.KeyboardEvent<HTMLDivElement>): void;
  /** Function called whenever keyboard key is pressed down */
  onGridKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;

  selectedRows?: Set<R[keyof R]>;
  /** Function called whenever row selection is changed */
  onSelectedRowsChange?(selectedRows: Set<R[keyof R]>): void;

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
  rowKey?: keyof R;
  /** The height of each row in pixels */
  rowHeight?: number;
  rowRenderer?: React.ReactElement | React.ComponentType<RowRendererProps<R>>;
  rowGroupRenderer?: React.ComponentType;
  /** A function called for each rendered row that should return a plain key/value pair object */
  rowGetter: RowGetter<R>;
  /** The number of rows to be rendered */
  rowsCount: number;
  /** The minimum height of the grid in pixels */
  minHeight?: number;
  /** When set, grid will scroll to this row index */
  scrollToRowIndex?: number;
  /** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
  contextMenu?: React.ReactElement;
  /** Used to toggle whether cells can be selected or not */
  enableCellSelect?: boolean;
  /** Toggles whether cells should be autofocused */
  enableCellAutoFocus?: boolean;
  cellNavigationMode?: CellNavigationMode;
  /** The node where the editor portal should mount. */
  editorPortalTarget?: Element;
  /** The key of the column which is currently being sorted */
  sortColumn?: keyof R;
  /** The direction to sort the sortColumn*/
  sortDirection?: DEFINE_SORT;
  /** Called when the grid is scrolled */
  onScroll?(scrollState: ScrollState): void;
  /** Component used to render a draggable header cell */
  draggableHeaderCell?: React.ComponentType<{ column: CalculatedColumn<R>; onHeaderDrop(): void }>;
  getValidFilterValues?(columnKey: keyof R): unknown;
  RowsContainer?: React.ComponentType<RowsContainerProps>;
  emptyRowsView?: React.ComponentType<{}>;
  onHeaderDrop?(): void;
  getSubRowDetails?(row: R): SubRowDetails;

  /** CellMetaData */
  getCellActions?(column: CalculatedColumn<R>, rowData: R): CellActionButton[] | undefined;
  /** Called whenever a sub row is deleted from the grid */
  onDeleteSubRow?(options: SubRowOptions<R>): void;
  /** Called whenever a sub row is added to the grid */
  onAddSubRow?(): void;
  /** Function called whenever a cell has been expanded */
  onCellExpand?(options: SubRowOptions<R>): void;
  onRowExpandToggle?(event: RowExpandToggleEvent): void;

  /** InteractionMasksMetaData */
  /** Deprecated: Function called when grid is updated via a copy/paste. Use onGridRowsUpdated instead*/
  onCellCopyPaste?(event: CellCopyPasteEvent<R>): void;
  /** Function called whenever a cell is selected */
  onCellSelected?(position: Position): void;
  /** Function called whenever a cell is deselected */
  onCellDeSelected?(position: Position): void;
  /** called before cell is set active, returns a boolean to determine whether cell is editable */
  onCheckCellIsEditable?(event: CheckCellIsEditableEvent<R>): boolean;
  /**
   * The number of rows to render outside of the visible area
   * Note that overscanning too much can negatively impact performance. By default, grid overscans by two items.
   */
  overscanRowCount?: number;
  /**
   * The number of columns to render outside of the visible area
   * Note that overscanning too much can negatively impact performance. By default, grid overscans by two items.
   */
  overscanColumnCount?: number;
  /**
   * Provides an additional isScrolling parameter to formatters. This parameter can be used to show a placeholder row or column while the list is being scrolled.
   * Note that using this parameter will result in an additional render call after scrolling has stopped (when isScrolling changes from true to false).
   */
  enableIsScrolling?: boolean;
}

export interface ReactDataGridHandle {
  scrollToColumn(colIdx: number): void;
  selectCell(position: Position, openEditor?: boolean): void;
  handleToggleFilter(): void;
  openCellEditor(rowIdx: number, colIdx: number): void;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <ReactDataGrid columns={columns} rowGetter={i => rows[i]} rowsCount={3} />
*/
const ReactDataGridBase = forwardRef(function ReactDataGrid<R extends {}>({
  rowKey = 'id' as keyof R,
  rowHeight = 35,
  headerFiltersHeight = 45,
  minColumnWidth = 80,
  minHeight = 350,
  minWidth: width,
  enableCellSelect = false,
  enableCellAutoFocus = true,
  cellNavigationMode = CellNavigationMode.NONE,
  editorPortalTarget = document.body,
  columns,
  rowsCount,
  rowGetter,
  cellRangeSelection,
  onClearFilters,
  selectedRows,
  onSelectedRowsChange,
  ...props
}: ReactDataGridProps<R>, ref: React.Ref<ReactDataGridHandle>) {
  const [canFilter, setCanFilter] = useState(false);
  const [columnWidths, setColumnWidths] = useState(() => new Map<keyof R, number>());
  const [eventBus] = useState(() => new EventBus());
  const [gridWidth, setGridWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const lastSelectedRowIdx = useRef(-1);
  const viewportWidth = (width || gridWidth) - 2; // 2 for border width;

  const columnMetrics = useMemo(() => {
    if (viewportWidth <= 0) return null;

    return getColumnMetrics<R>({
      columns,
      minColumnWidth,
      viewportWidth,
      columnWidths
    });
  }, [columnWidths, columns, minColumnWidth, viewportWidth]);

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

  useEffect(() => {
    if (!cellRangeSelection) return;

    function handleWindowMouseUp() {
      eventBus.dispatch(EventTypes.SELECT_END);
    }

    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [eventBus, cellRangeSelection]);

  function selectCell({ idx, rowIdx }: Position, openEditor?: boolean) {
    eventBus.dispatch(EventTypes.SELECT_CELL, { rowIdx, idx }, openEditor);
  }

  function getColumn(idx: number) {
    return columnMetrics!.columns[idx];
  }

  function handleColumnResize(idx: number, width: number) {
    const newColumnWidths = new Map(columnWidths);
    const columnKey = getColumn(idx).key;
    newColumnWidths.set(columnKey, width);
    setColumnWidths(newColumnWidths);

    if (props.onColumnResize) {
      props.onColumnResize(idx, width);
    }
  }

  function handleDragEnter(overRowIdx: number) {
    eventBus.dispatch(EventTypes.DRAG_ENTER, overRowIdx);
  }

  function handleCellClick({ rowIdx, idx }: Position) {
    const { onRowClick } = props;
    selectCell({ rowIdx, idx });

    if (onRowClick) {
      onRowClick(rowIdx, rowGetter(rowIdx), getColumn(idx));
    }
  }

  function handleCellMouseDown(position: Position) {
    eventBus.dispatch(EventTypes.SELECT_START, position);
  }

  function handleCellMouseEnter(position: Position) {
    eventBus.dispatch(EventTypes.SELECT_UPDATE, position);
  }

  function handleCellContextMenu(position: Position) {
    selectCell(position);
  }

  function handleCellDoubleClick({ rowIdx, idx }: Position) {
    const { onRowDoubleClick } = props;
    if (onRowDoubleClick) {
      onRowDoubleClick(rowIdx, rowGetter(rowIdx), getColumn(idx));
    }
    openCellEditor(rowIdx, idx);
  }

  function handleToggleFilter() {
    setCanFilter(canFilter => !canFilter);
    if (onClearFilters) {
      onClearFilters();
    }
  }

  const handleDragHandleDoubleClick: InteractionMasksMetaData<R>['onDragHandleDoubleClick'] = (e) => {
    const cellKey = getColumn(e.idx).key;
    handleGridRowsUpdated(cellKey, e.rowIdx, rowsCount - 1, { [cellKey]: e.rowData[cellKey] }, UpdateActions.COLUMN_FILL);
  };

  const handleGridRowsUpdated: InteractionMasksMetaData<R>['onGridRowsUpdated'] = (cellKey, fromRow, toRow, updated, action, originRow) => {
    const { onGridRowsUpdated } = props;
    if (!onGridRowsUpdated) {
      return;
    }

    const rowIds = [];
    for (let i = fromRow; i <= toRow; i++) {
      rowIds.push(rowGetter(i)[rowKey]);
    }

    const fromRowData = rowGetter(action === UpdateActions.COPY_PASTE ? originRow! : fromRow);
    const fromRowId = fromRowData[rowKey];
    const toRowId = rowGetter(toRow)[rowKey];
    onGridRowsUpdated({ cellKey, fromRow, toRow, fromRowId, toRowId, rowIds, updated: updated as never, action, fromRowData });
  };

  function handleCommit(commit: CommitEvent<R>) {
    const targetRow = commit.rowIdx;
    handleGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, UpdateActions.CELL_UPDATE);
  }

  function getHeaderRows(): [HeaderRowData<R>, HeaderRowData<R> | undefined] {
    const { headerRowHeight, onAddFilter } = props;
    return [
      { height: headerRowHeight || rowHeight, rowType: HeaderRowType.HEADER },
      canFilter ? {
        rowType: HeaderRowType.FILTER,
        filterable: true,
        onFilterChange: onAddFilter,
        height: headerFiltersHeight || headerRowHeight || rowHeight
      } : undefined
    ];
  }

  function openCellEditor(rowIdx: number, idx: number) {
    selectCell({ rowIdx, idx }, true);
  }

  function scrollToColumn(colIdx: number) {
    eventBus.dispatch(EventTypes.SCROLL_TO_COLUMN, colIdx);
  }

  function handleRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean) {
    if (!onSelectedRowsChange) return;

    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(row[rowKey]);
      const previousRowIdx = lastSelectedRowIdx.current;
      lastSelectedRowIdx.current = rowIdx;
      if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
        const step = Math.sign(rowIdx - previousRowIdx);
        for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
          newSelectedRows.add(rowGetter(i)[rowKey]);
        }
      }
    } else {
      newSelectedRows.delete(row[rowKey]);
      lastSelectedRowIdx.current = -1;
    }

    onSelectedRowsChange(newSelectedRows);
  }

  useImperativeHandle(ref, () => ({
    scrollToColumn,
    selectCell,
    handleToggleFilter,
    openCellEditor
  }));

  const cellMetaData: CellMetaData<R> = {
    rowKey,
    onCellClick: handleCellClick,
    onCellContextMenu: handleCellContextMenu,
    onCellDoubleClick: handleCellDoubleClick,
    onCellExpand: props.onCellExpand,
    onRowExpandToggle: props.onRowExpandToggle,
    getCellActions: props.getCellActions,
    onDeleteSubRow: props.onDeleteSubRow,
    onAddSubRow: props.onAddSubRow,
    onDragEnter: handleDragEnter
  };
  if (cellRangeSelection) {
    cellMetaData.onCellMouseDown = handleCellMouseDown;
    cellMetaData.onCellMouseEnter = handleCellMouseEnter;
  }

  const interactionMasksMetaData: InteractionMasksMetaData<R> = {
    onCheckCellIsEditable: props.onCheckCellIsEditable,
    onCellCopyPaste: props.onCellCopyPaste,
    onGridRowsUpdated: handleGridRowsUpdated,
    onDragHandleDoubleClick: handleDragHandleDoubleClick,
    onCellSelected: props.onCellSelected,
    onCellDeSelected: props.onCellDeSelected,
    onCellRangeSelectionStarted: cellRangeSelection && cellRangeSelection.onStart,
    onCellRangeSelectionUpdated: cellRangeSelection && cellRangeSelection.onUpdate,
    onCellRangeSelectionCompleted: cellRangeSelection && cellRangeSelection.onComplete,
    onCommit: handleCommit
  };

  const headerRows = getHeaderRows();
  const rowOffsetHeight = headerRows[0].height + (headerRows[1] ? headerRows[1].height : 0);
  const style = width ? { width } : undefined;

  return (
    <div
      className="react-grid-Container"
      style={style}
      ref={gridRef}
    >
      <ToolbarContainer<R>
        toolbar={props.toolbar}
        columns={columns}
        rowsCount={rowsCount}
        onToggleFilter={handleToggleFilter}
      />
      {columnMetrics && (
        <Grid<R>
          rowKey={rowKey}
          headerRows={headerRows}
          draggableHeaderCell={props.draggableHeaderCell}
          getValidFilterValues={props.getValidFilterValues}
          columnMetrics={columnMetrics}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          rowRenderer={props.rowRenderer}
          rowGroupRenderer={props.rowGroupRenderer}
          cellMetaData={cellMetaData}
          selectedRows={selectedRows}
          onRowSelectionChange={handleRowSelectionChange}
          onSelectedRowsChange={onSelectedRowsChange}
          rowOffsetHeight={rowOffsetHeight}
          sortColumn={props.sortColumn}
          sortDirection={props.sortDirection}
          onSort={props.onGridSort}
          minHeight={minHeight}
          onCanvasKeydown={props.onGridKeyDown}
          onCanvasKeyup={props.onGridKeyUp}
          onColumnResize={handleColumnResize}
          scrollToRowIndex={props.scrollToRowIndex}
          contextMenu={props.contextMenu}
          enableCellSelect={enableCellSelect}
          enableCellAutoFocus={enableCellAutoFocus}
          cellNavigationMode={cellNavigationMode}
          eventBus={eventBus}
          onScroll={props.onScroll}
          RowsContainer={props.RowsContainer}
          emptyRowsView={props.emptyRowsView}
          onHeaderDrop={props.onHeaderDrop}
          getSubRowDetails={props.getSubRowDetails}
          editorPortalTarget={editorPortalTarget}
          interactionMasksMetaData={interactionMasksMetaData}
          overscanRowCount={props.overscanRowCount}
          overscanColumnCount={props.overscanColumnCount}
          enableIsScrolling={props.enableIsScrolling}
        />
      )}
    </div>
  );
});

// This is a temporary class to expose instance methods as ForwardRef does work well with generics
export default class ReactDataGrid<R> extends React.Component<ReactDataGridProps<R>> implements ReactDataGridHandle {
  private readonly gridRef = React.createRef<ReactDataGridHandle>();

  selectCell(position: Position, openEditor?: boolean | undefined): void {
    this.gridRef.current!.selectCell(position, openEditor);
  }

  handleToggleFilter(): void {
    this.gridRef.current!.handleToggleFilter();
  }

  openCellEditor(rowIdx: number, colIdx: number): void {
    this.gridRef.current!.openCellEditor(rowIdx, colIdx);
  }

  scrollToColumn(colIdx: number): void {
    this.gridRef.current!.scrollToColumn(colIdx);
  }

  render() {
    return (
      <ReactDataGridBase
        {...this.props as unknown as ReactDataGridProps<{}>}
        ref={this.gridRef}
      />
    );
  }
}
