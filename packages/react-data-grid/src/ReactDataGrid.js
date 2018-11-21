import React from 'react';
import PropTypes from 'prop-types';
import {deprecate} from 'react-is-deprecated';
import BaseGrid from './Grid';
import CheckboxEditor from 'common/editors/CheckboxEditor';
import RowUtils from './RowUtils';
import {getColumn, getSize} from './ColumnUtils';
import KeyCodes from './KeyCodes';
import {isFunction} from 'common/utils';
import SelectAll from './formatters/SelectAll';
import { DEFINE_SORT } from 'common/cells/headerCells/SortableHeaderCell';
const ColumnMetrics = require('./ColumnMetrics');
import { CellNavigationMode, EventTypes, UpdateActions, HeaderRowType } from 'common/constants';
import { EventBus } from './masks';

require('../../../themes/react-data-grid-core.css');
require('../../../themes/react-data-grid-checkbox.css');

if (!Object.assign) {
  Object.assign = require('object-assign');
}

const deprecationWarning = (propName, alternative) => `${propName} has been deprecated and will be removed in a future version. Please use ${alternative} instead`;

/** Main API Component to render a data grid of rows and columns
 *
 * Example code
 * -----
 *
 * ```javascript
 * <ReactDataGrid
 *   columns={columns}
 *   rowGetter={i => rows[i]}
 *   rowsCount={3} />
 * ```
*/
class ReactDataGrid extends React.Component {
  static displayName = 'ReactDataGrid';

  static propTypes = {
    /** The height of each row in pixels */
    rowHeight: PropTypes.number,
    /** The height of the header row in pixels */
    headerRowHeight: PropTypes.number,
    /** The height of the header row in pixels */
    headerFiltersHeight: PropTypes.number,
    /** The minimum height of the grid in pixels */
    minHeight: PropTypes.number.isRequired,
    /** The minimum width of the grid in pixels */
    minWidth: PropTypes.number,
    /** Deprecated: Legacy prop to turn on row selection. Use rowSelection props instead*/
    enableRowSelect: deprecate(PropTypes.func, deprecationWarning('enableRowSelect', 'rowSelection')),
    /** Deprecated: Function called when grid is updated via a cell commit. Use onGridRowsUpdated instead*/
    onRowUpdated: deprecate(PropTypes.func, deprecationWarning('onRowUpdated', 'onGridRowsUpdated')),
    /** 	A function called for each rendered row that should return a plain key/value pair object */
    rowGetter: PropTypes.func.isRequired,
    /** The number of rows to be rendered */
    rowsCount: PropTypes.number.isRequired,
    /** Component used to render toolbar above the grid */
    toolbar: PropTypes.element,
    /** Used to toggle whether cells can be selected or not */
    enableCellSelect: PropTypes.bool,
    /**
    * An array of objects representing each column on the grid.
    * Can also be an ImmutableJS object
    */
    columns: PropTypes.arrayOf(PropTypes.shape({
      /** The name of the column. By default it will be displayed in the header cell */
      name: PropTypes.node.isRequired,
      /** A unique key to distinguish each column */
      key: PropTypes.string.isRequired,
      /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns*/
      width: PropTypes.number,
      /** Enable filtering of a column */
      filterable: PropTypes.bool,
      /** Component to be used to filter the data of the column */
      filterRenderer: PropTypes.node,
      /** Enable resizing of a column */
      resizable: PropTypes.bool,
      /** Enable sorting of a column */
      sortable: PropTypes.bool,
      /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
      sortDescendingFirst: PropTypes.bool,
      /** Enable dragging of a column */
      dragable: PropTypes.bool,
      /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
      editable: PropTypes.node,
      /** Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable */
      editor: PropTypes.node,
      /** Formatter to be used to render the cell content */
      formatter: PropTypes.node,
      /** Header renderer for each header cell */
      headerRenderer: PropTypes.node,
      /** Determines whether column is frozen or not */
      frozen: PropTypes.bool,
      /** By adding an event object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column */
      events: PropTypes.object

    })).isRequired,
    /** Callback whenever grid is filtered via FilterableHeaderCell*/
    onFilter: PropTypes.func,
    /** Deprecated: Function called when grid is updated via a copy/paste. Use onGridRowsUpdated instead*/
    onCellCopyPaste: deprecate(PropTypes.func, deprecationWarning('onCellCopyPaste', 'onGridRowsUpdated')),
    /** Deprecated: Function called when grid is updated via a cell drag. Use onGridRowsUpdated instead*/
    onCellsDragged: deprecate(PropTypes.func, deprecationWarning('onCellsDragged', 'onGridRowsUpdated')),
    /** Function called on each cell render to render a list of actions for each cell */
    getCellActions: PropTypes.func,
    /**  Callback */
    onAddFilter: PropTypes.func,
    /**  Function called whenever grid is sorted*/
    onGridSort: PropTypes.func,
    /** The key of the column which is currently being sorted */
    sortColumn: PropTypes.string,
    /** The direction to sort the sortColumn*/
    sortDirection: PropTypes.oneOf(Object.keys(DEFINE_SORT)),
    /** Deprecated: Function called when grid is updated via double clicking the cell drag handle. Use onGridRowsUpdated instead*/
    onDragHandleDoubleClick: deprecate(PropTypes.func, deprecationWarning('onDragHandleDoubleClick', 'onGridRowsUpdated')),
    /**
     * Callback called whenever row data is updated
     * When editing is enabled, this callback will be called for the following scenarios
     * 1. Using the supplied editor of the column. The default editor is the [SimpleTextEditor](https://github.com/adazzle/react-data-grid/blob/master/packages/common/editors/SimpleTextEditor.js).
     * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
     * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
     * 4. Update all cells under a given cell by double clicking the cell's fill handle.
     */
    onGridRowsUpdated: PropTypes.func,
    /** Function called whenever row is selected */
    onRowSelect: PropTypes.func,
    /** The primary key property of each row */
    rowKey: PropTypes.string,
    /** Deprecated */
    rowScrollTimeout: deprecate(PropTypes.number),
    /** When set, grid will scroll to this row index */
    scrollToRowIndex: PropTypes.number,
    /** Function called whenever filters are cleared */
    onClearFilters: PropTypes.func,
    /** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
    contextMenu: PropTypes.element,
    /** */
    cellNavigationMode: PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
    /** Function called whenever a cell is selected */
    onCellSelected: PropTypes.func,
    /** Function called whenever a cell is deselected */
    onCellDeSelected: PropTypes.func,
    /** Object used to configure cell range selection */
    cellRangeSelection: PropTypes.shape({
      /** Function called whenever cell range selection begins*/
      onStart: PropTypes.func,
      /**  Function called whenever cell selection range is updated*/
      onUpdate: PropTypes.func,
      /** Function called whenever cell selection range has been completed */
      onComplete: PropTypes.func
    }),
    /** Function called whenever a cell has been expanded */
    onCellExpand: PropTypes.func,
    /** Enables drag and drop on the grid */
    enableDragAndDrop: PropTypes.bool,
    onRowExpandToggle: PropTypes.func,
    /** Component used to render a draggable header cell */
    draggableHeaderCell: PropTypes.func,
    getValidFilterValues: PropTypes.func,
    rowSelection: PropTypes.shape({
      enableShiftSelect: PropTypes.bool,
      /** Function called whenever rows are selected */
      onRowsSelected: PropTypes.func,
      /** Function called whenever rows are deselected */
      onRowsDeselected: PropTypes.func,
      /** toggle whether to show a checkbox in first column to select rows */
      showCheckbox: PropTypes.bool,
      /** Method by which rows should be selected */
      selectBy: PropTypes.oneOfType([
        PropTypes.shape({
          /** List of indexes of selected rows */
          indexes: PropTypes.arrayOf(PropTypes.number).isRequired
        }),
        PropTypes.shape({
          /** Name of property of row object which determines whether row is selected */
          isSelectedKey: PropTypes.string.isRequired
        }),
        PropTypes.shape({
          keys: PropTypes.shape({
             /** The selected unique ids of each row */
            values: PropTypes.array.isRequired,
             /** The name of the unoque id property of each row */
            rowKey: PropTypes.string.isRequired
          }).isRequired
        })
      ]).isRequired
    }),
    /** Function called whenever row is clicked */
    onRowClick: PropTypes.func,
    /** Function called whenever row is double clicked */
    onRowDoubleClick: PropTypes.func,
    /** Function called whenever keyboard key is pressed up */
    onGridKeyUp: PropTypes.func,
    /** Function called whenever keyboard key is pressed down */
    onGridKeyDown: PropTypes.func,
    /** Function called whenever keyboard key is pressed down */
    rowGroupRenderer: PropTypes.func,
    /** Component to render row actions cell when present */
    rowActionsCell: PropTypes.func,
    /** called before cell is set active, returns a boolean to determine whether cell is editable */
    onCheckCellIsEditable: PropTypes.func,
    /** Called whenever a sub row is deleted from the grid */
    onDeleteSubRow: PropTypes.func,
    /** Called whenever a sub row is added to the grid */
    onAddSubRow: PropTypes.func,
    /** Toggles whether cells should be autofocused */
    enableCellAutoFocus: PropTypes.bool,
    /** Called just before a cell is about to be edited */
    onBeforeEdit: PropTypes.func,
    /** Component to render the UI in the header row for selecting all rows  */
    selectAllRenderer: PropTypes.object,
    /** Minimum column width in pixels */
    minColumnWidth: PropTypes.number,
    /** Called when a column is resized */
    onColumnResize: PropTypes.func,
    /** Called when the grid is scrolled */
    onScroll: PropTypes.func
  };

  static defaultProps = {
    enableCellSelect: false,
    rowHeight: 35,
    headerFiltersHeight: 45,
    enableRowSelect: false,
    minHeight: 350,
    rowKey: 'id',
    rowScrollTimeout: 0,
    scrollToRowIndex: 0,
    cellNavigationMode: CellNavigationMode.NONE,
    overScan: {
      colsStart: 2,
      colsEnd: 2,
      rowsStart: 2,
      rowsEnd: 2
    },
    enableCellAutoFocus: true,
    onBeforeEdit: () => {},
    minColumnWidth: 80,
    columnEquality: ColumnMetrics.sameColumn
  };

  constructor(props, context) {
    super(props, context);
    const columnMetrics = this.createColumnMetrics();
    const initialState = {columnMetrics, selectedRows: [], expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, scrollOffset: 0, lastRowIdxUiSelected: -1};
    if (this.props.sortColumn && this.props.sortDirection) {
      initialState.sortColumn = this.props.sortColumn;
      initialState.sortDirection = this.props.sortDirection;
    }

    this.state = initialState;
    this.eventBus = new EventBus();
  }

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns) {
      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) ||
          nextProps.minWidth !== this.props.minWidth) {
        const columnMetrics = this.createColumnMetrics(nextProps);
        this.setState({columnMetrics: columnMetrics});
      }
    }
  }

  selectCell = ({ idx, rowIdx }, openEditor) => {
    this.eventBus.dispatch(EventTypes.SELECT_CELL, { rowIdx, idx }, openEditor);
  };

  selectStart = (cellPosition) => {
    this.eventBus.dispatch(EventTypes.SELECT_START, cellPosition);
  };

  selectUpdate = (cellPosition) => {
    this.eventBus.dispatch(EventTypes.SELECT_UPDATE, cellPosition);
  };

  selectEnd = () => {
    this.eventBus.dispatch(EventTypes.SELECT_END);
  };

  handleDragEnter = ({ overRowIdx }) => {
    this.eventBus.dispatch(EventTypes.DRAG_ENTER, { overRowIdx });
  };

  gridWidth = () => {
    return this.grid ? this.grid.parentElement.offsetWidth : 0;
  };

  getTotalWidth = () => {
    let totalWidth = 0;
    if (this._mounted) {
      totalWidth = this.gridWidth();
    } else {
      totalWidth = getSize(this.props.columns) * this.props.minColumnWidth;
    }
    return totalWidth;
  };

  getColumnMetricsType = (metrics) => {
    const totalWidth = metrics.totalWidth || this.getTotalWidth();
    const currentMetrics = {
      columns: metrics.columns,
      totalWidth: totalWidth,
      minColumnWidth: metrics.minColumnWidth
    };
    const updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
    return updatedMetrics;
  };

  getColumn = (idx) => {
    const { columns } = this.state.columnMetrics;
    return getColumn(columns, idx);
  };

  getSize = () => {
    const { columns } = this.state.columnMetrics;
    return getSize(columns);
  };

  metricsUpdated = () => {
    const columnMetrics = this.createColumnMetrics();
    this.setState({ columnMetrics });
  };

  createColumnMetrics = (props = this.props) => {
    const gridColumns = this.setupGridColumns(props);
    return this.getColumnMetricsType({
      columns: gridColumns,
      minColumnWidth: this.props.minColumnWidth,
      totalWidth: props.minWidth
    });
  };

  onColumnResize = (index, width) => {
    const columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
    this.setState({ columnMetrics });
    if (this.props.onColumnResize) {
      this.props.onColumnResize(index, width);
    }
  };

  onKeyDown = (e) => {
    // Track which keys are currently down for shift clicking etc
    this._keysDown = this._keysDown || {};
    this._keysDown[e.keyCode] = true;

    const { onGridKeyDown } = this.props;
    if (isFunction(onGridKeyDown)) {
      onGridKeyDown(e);
    }
  };

  onKeyUp = (e) => {
    // Track which keys are currently down for shift clicking etc
    this._keysDown = this._keysDown || {};
    delete this._keysDown[e.keyCode];

    const { onGridKeyUp } = this.props;
    if (isFunction(onGridKeyUp)) {
      onGridKeyUp(e);
    }
  };

  isSingleKeyDown = (keyCode) => {
    if (!this._keysDown) return false;
    return keyCode in this._keysDown && Object.keys(this._keysDown).length === 1;
  };

  onColumnEvent = (ev, columnEvent) => {
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

        column.events[name](ev, eventArgs);
      }
    }
  };

  onCellClick = ({ rowIdx, idx }) => {
    const { onRowClick, rowGetter } = this.props;
    this.selectCell({ rowIdx, idx });

    if (isFunction(onRowClick)) {
      onRowClick(rowIdx, rowGetter(rowIdx), this.getColumn(idx));
    }
  };

  onCellMouseDown = (cellPosition) => {
    this.selectStart(cellPosition);
  };

  onCellMouseEnter = (cellPosition) => {
    this.selectUpdate(cellPosition);
  };

  onWindowMouseUp = () => {
    this.selectEnd();
  };

  onCellContextMenu = ({ rowIdx, idx }) => {
    this.selectCell({ rowIdx, idx });
  };

  onCellDoubleClick = ({ rowIdx, idx }) => {
    const { onRowDoubleClick, rowGetter } = this.props;
    if (isFunction(onRowDoubleClick)) {
      onRowDoubleClick(rowIdx, rowGetter(rowIdx), this.getColumn(idx));
    }
    this.openCellEditor(rowIdx, idx);
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

  onDragHandleDoubleClick = (e) => {
    if (this.props.onDragHandleDoubleClick) {
      this.props.onDragHandleDoubleClick(e);
    }

    if (this.props.onGridRowsUpdated) {
      const cellKey = this.getColumn(e.idx).key;
      this.onGridRowsUpdated(cellKey, e.rowIdx, this.props.rowsCount - 1, {[cellKey]: e.rowData[cellKey]}, UpdateActions.COLUMN_FILL);
    }
  };

  onCellExpand = (args) => {
    if (this.props.onCellExpand) {
      this.props.onCellExpand(args);
    }
  };

  onRowExpandToggle = (args) => {
    if (typeof this.props.onRowExpandToggle === 'function') {
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
  onGridRowsUpdated = (cellKey, fromRow, toRow, updated, action, originRow) => {
    const { rowGetter, rowKey, onGridRowsUpdated } = this.props;
    // Deprecated prop
    // to be removed in next major release
    if (isFunction(this.props.onRowUpdated)) {
      this.props.onRowUpdated({updated, rowIdx: fromRow, cellKey, value: updated[cellKey]});
    }
    if (!isFunction(onGridRowsUpdated)) {
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

  onCommit = (commit) => {
    const targetRow = commit.rowIdx;
    this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, UpdateActions.CELL_UPDATE);
  };

  onScroll = (scrollState) => {
    if (isFunction(this.props.onScroll)) {
      this.props.onScroll(scrollState);
    }
  }

  handleSort = (columnKey, direction) => {
    this.setState({sortDirection: direction, sortColumn: columnKey}, () => {
      this.props.onGridSort(columnKey, direction);
    });
  };

  getSelectedRow = (rows, key) => {
    const selectedRow = rows.filter(r => {
      if (r[this.props.rowKey] === key) {
        return true;
      }
      return false;
    });
    if (selectedRow.length > 0) {
      return selectedRow[0];
    }
  };

  useNewRowSelection = () => {
    return this.props.rowSelection && this.props.rowSelection.selectBy;
  };

  // return false if not a shift select so can be handled as normal row selection
  handleShiftSelect = (rowIdx) => {
    if (this.state.lastRowIdxUiSelected > -1 && this.isSingleKeyDown(KeyCodes.Shift)) {
      const {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;
      const isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, this.props.rowGetter(rowIdx), rowIdx);

      if (isPreviouslySelected) return false;

      let handled = false;

      if (rowIdx > this.state.lastRowIdxUiSelected) {
        const rowsSelected = [];

        for (let i = this.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
          rowsSelected.push({rowIdx: i, row: this.props.rowGetter(i)});
        }

        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
          this.props.rowSelection.onRowsSelected(rowsSelected);
        }

        handled = true;
      } else if (rowIdx < this.state.lastRowIdxUiSelected) {
        const rowsSelected = [];

        for (let i = rowIdx; i <= this.state.lastRowIdxUiSelected - 1; i++) {
          rowsSelected.push({rowIdx: i, row: this.props.rowGetter(i)});
        }

        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
          this.props.rowSelection.onRowsSelected(rowsSelected);
        }

        handled = true;
      }

      if (handled) {
        this.setState({lastRowIdxUiSelected: rowIdx});
      }

      return handled;
    }

    return false;
  };

  handleNewRowSelect = (rowIdx, rowData) => {
    if (this.selectAllCheckbox && this.selectAllCheckbox.checked === true) {
      this.selectAllCheckbox.checked = false;
    }

    const {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;
    const isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

    this.setState({lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: {rowIdx: rowIdx, idx: 0}});

    if (isPreviouslySelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
      this.props.rowSelection.onRowsDeselected([{rowIdx, row: rowData}]);
    } else if (!isPreviouslySelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
      this.props.rowSelection.onRowsSelected([{rowIdx, row: rowData}]);
    }
  };

  // columnKey not used here as this function will select the whole row,
  // but needed to match the function signature in the CheckboxEditor
  handleRowSelect = (rowIdx, columnKey, rowData, e) => {
    e.stopPropagation();

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
      this.setState({selectedRows: selectedRows, selected: {rowIdx: rowIdx, idx: 0}});
      if (this.props.onRowSelect) {
        this.props.onRowSelect(selectedRows.filter(r => r.isSelected === true));
      }
    }
  };

  handleCheckboxChange = (e) => {
    let allRowsSelected;
    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
      allRowsSelected = true;
    } else {
      allRowsSelected = false;
    }
    if (this.useNewRowSelection()) {
      const {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;

      if (allRowsSelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
        const selectedRows = [];
        for (let i = 0; i < this.props.rowsCount; i++) {
          const rowData = this.props.rowGetter(i);
          if (!RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
            selectedRows.push({rowIdx: i, row: rowData});
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
            deselectedRows.push({rowIdx: i, row: rowData});
          }
        }

        if (deselectedRows.length > 0) {
          this.props.rowSelection.onRowsDeselected(deselectedRows);
        }
      }
    } else {
      const selectedRows = [];
      for (let i = 0; i < this.props.rowsCount; i++) {
        const row = Object.assign({}, this.props.rowGetter(i), {isSelected: allRowsSelected});
        selectedRows.push(row);
      }
      this.setState({selectedRows: selectedRows});
      if (typeof this.props.onRowSelect === 'function') {
        this.props.onRowSelect(selectedRows.filter(r => r.isSelected === true));
      }
    }
  };

  getRowOffsetHeight = () => {
    let offsetHeight = 0;
    this.getHeaderRows().forEach((row) => offsetHeight += parseFloat(row.height, 10) );
    return offsetHeight;
  };

  getHeaderRows = () => {
    const rows = [{ height: this.props.headerRowHeight || this.props.rowHeight, rowType: HeaderRowType.HEADER }];
    if (this.state.canFilter === true) {
      rows.push({
        filterable: true,
        onFilterChange: this.props.onAddFilter,
        height: this.props.headerFiltersHeight,
        rowType: HeaderRowType.FILTER
      });
    }
    return rows;
  };

  getInitialSelectedRows = () => {
    const selectedRows = [];
    for (let i = 0; i < this.props.rowsCount; i++) {
      selectedRows.push(false);
    }
    return selectedRows;
  };

  getRowSelectionProps = () => {
    if (this.props.rowSelection) {
      return this.props.rowSelection.selectBy;
    }

    return null;
  };

  getSelectedRows = () => {
    if (this.props.rowSelection) {
      return null;
    }

    return this.state.selectedRows.filter(r => r.isSelected === true);
  };

  getDataGridDOMNode = () => {
    return this.grid;
  };

  openCellEditor = (rowIdx, idx) => {
    this.selectCell({ rowIdx, idx }, true);
  };

  scrollToColumn = (colIdx) => {
    this.eventBus.dispatch(EventTypes.SCROLL_TO_COLUMN, colIdx);
  };

  setupGridColumns = (props = this.props) => {
    const { columns } = props;
    if (this._cachedColumns === columns) {
      return this._cachedComputedColumns;
    }

    this._cachedColumns = columns;

    let cols = columns.slice(0);
    let unshiftedCols = {};
    if (this.props.rowActionsCell || (props.enableRowSelect && !this.props.rowSelection) || (props.rowSelection && props.rowSelection.showCheckbox !== false)) {
      const SelectAllComponent = this.props.selectAllRenderer || SelectAll;
      const SelectAllRenderer = <SelectAllComponent onChange={this.handleCheckboxChange} inputRef={grid => this.selectAllCheckbox = grid} />;
      const headerRenderer = props.enableRowSelect === 'single' ? null : SelectAllRenderer;
      const Formatter = this.props.rowActionsCell ? this.props.rowActionsCell : CheckboxEditor;
      const selectColumn = {
        key: 'select-row',
        name: '',
        formatter: <Formatter rowSelection={this.props.rowSelection}/>,
        onCellChange: this.handleRowSelect,
        filterable: false,
        headerRenderer: headerRenderer,
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
  };

  setGridRef = (grid) => {
    this.grid = grid;
  };

  setBaseGridRef = (base) => {
    this.base = base;
  };

  renderToolbar = () => {
    const Toolbar = this.props.toolbar;
    const toolBarProps =  {columns: this.props.columns, onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount};
    if (React.isValidElement(Toolbar)) {
      return ( React.cloneElement(Toolbar, toolBarProps));
    } else if (isFunction(Toolbar)) {
      return <Toolbar {...toolBarProps}/>;
    }
  };

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

    const toolbar = this.renderToolbar();
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
    return (
      <div className="react-grid-Container" style={{width: containerWidth}}
        ref={this.setGridRef}>
        {toolbar}
        <div className="react-grid-Main">
          <BaseGrid
            ref={this.setBaseGridRef}
            {...this.props}
            rowKey={this.props.rowKey}
            headerRows={this.getHeaderRows()}
            columnMetrics={this.state.columnMetrics}
            rowGetter={this.props.rowGetter}
            rowsCount={this.props.rowsCount}
            rowHeight={this.props.rowHeight}
            cellMetaData={cellMetaData}
            selectedRows={this.getSelectedRows()}
            rowSelection={this.getRowSelectionProps()}
            expandedRows={this.state.expandedRows}
            rowOffsetHeight={this.getRowOffsetHeight()}
            sortColumn={this.state.sortColumn}
            sortDirection={this.state.sortDirection}
            onSort={this.handleSort}
            minHeight={this.props.minHeight}
            totalWidth={gridWidth}
            onViewportKeydown={this.onKeyDown}
            onViewportKeyup={this.onKeyUp}
            onColumnResize={this.onColumnResize}
            rowScrollTimeout={this.props.rowScrollTimeout}
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
          />
        </div>
      </div>
    );
  }
}

module.exports = ReactDataGrid;
