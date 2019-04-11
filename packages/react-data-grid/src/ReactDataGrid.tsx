import React from 'react';

// Components
import Grid from './Grid';
import ToolbarContainer, { ToolbarContainerProps } from './ToolbarContainer';
import CheckboxEditor from './common/editors/CheckboxEditor';
import { SelectAll, SelectAllProps } from './formatters';

// Utils
import * as RowUtils from './RowUtils';
import { getColumn, getSize } from './ColumnUtils';
import KeyCodes from './KeyCodes';
import { isFunction } from './common/utils';
import * as ColumnMetrics from './ColumnMetrics';
import EventBus from './masks/EventBus';

// Types
import { DEFINE_SORT } from './common/cells/headerCells/SortableHeaderCell';
import { CellNavigationMode, EventTypes, UpdateActions, HeaderRowType } from './common/enums';
import { Column } from './common/types';

interface CellPosition {
  rowIdx: number;
  idx: number;
}

type SubComponentsProps = Pick<ToolbarContainerProps, 'toolbar'>;

interface Props extends SubComponentsProps {
  /** The height of each row in pixels */
  rowHeight?: number;
  /** The height of the header row in pixels */
  headerRowHeight?: number;
  /** The height of the header row in pixels */
  headerFiltersHeight?: number;
  /** The minimum height of the grid in pixels */
  minHeight: number;
  /** The minimum width of the grid in pixels */
  minWidth?: number;
  /** A function called for each rendered row that should return a plain key/value pair object */
  rowGetter(rowIdx: number): void;
  /** The number of rows to be rendered */
  rowsCount: number;
  /** Used to toggle whether cells can be selected or not */
  enableCellSelect?: boolean;
  /**
  * An array of objects representing each column on the grid.
  * Can also be an ImmutableJS object
  */
  columns: Column[];
  /** Callback whenever grid is filtered via FilterableHeaderCell*/
  onFilter?(): void;
  /** Function called on each cell render to render a list of actions for each cell */
  getCellActions?(): void;
  /**  Callback */
  onAddFilter?(): void;
  /**  Function called whenever grid is sorted*/
  onGridSort(columnKey: string, direction: DEFINE_SORT): void;
  /** The key of the column which is currently being sorted */
  sortColumn?: string;
  /** The direction to sort the sortColumn*/
  sortDirection?: DEFINE_SORT;
  /**
   * Callback called whenever row data is updated
   * When editing is enabled, this callback will be called for the following scenarios
   * 1. Using the supplied editor of the column. The default editor is the [SimpleTextEditor](https://github.com/adazzle/react-data-grid/blob/master/packages/common/editors/SimpleTextEditor.js).
   * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
   * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
   * 4. Update all cells under a given cell by double clicking the cell's fill handle.
   */
  onGridRowsUpdated?(): void;
  /** Function called whenever row is selected */
  onRowSelect?(): void;
  /** The primary key property of each row */
  rowKey?: string;
  /** When set, grid will scroll to this row index */
  scrollToRowIndex?: number;
  /** Function called whenever filters are cleared */
  onClearFilters?(): void;
  /** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
  contextMenu?: React.ReactElement;
  /** */
  cellNavigationMode?: 'none' | 'loopOverRow' | 'changeRow';
  /** Function called whenever a cell is selected */
  onCellSelected?(): void;
  /** Function called whenever a cell is deselected */
  onCellDeSelected?(): void;
  /** Object used to configure cell range selection */
  cellRangeSelection?: {
    /** Function called whenever cell range selection begins*/
    onStart?(): void;
    /**  Function called whenever cell selection range is updated*/
    onUpdate?(): void;
    /** Function called whenever cell selection range has been completed */
    onComplete?(): void;
  };
  /** Function called whenever a cell has been expanded */
  onCellExpand?(arg: any): void;
  /** Enables drag and drop on the grid */
  enableDragAndDrop?: boolean;
  onRowExpandToggle?(arg: any): void;
  /** Component used to render a draggable header cell */
  draggableHeaderCell?(): void;
  getValidFilterValues?(): void;
  rowSelection?: {
    enableShiftSelect?: boolean;
    /** Function called whenever rows are selected */
    onRowsSelected?(): void;
    /** Function called whenever rows are deselected */
    onRowsDeselected?(): void;
    /** toggle whether to show a checkbox in first column to select rows */
    showCheckbox?: boolean;
    /** Method by which rows should be selected */
    selectBy: { indexes: number[] } | { isSelectedKey: string } | { keys: { values: unknown[]; rowKey: string }};
  };
  /** Function called whenever row is clicked */
  onRowClick?(rowIdx: number, arg1: any, arg2: any): void;
  /** Function called whenever row is double clicked */
  onRowDoubleClick?(rowIdx: number, arg1: any, arg2: any): void;
  /** Function called whenever keyboard key is pressed down */
  onGridKeyDown?(event: React.KeyboardEvent): void;
  /** Function called whenever keyboard key is pressed up */
  onGridKeyUp?(event: React.KeyboardEvent): void;
  /** Function called whenever keyboard key is pressed down */
  rowGroupRenderer?(): void;
  /** Component to render row actions cell when present */
  rowActionsCell?(): void;
  /** called before cell is set active, returns a boolean to determine whether cell is editable */
  onCheckCellIsEditable?(): void;
  /** Called whenever a sub row is deleted from the grid */
  onDeleteSubRow?(): void;
  /** Called whenever a sub row is added to the grid */
  onAddSubRow?(): void;
  /** Toggles whether cells should be autofocused */
  enableCellAutoFocus?: boolean;
  /** Called just before a cell is about to be edited */
  onBeforeEdit?(): void;
  /** Component to render the UI in the header row for selecting all rows */
  selectAllRenderer?: React.RefForwardingComponent<HTMLInputElement, SelectAllProps>;
  /** Minimum column width in pixels */
  minColumnWidth?: number;
  /** Called when a column is resized */
  onColumnResize?(index: number, width: number): void;
  /** Called when the grid is scrolled */
  onScroll?(scrollState: any): void;
  /** The node where the editor portal should mount. */
  editorPortalTarget?: Element;
  /** */
  columnEquality?(a: unknown, b: unknown): boolean;
}

interface State {
  columnMetrics: any;
  selectedRows: unknown[];
  expandedRows: unknown[];
  canFilter: boolean;
  columnFilters: unknown;
  sortDirection: DEFINE_SORT | null;
  sortColumn: string | null;
  scrollOffset: number;
  lastRowIdxUiSelected: number;
}

function getInitialState(props: Props, columnMetrics: unknown): State {
  const initialState: State = {
    columnMetrics,
    selectedRows: [],
    expandedRows: [],
    canFilter: false,
    columnFilters: {},
    sortDirection: null,
    sortColumn: null,
    scrollOffset: 0,
    lastRowIdxUiSelected: -1
  };

  if (props.sortColumn && props.sortDirection) {
    initialState.sortColumn = props.sortColumn;
    initialState.sortDirection = props.sortDirection;
  }

  return initialState;
}

export default class ReactDataGrid extends React.Component<Props, State> {
  static defaultProps = {
    enableCellSelect: false,
    rowHeight: 35,
    headerFiltersHeight: 45,
    enableRowSelect: false,
    minHeight: 350,
    rowKey: 'id',
    scrollToRowIndex: 0,
    cellNavigationMode: CellNavigationMode.NONE,
    overScan: {
      colsStart: 2,
      colsEnd: 2,
      rowsStart: 2,
      rowsEnd: 2
    },
    enableCellAutoFocus: true,
    onBeforeEdit() { },
    minColumnWidth: 80,
    columnEquality: ColumnMetrics.sameColumn,
    editorPortalTarget: document.body
  };

  readonly state: Readonly<State> = getInitialState(this.props, this.createColumnMetrics());
  private readonly eventBus = new EventBus();
  private readonly _keysDown = new Set<number>();
  private _mounted = false;
  private _cachedColumns: Column[] | null = null;
  private _cachedComputedColumns: Column[] | null = null;

  // Refs
  private readonly grid = React.createRef<HTMLDivElement>();
  private readonly selectAllCheckbox = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this._mounted = true;
    window.addEventListener('resize', this.metricsUpdated);
    if (this.props.cellRangeSelection) {
      window.addEventListener('mouseup', this.onWindowMouseUp);
    }
    this.metricsUpdated();
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this.metricsUpdated);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.columns) {
      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)
        || nextProps.minWidth !== this.props.minWidth) {
        const columnMetrics = this.createColumnMetrics(nextProps);
        this.setState({ columnMetrics });
      }
    }
  }

  selectCell(cellPosition: CellPosition, openEditor?: boolean) {
    this.eventBus.dispatch(EventTypes.SELECT_CELL, cellPosition, openEditor);
  }

  selectStart(cellPosition: CellPosition) {
    this.eventBus.dispatch(EventTypes.SELECT_START, cellPosition);
  }

  selectUpdate(cellPosition: CellPosition) {
    this.eventBus.dispatch(EventTypes.SELECT_UPDATE, cellPosition);
  }

  selectEnd() {
    this.eventBus.dispatch(EventTypes.SELECT_END);
  }

  handleDragEnter = ({ overRowIdx }: any) => {
    this.eventBus.dispatch(EventTypes.DRAG_ENTER, { overRowIdx });
  };

  gridWidth() {
    return this.grid.current ? this.grid.current.getBoundingClientRect().width : 0;
  }

  getTotalWidth() {
    if (this._mounted) {
      return this.gridWidth();
    }

    return getSize(this.props.columns) * this.props.minColumnWidth;
  }

  getColumnMetricsType(metrics: any) {
    const totalWidth = metrics.totalWidth || this.getTotalWidth();
    const currentMetrics = {
      columns: metrics.columns,
      totalWidth,
      minColumnWidth: metrics.minColumnWidth
    };
    return ColumnMetrics.recalculate(currentMetrics);
  }

  getColumn(idx: number) {
    return getColumn(this.state.columnMetrics.columns, idx);
  }

  metricsUpdated = () => {
    this.setState({ columnMetrics: this.createColumnMetrics() });
  };

  createColumnMetrics(props = this.props) {
    const gridColumns = this.setupGridColumns(props);
    return this.getColumnMetricsType({
      columns: gridColumns,
      minColumnWidth: this.props.minColumnWidth,
      totalWidth: props.minWidth
    });
  }

  onColumnResize = (index: number, width: number) => {
    const columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
    this.setState({ columnMetrics });
    if (this.props.onColumnResize) {
      this.props.onColumnResize(index, width);
    }
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    // Track which keys are currently down for shift clicking etc
    this._keysDown.add(event.keyCode);

    const { onGridKeyDown } = this.props;
    if (onGridKeyDown) {
      onGridKeyDown(event);
    }
  };

  onKeyUp = (event: React.KeyboardEvent) => {
    // Track which keys are currently down for shift clicking etc
    this._keysDown.delete(event.keyCode);

    const { onGridKeyUp } = this.props;
    if (onGridKeyUp) {
      onGridKeyUp(event);
    }
  };

  isSingleKeyDown(keyCode: number) {
    return this._keysDown.has(keyCode) && this._keysDown.size === 1;
  }

  onColumnEvent = (event: any, columnEvent: any) => {
    const { idx, name } = columnEvent;

    if (name && typeof idx !== 'undefined') {
      const column = this.getColumn(idx);

      if (column && column.events && isFunction(column.events[name])) {
        const eventArgs = {
          idx,
          rowIdx: columnEvent.rowIdx,
          rowId: columnEvent.rowId,
          column
        };

        column.events[name](event, eventArgs);
      }
    }
  };

  onCellClick = (cellPosition: CellPosition) => {
    this.selectCell(cellPosition);

    const { onRowClick, rowGetter } = this.props;
    if (onRowClick) {
      const { idx, rowIdx } = cellPosition;
      onRowClick(rowIdx, rowGetter(rowIdx), this.getColumn(idx));
    }
  };

  onCellDoubleClick = (cellPosition: CellPosition) => {
    this.selectCell(cellPosition, true);

    const { onRowDoubleClick, rowGetter } = this.props;
    if (onRowDoubleClick) {
      const { idx, rowIdx } = cellPosition;
      onRowDoubleClick(rowIdx, rowGetter(rowIdx), this.getColumn(idx));
    }
  };

  onCellMouseDown = (cellPosition: CellPosition) => {
    this.selectStart(cellPosition);
  };

  onCellMouseEnter = (cellPosition: CellPosition) => {
    this.selectUpdate(cellPosition);
  };

  onWindowMouseUp = () => {
    this.selectEnd();
  };

  onCellContextMenu = (cellPosition: CellPosition) => {
    this.selectCell(cellPosition);
  };

  onToggleFilter = () => {
    // setState() does not immediately mutate this.state but creates a pending state transition.
    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
    this.setState({ canFilter: !this.state.canFilter }, () => {
      if (this.state.canFilter === false && this.props.onClearFilters) {
        this.props.onClearFilters();
      }
    });
  };

  onDragHandleDoubleClick = (e: any) => {
    if (this.props.onGridRowsUpdated) {
      const cellKey = this.getColumn(e.idx).key;
      this.onGridRowsUpdated(cellKey, e.rowIdx, this.props.rowsCount - 1, { [cellKey]: e.rowData[cellKey] }, UpdateActions.COLUMN_FILL);
    }
  };

  onCellExpand = (args: any) => {
    if (this.props.onCellExpand) {
      this.props.onCellExpand(args);
    }
  };

  onRowExpandToggle = (args: any) => {
    if (this.props.onRowExpandToggle) {
      this.props.onRowExpandToggle(args);
    }
  };

  /**
 * onGridRowsUpdated will be called for the following update scenarios
 * - Whenever a single cell is updated
 * - Whenever the value of a cell is copy/pasted to another cell
 * - Whenever multiple cells of a column are updated by dragging the fill handle of another cell
 * - Whenever multiple cells of a column are updated by double clicking the fill handle of another cell
 * @param {object} updated Updated key/value pairs that should be applied to each row to update
 * @param {number} toRow The index of the destination row being to be updated
 * @param {number} toRowId The unique id of the destination row to be updated
 * @param {string} action The action that triggered the update. Can be one of [CELL_UPDATE, COLUMN_FILL, COPY_PASTE, CELL_DRAG]
 * @returns {object} fromRowData The row data of the origin row
 * The following are optional arguments that apply when editing multiple rows or copying from one cell to another
 * @param {array} rowIds The unique id of each row to be updated
 * @param {number} fromRowId The unique id property of the source row
 * @param {number} fromRow The index of the source row
 */
  onGridRowsUpdated = (cellKey: any, fromRow: any, toRow: any, updated: any, action: UpdateActions, originRow: any) => {
    const { rowGetter, rowKey, onGridRowsUpdated } = this.props;
    if (!onGridRowsUpdated) {
      return;
    }

    const rowIds = [];
    for (let i = fromRow; i <= toRow; i++) {
      rowIds.push(rowGetter(i)[rowKey]);
    }

    const fromRowData = rowGetter(action === UpdateActions.COPY_PASTE ? originRow : fromRow);
    const fromRowId = fromRowData[rowKey];
    const toRowId = rowGetter(toRow)[rowKey];
    onGridRowsUpdated({ cellKey, fromRow, toRow, fromRowId, toRowId, rowIds, updated, action, fromRowData });
  };

  onCommit = (commit: any) => {
    const targetRow = commit.rowIdx;
    this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, UpdateActions.CELL_UPDATE);
  };

  onScroll = (scrollState: any) => {
    if (this.props.onScroll) {
      this.props.onScroll(scrollState);
    }
  }

  handleSort = (columnKey: string, direction: DEFINE_SORT) => {
    this.setState({ sortDirection: direction, sortColumn: columnKey }, () => {
      this.props.onGridSort(columnKey, direction);
    });
  };

  getSelectedRow(rows: any[], key: any) {
    return rows.find(r => r[this.props.rowKey] === key);
  }

  useNewRowSelection() {
    return this.props.rowSelection && this.props.rowSelection.selectBy;
  }

  // return false if not a shift select so can be handled as normal row selection
  handleShiftSelect(rowIdx: number) {
    if (this.state.lastRowIdxUiSelected > -1 && this.isSingleKeyDown(KeyCodes.Shift)) {
      const { keys, indexes, isSelectedKey } = this.props.rowSelection.selectBy;
      const isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, this.props.rowGetter(rowIdx), rowIdx);

      if (isPreviouslySelected) return false;

      let handled = false;

      if (rowIdx > this.state.lastRowIdxUiSelected) {
        const rowsSelected = [];

        for (let i = this.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
          rowsSelected.push({ rowIdx: i, row: this.props.rowGetter(i) });
        }

        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
          this.props.rowSelection.onRowsSelected(rowsSelected);
        }

        handled = true;
      } else if (rowIdx < this.state.lastRowIdxUiSelected) {
        const rowsSelected = [];

        for (let i = rowIdx; i <= this.state.lastRowIdxUiSelected - 1; i++) {
          rowsSelected.push({ rowIdx: i, row: this.props.rowGetter(i) });
        }

        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
          this.props.rowSelection.onRowsSelected(rowsSelected);
        }

        handled = true;
      }

      if (handled) {
        this.setState({ lastRowIdxUiSelected: rowIdx });
      }

      return handled;
    }

    return false;
  }

  handleNewRowSelect(rowIdx: any, rowData: any) {
    const checkbox = this.selectAllCheckbox.current;
    if (checkbox && checkbox.checked === true) {
      checkbox.checked = false;
    }

    const { keys, indexes, isSelectedKey } = this.props.rowSelection.selectBy;
    const isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

    this.setState({ lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: { rowIdx, idx: 0 } });

    if (isPreviouslySelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
      this.props.rowSelection.onRowsDeselected([{ rowIdx, row: rowData }]);
    } else if (!isPreviouslySelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
      this.props.rowSelection.onRowsSelected([{ rowIdx, row: rowData }]);
    }
  }

  // columnKey not used here as this function will select the whole row,
  // but needed to match the function signature in the CheckboxEditor
  handleRowSelect = (rowIdx: number, columnKey: string, rowData: any, event: React.ChangeEvent) => {
    event.stopPropagation();

    if (this.useNewRowSelection()) {
      if (this.props.rowSelection.enableShiftSelect === true) {
        if (!this.handleShiftSelect(rowIdx)) {
          this.handleNewRowSelect(rowIdx, rowData);
        }
      } else {
        this.handleNewRowSelect(rowIdx, rowData);
      }
    } else { // Fallback to old onRowSelect handler
      const selectedRows = this.props.enableRowSelect === 'single' ? [] : this.state.selectedRows.slice(0);
      const selectedRow = this.getSelectedRow(selectedRows, rowData[this.props.rowKey]);
      if (selectedRow) {
        selectedRow.isSelected = !selectedRow.isSelected;
      } else {
        rowData.isSelected = true;
        selectedRows.push(rowData);
      }
      this.setState({ selectedRows, selected: { rowIdx, idx: 0 } });
      if (this.props.onRowSelect) {
        this.props.onRowSelect(selectedRows.filter(r => r.isSelected === true));
      }
    }
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let allRowsSelected;
    if (event.currentTarget instanceof HTMLInputElement && event.currentTarget.checked === true) {
      allRowsSelected = true;
    } else {
      allRowsSelected = false;
    }
    if (this.useNewRowSelection()) {
      const { keys, indexes, isSelectedKey } = this.props.rowSelection.selectBy;

      if (allRowsSelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
        const selectedRows = [];
        for (let i = 0; i < this.props.rowsCount; i++) {
          const rowData = this.props.rowGetter(i);
          if (!RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
            selectedRows.push({ rowIdx: i, row: rowData });
          }
        }

        if (selectedRows.length > 0) {
          this.props.rowSelection.onRowsSelected(selectedRows);
        }
      } else if (!allRowsSelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
        const deselectedRows = [];
        for (let i = 0; i < this.props.rowsCount; i++) {
          const rowData = this.props.rowGetter(i);
          if (RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
            deselectedRows.push({ rowIdx: i, row: rowData });
          }
        }

        if (deselectedRows.length > 0) {
          this.props.rowSelection.onRowsDeselected(deselectedRows);
        }
      }
    } else {
      const selectedRows = [];
      for (let i = 0; i < this.props.rowsCount; i++) {
        const row = { ...this.props.rowGetter(i), isSelected: allRowsSelected };
        selectedRows.push(row);
      }
      this.setState({ selectedRows });
      if (this.props.onRowSelect) {
        this.props.onRowSelect(selectedRows.filter(r => r.isSelected === true));
      }
    }
  };

  getHeaderRows() {
    const headerRow = {
      height: this.props.headerRowHeight || this.props.rowHeight,
      rowType: HeaderRowType.HEADER
    };

    if (this.state.canFilter !== true) {
      const filterRow = {
        filterable: true,
        onFilterChange: this.props.onAddFilter,
        height: this.props.headerFiltersHeight,
        rowType: HeaderRowType.FILTER
      };
      return [headerRow, filterRow];
    }

    return [headerRow];
  }

  getRowSelectionProps() {
    if (this.props.rowSelection) {
      return this.props.rowSelection.selectBy;
    }

    return null;
  }

  getSelectedRows() {
    if (this.props.rowSelection) {
      return null;
    }

    return this.state.selectedRows.filter(r => r.isSelected === true);
  }

  setupGridColumns(props = this.props) {
    const { columns } = props;
    if (this._cachedColumns === columns) {
      return this._cachedComputedColumns;
    }

    this._cachedColumns = columns;

    let cols = [...columns];
    let unshiftedCols = {};
    if (this.props.rowActionsCell || (props.enableRowSelect && !this.props.rowSelection) || (props.rowSelection && props.rowSelection.showCheckbox !== false)) {
      const SelectAllComponent = this.props.selectAllRenderer || SelectAll;
      const SelectAllRenderer = <SelectAllComponent onChange={this.handleCheckboxChange} ref={this.selectAllCheckbox} />;
      const headerRenderer = props.enableRowSelect === 'single' ? null : SelectAllRenderer;
      const Formatter = this.props.rowActionsCell ? this.props.rowActionsCell : CheckboxEditor;
      const selectColumn: Column = {
        key: 'select-row',
        name: '',
        formatter: <Formatter rowSelection={this.props.rowSelection} />,
        onCellChange: this.handleRowSelect,
        filterable: false,
        headerRenderer,
        width: 60,
        frozen: true,
        getRowMetaData: (rowData) => rowData,
        cellClass: this.props.rowActionsCell ? 'rdg-row-actions-cell' : ''
      };
      unshiftedCols = cols.unshift(selectColumn);
      cols = unshiftedCols > 0 ? cols : unshiftedCols;
    }
    this._cachedComputedColumns = cols;

    return this._cachedComputedColumns;
  }

  render() {
    const cellMetaData = {
      rowKey: this.props.rowKey,
      onCellClick: this.onCellClick,
      onCellContextMenu: this.onCellContextMenu,
      onCellDoubleClick: this.onCellDoubleClick,
      onColumnEvent: this.onColumnEvent,
      onCellExpand: this.onCellExpand,
      onRowExpandToggle: this.onRowExpandToggle,
      getCellActions: this.props.getCellActions,
      onDeleteSubRow: this.props.onDeleteSubRow,
      onAddSubRow: this.props.onAddSubRow,
      onDragEnter: this.handleDragEnter
    };
    if (this.props.cellRangeSelection) {
      cellMetaData.onCellMouseDown = this.onCellMouseDown;
      cellMetaData.onCellMouseEnter = this.onCellMouseEnter;
    }

    let containerWidth = this.props.minWidth || this.gridWidth();
    let gridWidth = containerWidth - this.state.scrollOffset;

    // depending on the current lifecycle stage, gridWidth() may not initialize correctly
    // this also handles cases where it always returns undefined -- such as when inside a div with display:none
    // eg Bootstrap tabs and collapses
    if (typeof containerWidth === 'undefined' || isNaN(containerWidth) || containerWidth === 0) {
      containerWidth = '100%';
    }
    if (typeof gridWidth === 'undefined' || isNaN(gridWidth) || gridWidth === 0) {
      gridWidth = '100%';
    }

    const headerRows = this.getHeaderRows();
    const rowOffsetHeight = headerRows.reduce((height, row) => height += row.height);

    return (
      <div
        className="react-grid-Container"
        style={{ width: containerWidth }}
        ref={this.grid}
      >
        <ToolbarContainer
          toolbar={this.props.toolbar}
          columns={this.props.columns}
          rowsCount={this.props.rowsCount}
          onToggleFilter={this.onToggleFilter}
        />
        <Grid
          {...this.props}
          rowKey={this.props.rowKey}
          headerRows={headerRows}
          columnMetrics={this.state.columnMetrics}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount}
          rowHeight={this.props.rowHeight}
          cellMetaData={cellMetaData}
          selectedRows={this.getSelectedRows()}
          rowSelection={this.getRowSelectionProps()}
          expandedRows={this.state.expandedRows}
          rowOffsetHeight={rowOffsetHeight}
          sortColumn={this.state.sortColumn}
          sortDirection={this.state.sortDirection}
          onSort={this.handleSort}
          minHeight={this.props.minHeight}
          totalWidth={gridWidth}
          onViewportKeydown={this.onKeyDown}
          onViewportKeyup={this.onKeyUp}
          onColumnResize={this.onColumnResize}
          scrollToRowIndex={this.props.scrollToRowIndex}
          contextMenu={this.props.contextMenu}
          overScan={this.props.overScan}
          enableCellSelect={this.props.enableCellSelect}
          enableCellAutoFocus={this.props.enableCellAutoFocus}
          cellNavigationMode={this.props.cellNavigationMode}
          eventBus={this.eventBus}
          onCheckCellIsEditable={this.props.onCheckCellIsEditable}
          onCellCopyPaste={this.props.onCellCopyPaste}
          onGridRowsUpdated={this.onGridRowsUpdated}
          onDragHandleDoubleClick={this.onDragHandleDoubleClick}
          onCellSelected={this.props.onCellSelected}
          onCellDeSelected={this.props.onCellDeSelected}
          onCellRangeSelectionStarted={this.props.cellRangeSelection && this.props.cellRangeSelection.onStart}
          onCellRangeSelectionUpdated={this.props.cellRangeSelection && this.props.cellRangeSelection.onUpdate}
          onCellRangeSelectionCompleted={this.props.cellRangeSelection && this.props.cellRangeSelection.onComplete}
          onCommit={this.onCommit}
          onScroll={this.onScroll}
          editorPortalTarget={this.props.editorPortalTarget}
        />
      </div>
    );
  }
}
