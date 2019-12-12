import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useImperativeHandle,
  createElement
} from 'react';
import { isValidElementType } from 'react-is';

import Header, { HeaderHandle } from './Header';
import Canvas from './Canvas';
import { legacyCellContentRenderer } from './Cell/cellContentRenderers';
import { getColumnMetrics } from './utils/columnUtils';
import EventBus from './EventBus';
import { CellNavigationMode, EventTypes, UpdateActions, HeaderRowType, DEFINE_SORT } from './common/enums';
import {
  AddFilterEvent,
  CalculatedColumn,
  CellActionButton,
  CellCopyPasteEvent,
  CellMetaData,
  CheckCellIsEditableEvent,
  Column,
  CellContentRenderer,
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
  IRowRendererProps,
  ScrollPosition
} from './common/types';

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
  /** Function called whenever grid is sorted*/
  onGridSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
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
  defaultCellContentRenderer?: CellContentRenderer<R>;
  rowRenderer?: React.ReactElement | React.ComponentType<IRowRendererProps<R>>;
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
  onScroll?(scrollPosition: ScrollPosition): void;
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
   * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
   * Bottom horizontal scroll bar can move the row left / right. Or a customized row renderer can be used to disabled the scrolling support.
   */
  summaryRows?: R[];
  /** Control how big render row batches will be. */
  renderBatchSize?: number;
}

export interface DataGridHandle {
  scrollToColumn(colIdx: number): void;
  selectCell(position: Position, openEditor?: boolean): void;
  openCellEditor(rowIdx: number, colIdx: number): void;
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
  headerFiltersHeight = 45,
  minColumnWidth = 80,
  minHeight = 350,
  minWidth: width,
  enableCellSelect = false,
  enableCellAutoFocus = true,
  cellNavigationMode = CellNavigationMode.NONE,
  editorPortalTarget = document.body,
  renderBatchSize = 8,
  defaultCellContentRenderer = legacyCellContentRenderer,
  columns,
  rowsCount,
  rowGetter,
  cellRangeSelection,
  selectedRows,
  onSelectedRowsChange,
  ...props
}: DataGridProps<R, K>, ref: React.Ref<DataGridHandle>) {
  const [columnWidths, setColumnWidths] = useState(() => new Map<keyof R, number>());
  const [eventBus] = useState(() => new EventBus());
  const [gridWidth, setGridWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HeaderHandle>(null);
  const lastSelectedRowIdx = useRef(-1);
  const viewportWidth = (width || gridWidth) - 2; // 2 for border width;
  const scrollLeft = useRef(0);

  const columnMetrics = useMemo(() => {
    if (viewportWidth <= 0) return null;

    return getColumnMetrics<R>({
      columns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultCellContentRenderer
    });
  }, [columnWidths, columns, defaultCellContentRenderer, minColumnWidth, viewportWidth]);

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

  function handleColumnResize(column: CalculatedColumn<R>, width: number) {
    const newColumnWidths = new Map(columnWidths);
    width = Math.max(width, minColumnWidth);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);

    if (props.onColumnResize) {
      props.onColumnResize(column.idx, width);
    }
  }

  function handleScroll(scrollPosition: ScrollPosition) {
    if (headerRef.current && scrollLeft.current !== scrollPosition.scrollLeft) {
      scrollLeft.current = scrollPosition.scrollLeft;
      headerRef.current.setScrollLeft(scrollPosition.scrollLeft);
    }
    if (props.onScroll) {
      props.onScroll(scrollPosition);
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
    const start = Math.min(fromRow, toRow);
    const end = Math.max(fromRow, toRow);

    for (let i = start; i <= end; i++) {
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
      props.enableHeaderFilters ? {
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

  return (
    <div
      className="rdg-root"
      style={{ width, lineHeight: `${rowHeight}px` }}
      ref={gridRef}
    >
      {columnMetrics && (
        <>
          <Header<R, K>
            ref={headerRef}
            rowKey={rowKey}
            rowsCount={rowsCount}
            rowGetter={rowGetter}
            columnMetrics={columnMetrics}
            onColumnResize={handleColumnResize}
            headerRows={headerRows}
            sortColumn={props.sortColumn}
            sortDirection={props.sortDirection}
            draggableHeaderCell={props.draggableHeaderCell}
            onSort={props.onGridSort}
            onHeaderDrop={props.onHeaderDrop}
            allRowsSelected={selectedRows !== undefined && selectedRows.size === rowsCount}
            onSelectedRowsChange={onSelectedRowsChange}
            getValidFilterValues={props.getValidFilterValues}
            cellMetaData={cellMetaData}
          />
          {rowsCount === 0 && isValidElementType(props.emptyRowsView) ? createElement(props.emptyRowsView) : (
            <Canvas<R, K>
              rowKey={rowKey}
              rowHeight={rowHeight}
              rowRenderer={props.rowRenderer}
              rowGetter={rowGetter}
              rowsCount={rowsCount}
              selectedRows={selectedRows}
              onRowSelectionChange={handleRowSelectionChange}
              columnMetrics={columnMetrics}
              onScroll={handleScroll}
              cellMetaData={cellMetaData}
              height={minHeight - rowOffsetHeight}
              scrollToRowIndex={props.scrollToRowIndex}
              contextMenu={props.contextMenu}
              getSubRowDetails={props.getSubRowDetails}
              rowGroupRenderer={props.rowGroupRenderer}
              enableCellSelect={enableCellSelect}
              enableCellAutoFocus={enableCellAutoFocus}
              cellNavigationMode={cellNavigationMode}
              eventBus={eventBus}
              interactionMasksMetaData={interactionMasksMetaData}
              RowsContainer={props.RowsContainer}
              editorPortalTarget={editorPortalTarget}
              onCanvasKeydown={props.onGridKeyDown}
              onCanvasKeyup={props.onGridKeyUp}
              renderBatchSize={renderBatchSize}
              summaryRows={props.summaryRows}
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
