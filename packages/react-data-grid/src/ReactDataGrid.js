const React                 = require('react');
import PropTypes from 'prop-types';
const BaseGrid              = require('./Grid');
const CheckboxEditor        = require('./editors/CheckboxEditor');
const RowUtils = require('./RowUtils');
const ColumnUtils = require('./ColumnUtils');
const KeyCodes = require('./KeyCodes');
const isFunction = require('./utils/isFunction');
import SelectAll from './formatters/SelectAll';
import AppConstants from './AppConstants';
const ColumnMetrics        = require('./ColumnMetrics');
require('../../../themes/react-data-grid-core.css');
require('../../../themes/react-data-grid-checkbox.css');

import { createStore, reducer, EventTypes } from './stateManagement';

class ReactDataGrid extends React.Component {
  static displayName = 'ReactDataGrid';

  static propTypes = {
    rowHeight: PropTypes.number.isRequired,
    headerRowHeight: PropTypes.number,
    headerFiltersHeight: PropTypes.number,
    minHeight: PropTypes.number.isRequired,
    minWidth: PropTypes.number,
    enableRowSelect: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onRowUpdated: PropTypes.func,
    rowGetter: PropTypes.func.isRequired,
    rowsCount: PropTypes.number.isRequired,
    toolbar: PropTypes.element,
    enableCellSelect: PropTypes.bool,
    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onFilter: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onCellsDragged: PropTypes.func,
    getCellActions: PropTypes.func,
    onAddFilter: PropTypes.func,
    onGridSort: PropTypes.func,
    onDragHandleDoubleClick: PropTypes.func,
    onGridRowsUpdated: PropTypes.func,
    onRowSelect: PropTypes.func,
    rowKey: PropTypes.string,
    rowScrollTimeout: PropTypes.number,
    scrollToRowIndex: PropTypes.number,
    onClearFilters: PropTypes.func,
    contextMenu: PropTypes.element,
    cellNavigationMode: PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
    onCellSelected: PropTypes.func,
    onCellDeSelected: PropTypes.func,
    onCellExpand: PropTypes.func,
    enableDragAndDrop: PropTypes.bool,
    onRowExpandToggle: PropTypes.func,
    draggableHeaderCell: PropTypes.func,
    getValidFilterValues: PropTypes.func,
    rowSelection: PropTypes.shape({
      enableShiftSelect: PropTypes.bool,
      onRowsSelected: PropTypes.func,
      onRowsDeselected: PropTypes.func,
      showCheckbox: PropTypes.bool,
      selectBy: PropTypes.oneOfType([
        PropTypes.shape({
          indexes: PropTypes.arrayOf(PropTypes.number).isRequired
        }),
        PropTypes.shape({
          isSelectedKey: PropTypes.string.isRequired
        }),
        PropTypes.shape({
          keys: PropTypes.shape({
            values: PropTypes.array.isRequired,
            rowKey: PropTypes.string.isRequired
          }).isRequired
        })
      ]).isRequired
    }),
    onRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onGridKeyUp: PropTypes.func,
    onGridKeyDown: PropTypes.func,
    rowGroupRenderer: PropTypes.func,
    rowActionsCell: PropTypes.func,
    onCheckCellIsEditable: PropTypes.func,
    /* called before cell is set active, returns a boolean to determine whether cell is editable */
    overScan: PropTypes.object,
    onDeleteSubRow: PropTypes.func,
    onAddSubRow: PropTypes.func,
    enableCellAutoFocus: PropTypes.bool,
    onBeforeEdit: PropTypes.func,
    selectAllRenderer: PropTypes.object,
    minColumnWidth: PropTypes.number,
    columnEquality: PropTypes.func,
    onColumnResize: PropTypes.func,

    /* New Props */
    setCellActive: PropTypes.func,
    moveDown: PropTypes.func,
    moveUp: PropTypes.func,
    moveLeft: PropTypes.func,
    moveRight: PropTypes.func
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
    cellNavigationMode: 'none',
    overScan: {
      colsStart: 5,
      colsEnd: 5,
      rowsStart: 5,
      rowsEnd: 5
    },
    enableCellAutoFocus: true,
    onBeforeEdit: () => {},
    minColumnWidth: 80,
    columnEquality: ColumnMetrics.sameColumn
  };

  static childContextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    let columnMetrics = this.createColumnMetrics();
    this.state = {columnMetrics, selectedRows: [], copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0, lastRowIdxUiSelected: -1};
    this.store = createStore(reducer);
  }

  getChildContext() {
    return {
      store: this.store
    };
  }

  componentDidMount() {
    this._mounted = true;
    window.addEventListener('resize', this.metricsUpdated);
    this.metricsUpdated();
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this.metricsUpdated);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns) {
      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) ||
          nextProps.minWidth !== this.props.minWidth) {
        let columnMetrics = this.createColumnMetrics(nextProps);
        this.setState({columnMetrics: columnMetrics});
      }
    }
  }

  // TODO: connect
  selectCell = ({ idx, rowIdx }) => {
    this.store.dispatch({
      idx,
      rowIdx,
      type: EventTypes.selectCell
    });
  };

  gridWidth = () => {
    return this.grid ? this.grid.parentElement.offsetWidth : 0;
  };

  getTotalWidth = () => {
    let totalWidth = 0;
    if (this._mounted) {
      totalWidth = this.gridWidth();
    } else {
      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
    }
    return totalWidth;
  };

  getColumnMetricsType = (metrics) => {
    let totalWidth = metrics.totalWidth || this.getTotalWidth();
    let currentMetrics = {
      columns: metrics.columns,
      totalWidth: totalWidth,
      minColumnWidth: metrics.minColumnWidth
    };
    let updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
    return updatedMetrics;
  };

  getColumn = (idx) => {
    const { columns } = this.state.columnMetrics;
    return ColumnUtils.getColumn(columns, idx);
  };

  getSize = () => {
    const { columns } = this.state.columnMetrics;
    return ColumnUtils.getSize(columns);
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

  isKeyDown = (keyCode) => {
    if (!this._keysDown) return false;
    return keyCode in this._keysDown;
  };

  isSingleKeyDown = (keyCode) => {
    if (!this._keysDown) return false;
    return keyCode in this._keysDown && Object.keys(this._keysDown).length === 1;
  };

  onContextMenuHide = () => {
    document.removeEventListener('click', this.onContextMenuHide);
    // let newSelected = Object.assign({}, this.state.selected, {contextMenuDisplayed: false});
    // this.setState({selected: newSelected});
  };

  onColumnEvent = (ev, columnEvent) => {
    // TODO: fix me
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

  onSelect = (newSelection) => {
    const { onCellDeSelected, onCellSelected } = this.props;
    if (isFunction(onCellDeSelected)) {
      // TODO: connect
      const oldSelection = this.store.getState().selectedPosition;
      onCellDeSelected(oldSelection);
    }
    if (isFunction(onCellSelected)) {
      onCellSelected(newSelection);
    }

    this.selectCell(newSelection);
  };

  onCellClick = ({ rowIdx, idx }) => {
    const { onRowClick, rowGetter } = this.props;
    this.onSelect({ rowIdx, idx });

    if (isFunction(onRowClick)) {
      onRowClick(rowIdx, rowGetter(rowIdx), this.getColumn(idx));
    }
  };

  onCellContextMenu = ({ rowIdx, idx }) => {
    // this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx, contextMenuDisplayed: this.props.contextMenu});
    this.onSelect({ rowIdx, idx });
    if (this.props.contextMenu) {
      document.addEventListener('click', this.onContextMenuHide);
    }
  };

  onCellDoubleClick = ({ rowIdx, idx }) => {
    // FIXME: double click conflicts with single click?
    const { onRowDoubleClick, rowGetter } = this.props;
    if (isFunction(onRowDoubleClick)) {
      onRowDoubleClick(rowIdx, rowGetter(rowIdx), this.getColumn(idx));
    }
  };

  isFocusedOnCell = () => {
    return document.activeElement && document.activeElement.classList &&
      document.activeElement.classList.contains('react-grid-Cell');
  };

  isFocusedOnTable = () => {
    const domNode = this.getDataGridDOMNode();
    return domNode && domNode.contains(document.activeElement);
  };

  exitGrid = (oldSelectedCell, newSelectedValue) => {
    this.setState({ selected: newSelectedValue },
      () => {
        if (typeof this.props.onCellDeSelected === 'function') {
          this.props.onCellDeSelected(oldSelectedCell);
        }});
  };

  enterGrid = (newSelectedValue) => {
    this.setState({ selected: newSelectedValue },
      () => {
        if (typeof this.props.onCellSelected === 'function') {
          this.props.onCellSelected(newSelectedValue);
        }});
  };

  onPressTab = (e) => {
    // Scenario 0a: When there are no rows in the grid, pressing tab needs to allow the browser to handle it
    if (this.props.rowsCount === 0) {
      return;
    }
    // Scenario 0b: When we're editing a cell
    const idx = this.state.selected.idx;
    const rowIdx = this.state.selected.rowIdx;
    if (this.state.selected.active === true) {
      // if we are in a position to leave the grid, stop editing but stay in that cell
      if (this.canExitGrid(e)) {
        this.moveSelectedCell(e, 0, 0);
        return;
      }
      // otherwise move left or right as appropriate
      this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
      return;
    }
    const shift = e.shiftKey === true;
    // Scenario 1: we're at a cell where we can exit the grid
    if (this.canExitGrid(e) && this.isFocusedOnCell()) {
      if (shift && idx >= 0) {
        this.exitGrid({ idx, rowIdx}, { idx: -1, rowIdx, exitedLeft: true });
        return;
      } else if (!shift && idx >= 0) {
        this.exitGrid({ idx, rowIdx }, { idx: -1, rowIdx });
        return;
      }
    }
    // Scenario 2: we're on the div surrounding the grid and press shift+Tab
    // and we just exited left, so we want to let the browser handle it
    // KNOWN ISSUE: Focus on the table can come from either side and at this point we can't know how
    // they user arrived, so it is possible that exitLeft gets set and then the user clicks out of the table
    // and they won't be able to Shift+Tab around the site to re-enter the table from the right.
    if (this.isFocusedOnTable() && !this.isFocusedOnCell() && shift && this.state.selected.exitedLeft) {
      this.enterGrid({ idx, rowIdx });
      return;
    }
    // Scenario 3: we're on the div surrounding the grid and we want to enter the grid
    if (!this.isFocusedOnCell()) {
      // Scenario 3A: idx has been set to -1 (eg can happen when clicking into the filter box)
      // we want to go to the first cell in the row if we press Tab
      // we want to go to the last cell in the row if we press Shift+Tab
      if (idx === -1) {
        this.moveSelectedCell(e, rowIdx === -1 ? 1 : 0, shift ? this.getNbrColumns() : 1);
        return;
      }
      // otherwise, there is a selected cell in the table already, and
      // we want to trigger it to focus - setting selected in state will update
      // the cell props, and checkFocus will be called
      this.enterGrid({ idx, rowIdx, changeSomething: true });
      // make sure the browser doesn't handle it
      e.preventDefault();
      return;
    }
    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
  };

  // onPressEscape = (e) => {
  //   this.setInactive(e.key);
  //   this.handleCancelCopy();
  // };

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
      let cellKey = this.getColumn(e.idx).key;
      this.onGridRowsUpdated(cellKey, e.rowIdx, this.props.rowsCount - 1, {[cellKey]: e.rowData[cellKey]}, AppConstants.UpdateActions.COLUMN_FILL);
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

  onGridRowsUpdated = (cellKey, fromRow, toRow, updated, action, originRow) => {
    const { rowGetter, rowKey, onGridRowsUpdated } = this.props;
    if (!isFunction(onGridRowsUpdated)) {
      return;
    }

    const rowIds = [];
    for (let i = fromRow; i <= toRow; i++) {
      rowIds.push(rowGetter(i)[rowKey]);
    }

    const fromRowData = rowGetter(action === AppConstants.UpdateActions.COPY_PASTE ? originRow : fromRow);
    const fromRowId = fromRowData[rowKey];
    const toRowId = rowGetter(toRow)[rowKey];
    onGridRowsUpdated({ cellKey, fromRow, toRow, fromRowId, toRowId, rowIds, updated, action, fromRowData });
  };

  onCommit = (commit) => {
    const targetRow = commit.rowIdx;
    this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, AppConstants.UpdateActions.CELL_UPDATE);
  };

  onDragStart = (e) => {
    let idx = this.state.selected.idx;
    // To prevent dragging down/up when reordering rows.
    const isViewportDragging = e && e.target && e.target.className;
    if (idx > -1 && isViewportDragging) {
      let value = this.getSelectedValue();
      this.handleDragStart({idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: value});
      // need to set dummy data for FF
      if (e && e.dataTransfer) {
        if (e.dataTransfer.setData) {
          e.dataTransfer.dropEffect = 'move';
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', '');
        }
      }
    }
  };

  isCellWithinBounds = ({idx, rowIdx}) => {
    return idx >= 0
      && rowIdx >= 0
      && idx < ColumnUtils.getSize(this.state.columnMetrics.columns)
      && rowIdx < this.props.rowsCount;
  };

  handleDragStart = (dragged) => {
    if (!this.dragEnabled()) { return; }
    if (this.isCellWithinBounds(dragged)) {
      this.setState({ dragged: dragged });
    }
  };

  handleDragEnd = () => {
    if (!this.dragEnabled()) { return; }
    const { selected, dragged } = this.state;
    const column = this.getColumn(this.state.selected.idx);
    if (selected && dragged && column) {
      let cellKey = column.key;
      let fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
      let toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
      if (this.props.onCellsDragged) {
        this.props.onCellsDragged({cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value});
      }
      if (this.props.onGridRowsUpdated) {
        this.onGridRowsUpdated(cellKey, fromRow, toRow, {[cellKey]: dragged.value}, AppConstants.UpdateActions.CELL_DRAG);
      }
    }
    this.setState({dragged: {complete: true}});
  };

  handleDragEnter = (row) => {
    if (!this.dragEnabled() || this.state.dragged == null) { return; }
    let dragged = this.state.dragged;
    dragged.overRowIdx = row;
    this.setState({dragged: dragged});
  };

  handleTerminateDrag = () => {
    if (!this.dragEnabled()) { return; }
    this.setState({ dragged: null });
  };

  // handlePaste = () => {
  //   if (!this.copyPasteEnabled() || !(this.state.copied)) { return; }
  //   // let selected = this.state.selected;
  //   const selected = this.store.getState().selectedPosition;
  //   // let cellKey = this.getColumn(this.state.selected.idx).key;
  //   let cellKey = this.getColumn(this.store.getState().selectedPosition.idx).key;
  //   let textToCopy = this.state.textToCopy;
  //   let fromRow = this.state.copied.rowIdx;
  //   let toRow = selected.rowIdx;

  //   if (this.props.onCellCopyPaste) {
  //     this.props.onCellCopyPaste({cellKey: cellKey, rowIdx: toRow, value: textToCopy, fromRow: fromRow, toRow: toRow});
  //   }

  //   if (this.props.onGridRowsUpdated) {
  //     this.onGridRowsUpdated(cellKey, toRow, toRow, {[cellKey]: textToCopy}, AppConstants.UpdateActions.COPY_PASTE, fromRow);
  //   }
  // };

  // handleCancelCopy = () => {
  //   this.setState({copied: null});
  // };

  // handleCopy = (args) => {
  //   if (!this.copyPasteEnabled()) { return; }
  //   let textToCopy = args.value;
  //   let selected = this.state.selected;
  //   let copied = {idx: selected.idx, rowIdx: selected.rowIdx};
  //   this.setState({textToCopy: textToCopy, copied: copied});
  // };

  handleSort = (columnKey, direction) => {
    this.setState({sortDirection: direction, sortColumn: columnKey}, () => {
      this.props.onGridSort(columnKey, direction);
    });
  };

  getSelectedRow = (rows, key) => {
    let selectedRow = rows.filter(r => {
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
      let {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;
      let isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, this.props.rowGetter(rowIdx), rowIdx);

      if (isPreviouslySelected) return false;

      let handled = false;

      if (rowIdx > this.state.lastRowIdxUiSelected) {
        let rowsSelected = [];

        for (let i = this.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
          rowsSelected.push({rowIdx: i, row: this.props.rowGetter(i)});
        }

        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
          this.props.rowSelection.onRowsSelected(rowsSelected);
        }

        handled = true;
      } else if (rowIdx < this.state.lastRowIdxUiSelected) {
        let rowsSelected = [];

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

    let {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;
    let isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

    this.setState({lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: {rowIdx: rowIdx, idx: 0}});

    if (isPreviouslySelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
      this.props.rowSelection.onRowsDeselected([{rowIdx, row: rowData}]);
    } else if (!isPreviouslySelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
      this.props.rowSelection.onRowsSelected([{rowIdx, row: rowData}]);
    }
  };

  // columnKey not used here as this function will select the whole row,
  // but needed to match the function signature in the CheckboxEditor
  handleRowSelect = (rowIdx, columnKe, rowData, e) => {
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
      let selectedRows = this.props.enableRowSelect === 'single' ? [] : this.state.selectedRows.slice(0);
      let selectedRow = this.getSelectedRow(selectedRows, rowData[this.props.rowKey]);
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
      let {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;

      if (allRowsSelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
        let selectedRows = [];
        for (let i = 0; i < this.props.rowsCount; i++) {
          let rowData = this.props.rowGetter(i);
          if (!RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
            selectedRows.push({rowIdx: i, row: rowData});
          }
        }

        if (selectedRows.length > 0) {
          this.props.rowSelection.onRowsSelected(selectedRows);
        }
      } else if (!allRowsSelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
        let deselectedRows = [];
        for (let i = 0; i < this.props.rowsCount; i++) {
          let rowData = this.props.rowGetter(i);
          if (RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
            deselectedRows.push({rowIdx: i, row: rowData});
          }
        }

        if (deselectedRows.length > 0) {
          this.props.rowSelection.onRowsDeselected(deselectedRows);
        }
      }
    } else {
      let selectedRows = [];
      for (let i = 0; i < this.props.rowsCount; i++) {
        let row = Object.assign({}, this.props.rowGetter(i), {isSelected: allRowsSelected});
        selectedRows.push(row);
      }
      this.setState({selectedRows: selectedRows});
      if (typeof this.props.onRowSelect === 'function') {
        this.props.onRowSelect(selectedRows.filter(r => r.isSelected === true));
      }
    }
  };

  getScrollOffSet = () => {
    let scrollOffset = 0;
    if (this.grid) {
      let canvas = this.grid.querySelector('.react-grid-Canvas');
      if (canvas) {
        scrollOffset = canvas.offsetWidth - canvas.clientWidth;
      }
    }
    this.setState({scrollOffset: scrollOffset});
  };

  getRowOffsetHeight = () => {
    let offsetHeight = 0;
    this.getHeaderRows().forEach((row) => offsetHeight += parseFloat(row.height, 10) );
    return offsetHeight;
  };

  getHeaderRows = () => {
    let rows = [{ ref: (node) => this.row = node, height: this.props.headerRowHeight || this.props.rowHeight, rowType: 'header' }];
    if (this.state.canFilter === true) {
      rows.push({
        ref: (node) => this.filterRow = node,
        filterable: true,
        onFilterChange: this.props.onAddFilter,
        height: this.props.headerFiltersHeight,
        rowType: 'filter'
      });
    }
    return rows;
  };

  getInitialSelectedRows = () => {
    let selectedRows = [];
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

  getSelectedValue = () => {
    let rowIdx = this.state.selected.rowIdx;
    let idx = this.state.selected.idx;
    let cellKey = this.getColumn(idx).key;
    let row = this.props.rowGetter(rowIdx);
    return RowUtils.get(row, cellKey);
  };

  canExitGrid = (e) => {
    // When the cellNavigationMode is 'none', you can exit the grid if you're at the start or end of the row
    // When the cellNavigationMode is 'changeRow', you can exit the grid if you're at the first or last cell of the grid
    // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
    let atLastCellInRow = this.isAtLastCellInRow(this.getNbrColumns());
    let atFirstCellInRow = this.isAtFirstCellInRow();
    let atLastRow = this.isAtLastRow();
    let atFirstRow = this.isAtFirstRow();
    let shift = e.shiftKey === true;
    const { cellNavigationMode } = this.props;
    if (shift) {
      if (cellNavigationMode === 'none') {
        if (atFirstCellInRow) {
          return true;
        }
      } else if (cellNavigationMode === 'changeRow') {
        if (atFirstCellInRow && atFirstRow) {
          return true;
        }
      }
    } else {
      if (cellNavigationMode === 'none') {
        if (atLastCellInRow) {
          return true;
        }
      } else if (cellNavigationMode === 'changeRow') {
        if (atLastCellInRow && atLastRow) {
          return true;
        }
      }
    }
    return false;
  };

  moveSelectedCell = (e, rowDelta, cellDelta) => {
    // we need to prevent default as we control grid scroll
    // otherwise it moves every time you left/right which is janky
    e.preventDefault();
    let rowIdx;
    let idx;
    const { cellNavigationMode } = this.props;
    if (cellNavigationMode !== 'none') {
      ({idx, rowIdx} = this.calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta));
    } else {
      rowIdx = this.state.selected.rowIdx + rowDelta;
      idx = this.state.selected.idx + cellDelta;
    }
    this.scrollToColumn(idx);
    this.onSelect({ idx: idx, rowIdx: rowIdx });
  };

  getNbrColumns = () => {
    const {columns, enableRowSelect} = this.props;
    return enableRowSelect ? columns.length + 1 : columns.length;
  };

  getDataGridDOMNode = () => {
    return this.grid;
  };

  calculateNextSelectionPosition = (cellNavigationMode, cellDelta, rowDelta) => {
    let _rowDelta = rowDelta;
    let idx = this.state.selected.idx + cellDelta;
    const nbrColumns = this.getNbrColumns();
    if (cellDelta > 0) {
      if (this.isAtLastCellInRow(nbrColumns)) {
        if (cellNavigationMode === 'changeRow') {
          _rowDelta = this.isAtLastRow() ? rowDelta : rowDelta + 1;
          idx = this.isAtLastRow() ? idx : 0;
        } else {
          idx = 0;
        }
      }
    } else if (cellDelta < 0) {
      if (this.isAtFirstCellInRow()) {
        if (cellNavigationMode === 'changeRow') {
          _rowDelta = this.isAtFirstRow() ? rowDelta : rowDelta - 1;
          idx = this.isAtFirstRow() ? 0 : nbrColumns - 1;
        } else {
          idx = nbrColumns - 1;
        }
      }
    }
    let rowIdx = this.state.selected.rowIdx + _rowDelta;
    return {idx, rowIdx};
  };

  isAtLastCellInRow = (nbrColumns) => {
    return this.state.selected.idx === nbrColumns - 1;
  };

  isAtLastRow = () => {
    return this.state.selected.rowIdx === this.props.rowsCount - 1;
  };

  isAtFirstCellInRow = () => {
    return this.state.selected.idx === 0;
  };

  isAtFirstRow = () => {
    return this.state.selected.rowIdx === 0;
  };

  openCellEditor = (rowIdx, idx) => {
    const { rowGetter, setCellActive } = this.props;
    const row = rowGetter(rowIdx);
    const col = this.getColumn(idx);

    if (!ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
      return;
    }

    // TODO
    // setCellActive(idx, rowIdx);
  };

  scrollToColumn = (colIdx) => {
    if (this.grid) {
      let canvas = this.grid.querySelector('.react-grid-Canvas');
      if (canvas) {
        let left = 0;
        let locked = 0;

        for (let i = 0; i < colIdx; i++) {
          let column = this.getColumn(i);
          if (column) {
            if (column.width) {
              left += column.width;
            }
            if (column.locked) {
              locked += column.width;
            }
          }
        }

        let selectedColumn = this.getColumn(colIdx);
        if (selectedColumn) {
          let scrollLeft = left - locked - canvas.scrollLeft;
          let scrollRight =  left + selectedColumn.width - canvas.scrollLeft;

          if (scrollLeft < 0) {
            canvas.scrollLeft += scrollLeft;
          } else if (scrollRight > canvas.clientWidth) {
            let scrollAmount =  scrollRight - canvas.clientWidth;
            canvas.scrollLeft += scrollAmount;
          }
        }
      }
    }
  };

  // deselect = () => {
  //   const selected = {rowIdx: -1, idx: -1};
  //   this.setState({selected});
  // };

  setActive = (keyPressed) => {
    let rowIdx = this.state.selected.rowIdx;
    let row = this.props.rowGetter(rowIdx);

    let idx = this.state.selected.idx;
    let column = this.getColumn(idx);

    if (ColumnUtils.canEdit(column, row, this.props.enableCellSelect) && !this.isActive()) {
      let selected = Object.assign({}, this.state.selected, {idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed});
      let showEditor = true;
      if (typeof this.props.onCheckCellIsEditable === 'function') {
        let args = Object.assign({}, { row, column }, selected);
        showEditor = this.props.onCheckCellIsEditable(args);
      }
      if (showEditor !== false) {
        if (column.locked) {
          this.setState({selected});
        } else {
          this.setState({selected}, () => { this.scrollToColumn(idx); });
        }
        this.props.onBeforeEdit();
        this.handleCancelCopy();
      }
    }
  };

  setInactive = () => {
    let rowIdx = this.state.selected.rowIdx;
    let row = this.props.rowGetter(rowIdx);

    let idx = this.state.selected.idx;
    let col = this.getColumn(idx);

    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && this.isActive()) {
      let selected = Object.assign({}, this.state.selected, {idx: idx, rowIdx: rowIdx, active: false});
      this.setState({selected: selected});
    }
  };

  isActive = () => {
    return this.state.selected.active === true;
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
      let headerRenderer = props.enableRowSelect === 'single' ? null : SelectAllRenderer;
      let Formatter = this.props.rowActionsCell ? this.props.rowActionsCell : CheckboxEditor;
      let selectColumn = {
        key: 'select-row',
        name: '',
        formatter: <Formatter rowSelection={this.props.rowSelection}/>,
        onCellChange: this.handleRowSelect,
        filterable: false,
        headerRenderer: headerRenderer,
        width: 60,
        locked: true,
        getRowMetaData: (rowData) => rowData,
        cellClass: this.props.rowActionsCell ? 'rdg-row-actions-cell' : ''
      };
      unshiftedCols = cols.unshift(selectColumn);
      cols = unshiftedCols > 0 ? cols : unshiftedCols;
    }
    this._cachedComputedColumns = cols;

    return this._cachedComputedColumns;
  };

  // copyPasteEnabled = () => {
  //   return this.props.onCellCopyPaste !== null;
  // };

  dragEnabled = () => {
    return this.props.onGridRowsUpdated !== undefined || this.props.onCellsDragged !== undefined;
  };

  renderToolbar = () => {
    let Toolbar = this.props.toolbar;
    let toolBarProps =  {columns: this.props.columns, onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount};
    if (React.isValidElement(Toolbar)) {
      return ( React.cloneElement(Toolbar, toolBarProps));
    } else if (isFunction(Toolbar)) {
      return <Toolbar {...toolBarProps}/>;
    }
  };

  render() {
    let cellMetaData = {
      rowKey: this.props.rowKey,
      dragged: this.state.dragged,
      hoveredRowIdx: this.state.hoveredRowIdx,
      onCellClick: this.onCellClick,
      onCellContextMenu: this.onCellContextMenu,
      onCellDoubleClick: this.onCellDoubleClick,
      onCommit: this.onCommit,
      onCommitCancel: this.setInactive,
      copied: this.state.copied,
      handleDragEnterRow: this.handleDragEnter,
      handleTerminateDrag: this.handleTerminateDrag,
      enableCellSelect: this.props.enableCellSelect,
      onColumnEvent: this.onColumnEvent,
      openCellEditor: this.openCellEditor,
      onDragHandleDoubleClick: this.onDragHandleDoubleClick,
      onCellExpand: this.onCellExpand,
      onRowExpandToggle: this.onRowExpandToggle,
      onRowHover: this.onRowHover,
      getDataGridDOMNode: this.getDataGridDOMNode,
      getCellActions: this.props.getCellActions,
      onDeleteSubRow: this.props.onDeleteSubRow,
      onAddSubRow: this.props.onAddSubRow,
      isScrollingVerticallyWithKeyboard: this.isKeyDown(KeyCodes.DownArrow) || this.isKeyDown(KeyCodes.UpArrow),
      isScrollingHorizontallyWithKeyboard: this.isKeyDown(KeyCodes.LeftArrow) || this.isKeyDown(KeyCodes.RightArrow) || this.isKeyDown(KeyCodes.Tab),
      enableCellAutoFocus: this.props.enableCellAutoFocus
    };

    let toolbar = this.renderToolbar();
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
        ref={(node) => { this.grid = node; }}>
        {toolbar}
        <div className="react-grid-Main">
          <BaseGrid
            ref={(node) => this.base = node}
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
            onViewportDragStart={this.onDragStart}
            onViewportDragEnd={this.handleDragEnd}
            // onViewportClick={this.deselect}
            // onViewportDoubleClick={this.deselect}
            onColumnResize={this.onColumnResize}
            rowScrollTimeout={this.props.rowScrollTimeout}
            scrollToRowIndex={this.props.scrollToRowIndex}
            contextMenu={this.props.contextMenu}
            overScan={this.props.overScan}
            enableCellSelect={this.props.enableCellSelect}
            onCheckCellIsEditable={this.props.onCheckCellIsEditable}
            onCellCopyPaste={this.props.onCellCopyPaste}
            onGridRowsUpdated={this.onGridRowsUpdated}
            cellNavigationMode={this.props.cellNavigationMode}
          />
        </div>
      </div>
    );
  }
}

module.exports = ReactDataGrid;
