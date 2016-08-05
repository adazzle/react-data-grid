const React                 = require('react');
const ReactDOM = require('react-dom');
const BaseGrid              = require('./Grid');
const Row                   = require('./Row');
const ExcelColumn           = require('./PropTypeShapes/ExcelColumn');
const KeyboardHandlerMixin  = require('./KeyboardHandlerMixin');
const CheckboxEditor        = require('./addons/editors/CheckboxEditor');
const DOMMetrics           = require('./DOMMetrics');
const ColumnMetricsMixin      = require('./ColumnMetricsMixin');
const RowUtils = require('./RowUtils');
const ColumnUtils = require('./ColumnUtils');
const KeyCodes = require('./KeyCodes');
import AppConstants from './AppConstants';

if (!Object.assign) {
  Object.assign = require('object-assign');
}

type SelectedType = {
  rowIdx: number;
  idx: number;
};

type ColumnEvent = {
  name: string,
  rowIdx: number;
  idx: number;
}

type DraggedType = {
  idx: number;
  rowIdx: number;
  value: string;
};

type RowUpdateEvent = {
  keyCode: string;
  changed: {expandedHeight: number};
  rowIdx: number;
};

const ReactDataGrid = React.createClass({

  mixins: [
    ColumnMetricsMixin,
    DOMMetrics.MetricsComputatorMixin,
    KeyboardHandlerMixin
  ],

  propTypes: {
    rowHeight: React.PropTypes.number.isRequired,
    headerRowHeight: React.PropTypes.number,
    minHeight: React.PropTypes.number.isRequired,
    minWidth: React.PropTypes.number,
    enableRowSelect: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
    onRowUpdated: React.PropTypes.func,
    rowGetter: React.PropTypes.func.isRequired,
    rowsCount: React.PropTypes.number.isRequired,
    toolbar: React.PropTypes.element,
    enableCellSelect: React.PropTypes.bool,
    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
    onFilter: React.PropTypes.func,
    onCellCopyPaste: React.PropTypes.func,
    onCellsDragged: React.PropTypes.func,
    onAddFilter: React.PropTypes.func,
    onGridSort: React.PropTypes.func,
    onDragHandleDoubleClick: React.PropTypes.func,
    onGridRowsUpdated: React.PropTypes.func,
    onRowSelect: React.PropTypes.func,
    rowKey: React.PropTypes.string,
    rowScrollTimeout: React.PropTypes.number,
    onClearFilters: React.PropTypes.func,
    contextMenu: React.PropTypes.element,
    cellNavigationMode: React.PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
    onCellSelected: React.PropTypes.func,
    onCellDeSelected: React.PropTypes.func,
    onCellExpand: React.PropTypes.func,
    enableDragAndDrop: React.PropTypes.bool,
    onRowExpandToggle: React.PropTypes.func,
    draggableHeaderCell: React.PropTypes.func,
    getValidFilterValues: React.PropTypes.func,
    rowSelection: React.PropTypes.shape({
      enableShiftSelect: React.PropTypes.bool,
      onRowsSelected: React.PropTypes.func,
      onRowsDeselected: React.PropTypes.func,
      showCheckbox: React.PropTypes.bool,
      selectBy: React.PropTypes.oneOfType([
        React.PropTypes.shape({
          indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
        }),
        React.PropTypes.shape({
          isSelectedKey: React.PropTypes.string.isRequired
        }),
        React.PropTypes.shape({
          keys: React.PropTypes.shape({
            values: React.PropTypes.array.isRequired,
            rowKey: React.PropTypes.string.isRequired
          }).isRequired
        })
      ]).isRequired
    }),
    onRowClick: React.PropTypes.func,
    onGridKeyUp: React.PropTypes.func,
    onGridKeyDown: React.PropTypes.func,
    rowGroupRenderer: React.PropTypes.func
  },

  getDefaultProps(): {enableCellSelect: boolean} {
    return {
      enableCellSelect: false,
      tabIndex: -1,
      rowHeight: 35,
      enableRowSelect: false,
      minHeight: 350,
      rowKey: 'id',
      rowScrollTimeout: 0,
      cellNavigationMode: 'none'
    };
  },

  getInitialState: function(): {selected: SelectedType; copied: ?{idx: number; rowIdx: number}; selectedRows: Array<Row>; expandedRows: Array<Row>; canFilter: boolean; columnFilters: any; sortDirection: ?SortType; sortColumn: ?ExcelColumn; dragged: ?DraggedType;  } {
    let columnMetrics = this.createColumnMetrics();
    let initialState = {columnMetrics, selectedRows: [], copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0, lastRowIdxUiSelected: -1};
    if (this.props.enableCellSelect) {
      initialState.selected = {rowIdx: 0, idx: 0};
    } else {
      initialState.selected = {rowIdx: -1, idx: -1};
    }
    return initialState;
  },

  hasSelectedCellChanged: function(selected: SelectedType) {
    let previouslySelected = Object.assign({}, this.state.selected);
    return previouslySelected.rowIdx !== selected.rowIdx || previouslySelected.idx !== selected.idx || previouslySelected.active === false;
  },

  onContextMenuHide: function() {
    document.removeEventListener('click', this.onContextMenuHide);
    let newSelected = Object.assign({}, this.state.selected, {contextMenuDisplayed: false});
    this.setState({selected: newSelected});
  },

  onColumnEvent: function(ev :SyntheticEvent, columnEvent: ColumnEvent) {
    let {idx, name} = columnEvent;

    if (name && typeof idx !== 'undefined') {
      let column = this.getColumn(idx);

      if (column && column.events && column.events[name] && typeof column.events[name] === 'function') {
        let eventArgs = {
          rowIdx: columnEvent.rowIdx,
          idx,
          column
        };

        column.events[name](ev, eventArgs);
      }
    }
  },

  onSelect: function(selected: SelectedType) {
    if (this.state.selected.rowIdx !== selected.rowIdx
      || this.state.selected.idx !== selected.idx
      || this.state.selected.active === false) {
      let idx = selected.idx;
      let rowIdx = selected.rowIdx;
      if (
          idx >= 0
          && rowIdx >= 0
          && idx < ColumnUtils.getSize(this.state.columnMetrics.columns)
          && rowIdx < this.props.rowsCount
        ) {
        const oldSelection = this.state.selected;
        this.setState({selected: selected}, () => {
          if (typeof this.props.onCellDeSelected === 'function') {
            this.props.onCellDeSelected(oldSelection);
          }
          if (typeof this.props.onCellSelected === 'function') {
            this.props.onCellSelected(selected);
          }
        });
      }
    }
  },

  onCellClick: function(cell: SelectedType) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});

    if (this.props.onRowClick && typeof this.props.onRowClick === 'function') {
      this.props.onRowClick(cell.rowIdx, this.props.rowGetter(cell.rowIdx));
    }
  },

  onCellContextMenu: function(cell: SelectedType) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx, contextMenuDisplayed: this.props.contextMenu});
    if (this.props.contextMenu) {
      document.addEventListener('click', this.onContextMenuHide);
    }
  },

  onCellDoubleClick: function(cell: SelectedType) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
    this.setActive('Enter');
  },

  onViewportDoubleClick: function() {
    this.setActive();
  },

  onPressArrowUp(e: SyntheticEvent) {
    this.moveSelectedCell(e, -1, 0);
  },

  onPressArrowDown(e: SyntheticEvent) {
    this.moveSelectedCell(e, 1, 0);
  },

  onPressArrowLeft(e: SyntheticEvent) {
    this.moveSelectedCell(e, 0, -1);
  },

  onPressArrowRight(e: SyntheticEvent) {
    this.moveSelectedCell(e, 0, 1);
  },

  onPressTab(e: SyntheticEvent) {
    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
  },

  onPressEnter(e: SyntheticKeyboardEvent) {
    this.setActive(e.key);
  },

  onPressDelete(e: SyntheticKeyboardEvent) {
    this.setActive(e.key);
  },

  onPressEscape(e: SyntheticKeyboardEvent) {
    this.setInactive(e.key);
  },

  onPressBackspace(e: SyntheticKeyboardEvent) {
    this.setActive(e.key);
  },

  onPressChar(e: SyntheticKeyboardEvent) {
    if (this.isKeyPrintable(e.keyCode)) {
      this.setActive(e.keyCode);
    }
  },

  onPressKeyWithCtrl(e: SyntheticKeyboardEvent) {
    let keys = {
      KeyCode_c: 99,
      KeyCode_C: 67,
      KeyCode_V: 86,
      KeyCode_v: 118
    };

    let rowIdx = this.state.selected.rowIdx;
    let row = this.props.rowGetter(rowIdx);

    let idx = this.state.selected.idx;
    let col = this.getColumn(idx);

    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
      if (e.keyCode === keys.KeyCode_c || e.keyCode === keys.KeyCode_C) {
        let value = this.getSelectedValue();
        this.handleCopy({ value: value });
      } else if (e.keyCode === keys.KeyCode_v || e.keyCode === keys.KeyCode_V) {
        this.handlePaste();
      }
    }
  },

  onGridRowsUpdated(cellKey, fromRow, toRow, updated, action) {
    let rowIds = [];

    for (let i = fromRow; i <= toRow; i++) {
      rowIds.push(this.props.rowGetter(i)[this.props.rowKey]);
    }

    this.props.onGridRowsUpdated({cellKey, fromRow, toRow, rowIds, updated, action});
  },

  onCellCommit(commit: RowUpdateEvent) {
    let selected = Object.assign({}, this.state.selected);
    selected.active = false;
    if (commit.key === 'Tab') {
      selected.idx += 1;
    }
    let expandedRows = this.state.expandedRows;
    // if(commit.changed && commit.changed.expandedHeight){
    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
    // }
    this.setState({selected: selected, expandedRows: expandedRows});

    if (this.props.onRowUpdated) {
      this.props.onRowUpdated(commit);
    }

    let targetRow = commit.rowIdx;

    if (this.props.onGridRowsUpdated) {
      this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, AppConstants.UpdateActions.CELL_UPDATE);
    }
  },

  onDragStart(e: SyntheticEvent) {
    let value = this.getSelectedValue();
    this.handleDragStart({idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: value});
    // need to set dummy data for FF
    if (e && e.dataTransfer) {
      if (e.dataTransfer.setData) {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', 'dummy');
      }
    }
  },

  onToggleFilter() {
    // setState() does not immediately mutate this.state but creates a pending state transition.
    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
    this.setState({ canFilter: !this.state.canFilter }, () => {
      if (this.state.canFilter === false && this.props.onClearFilters) {
        this.props.onClearFilters();
      }
    });
  },

  onDragHandleDoubleClick(e) {
    if (this.props.onDragHandleDoubleClick) {
      this.props.onDragHandleDoubleClick(e);
    }

    if (this.props.onGridRowsUpdated) {
      let cellKey = this.getColumn(e.idx).key;
      this.onGridRowsUpdated(cellKey, e.rowIdx, this.props.rowsCount - 1, {[cellKey]: e.rowData[cellKey]}, AppConstants.UpdateActions.COLUMN_FILL);
    }
  },

  onCellExpand(args) {
    if (this.props.onCellExpand) {
      this.props.onCellExpand(args);
    }
  },

  onRowExpandToggle(args) {
    if (typeof this.props.onRowExpandToggle === 'function') {
      this.props.onRowExpandToggle(args);
    }
  },

  handleDragStart(dragged: DraggedType) {
    if (!this.dragEnabled()) { return; }
    let idx = dragged.idx;
    let rowIdx = dragged.rowIdx;
    if (
        idx >= 0
        && rowIdx >= 0
        && idx < this.getSize()
        && rowIdx < this.props.rowsCount
      ) {
      this.setState({ dragged: dragged });
    }
  },

  handleDragEnd() {
    if (!this.dragEnabled()) { return; }
    let fromRow;
    let toRow;
    let selected = this.state.selected;
    let dragged = this.state.dragged;
    let cellKey = this.getColumn(this.state.selected.idx).key;
    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
    toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
    if (this.props.onCellsDragged) {
      this.props.onCellsDragged({cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value});
    }

    if (this.props.onGridRowsUpdated) {
      this.onGridRowsUpdated(cellKey, fromRow, toRow, {[cellKey]: dragged.value}, AppConstants.UpdateActions.CELL_DRAG);
    }

    this.setState({dragged: {complete: true}});
  },

  handleDragEnter(row: any) {
    if (!this.dragEnabled()) { return; }
    let dragged = this.state.dragged;
    dragged.overRowIdx = row;
    this.setState({dragged: dragged});
  },

  handleTerminateDrag() {
    if (!this.dragEnabled()) { return; }
    this.setState({ dragged: null });
  },

  handlePaste() {
    if (!this.copyPasteEnabled()) { return; }
    let selected = this.state.selected;
    let cellKey = this.getColumn(this.state.selected.idx).key;
    let textToCopy = this.state.textToCopy;
    let toRow = selected.rowIdx;

    if (this.props.onCellCopyPaste) {
      this.props.onCellCopyPaste({cellKey: cellKey, rowIdx: toRow, value: textToCopy, fromRow: this.state.copied.rowIdx, toRow: toRow});
    }

    if (this.props.onGridRowsUpdated) {
      this.onGridRowsUpdated(cellKey, toRow, toRow, {[cellKey]: textToCopy}, AppConstants.UpdateActions.COPY_PASTE);
    }

    this.setState({copied: null});
  },

  handleCopy(args: {value: string}) {
    if (!this.copyPasteEnabled()) { return; }
    let textToCopy = args.value;
    let selected = this.state.selected;
    let copied = {idx: selected.idx, rowIdx: selected.rowIdx};
    this.setState({textToCopy: textToCopy, copied: copied});
  },

  handleSort: function(columnKey: string, direction: SortType) {
    this.setState({sortDirection: direction, sortColumn: columnKey}, function() {
      this.props.onGridSort(columnKey, direction);
    });
  },

  getSelectedRow(rows, key) {
    let selectedRow = rows.filter(r => {
      if (r[this.props.rowKey] === key) {
        return true;
      }
      return false;
    });
    if (selectedRow.length > 0) {
      return selectedRow[0];
    }
  },

  useNewRowSelection() {
    return this.props.rowSelection && this.props.rowSelection.selectBy;
  },
  // return false if not a shift select so can be handled as normal row selection
  handleShiftSelect(rowIdx) {
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
  },

  handleNewRowSelect(rowIdx, rowData) {
    let {keys, indexes, isSelectedKey} = this.props.rowSelection.selectBy;
    let isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

    this.setState({lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: {rowIdx: rowIdx, idx: 0}});

    if (isPreviouslySelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
      this.props.rowSelection.onRowsDeselected([{rowIdx, row: rowData}]);
    } else if (!isPreviouslySelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
      this.props.rowSelection.onRowsSelected([{rowIdx, row: rowData}]);
    }
  },
  // columnKey not used here as this function will select the whole row,
  // but needed to match the function signature in the CheckboxEditor
  handleRowSelect(rowIdx: number, columnKey: string, rowData, e: Event) {
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
  },

  handleCheckboxChange: function(e: SyntheticEvent) {
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
  },

  getScrollOffSet() {
    let scrollOffset = 0;
    let canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
    if (canvas) {
      scrollOffset = canvas.offsetWidth - canvas.clientWidth;
    }
    this.setState({scrollOffset: scrollOffset});
  },

  getRowOffsetHeight(): number {
    let offsetHeight = 0;
    this.getHeaderRows().forEach((row) => offsetHeight += parseFloat(row.height, 10) );
    return offsetHeight;
  },

  getHeaderRows(): Array<{ref: string; height: number;}> {
    let rows = [{ ref: 'row', height: this.props.headerRowHeight || this.props.rowHeight, rowType: 'header' }];
    if (this.state.canFilter === true) {
      rows.push({
        ref: 'filterRow',
        filterable: true,
        onFilterChange: this.props.onAddFilter,
        height: 45,
        rowType: 'filter'
      });
    }
    return rows;
  },
  getInitialSelectedRows: function() {
    let selectedRows = [];
    for (let i = 0; i < this.props.rowsCount; i++) {
      selectedRows.push(false);
    }
    return selectedRows;
  },
  getRowSelectionProps() {
    if (this.props.rowSelection) {
      return this.props.rowSelection.selectBy;
    }

    return null;
  },
  getSelectedRows() {
    if (this.props.rowSelection) {
      return null;
    }

    return this.state.selectedRows.filter(r => r.isSelected === true);
  },
  getSelectedValue(): string {
    let rowIdx = this.state.selected.rowIdx;
    let idx = this.state.selected.idx;
    let cellKey = this.getColumn(idx).key;
    let row = this.props.rowGetter(rowIdx);
    return RowUtils.get(row, cellKey);
  },

  moveSelectedCell(e: SyntheticEvent, rowDelta: number, cellDelta: number) {
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
    this.onSelect({ idx: idx, rowIdx: rowIdx });
  },

  getNbrColumns() {
    const {columns, enableRowSelect} = this.props;
    return enableRowSelect ? columns.length + 1 : columns.length;
  },

  calculateNextSelectionPosition(cellNavigationMode: string, cellDelta: number, rowDelta: number) {
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
  },

  isAtLastCellInRow(nbrColumns) {
    return this.state.selected.idx === nbrColumns - 1;
  },

  isAtLastRow() {
    return this.state.selected.rowIdx === this.props.rowsCount - 1;
  },

  isAtFirstCellInRow() {
    return this.state.selected.idx === 0;
  },

  isAtFirstRow() {
    return this.state.selected.rowIdx === 0;
  },

  openCellEditor(rowIdx, idx) {
    let row = this.props.rowGetter(rowIdx);
    let col = this.getColumn(idx);

    if (!ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
      return;
    }

    let selected = {rowIdx, idx};
    if (this.hasSelectedCellChanged(selected)) {
      this.setState({selected}, () => {
        this.setActive('Enter');
      });
    } else {
      this.setActive('Enter');
    }
  },

  scrollToColumn(colIdx) {
    let canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
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
  },

  setActive(keyPressed: string) {
    let rowIdx = this.state.selected.rowIdx;
    let row = this.props.rowGetter(rowIdx);

    let idx = this.state.selected.idx;
    let col = this.getColumn(idx);

    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && !this.isActive()) {
      let selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed});
      this.setState({selected: selected}, this.scrollToColumn(idx));
    }
  },

  setInactive() {
    let rowIdx = this.state.selected.rowIdx;
    let row = this.props.rowGetter(rowIdx);

    let idx = this.state.selected.idx;
    let col = this.getColumn(idx);

    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && this.isActive()) {
      let selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active: false});
      this.setState({selected: selected});
    }
  },

  isActive(): boolean {
    return this.state.selected.active === true;
  },

  setupGridColumns: function(props = this.props): Array<any> {
    let cols = props.columns.slice(0);
    let unshiftedCols = {};
    if ((props.enableRowSelect && !this.props.rowSelection) || (props.rowSelection && props.rowSelection.showCheckbox !== false)) {
      let headerRenderer = props.enableRowSelect === 'single' ? null :
      <div className="react-grid-checkbox-container">
        <input className="react-grid-checkbox" type="checkbox" name="select-all-checkbox" id="select-all-checkbox" onChange={this.handleCheckboxChange} />
        <label htmlFor="select-all-checkbox" className="react-grid-checkbox-label"></label>
      </div>;
      let selectColumn = {
        key: 'select-row',
        name: '',
        formatter: <CheckboxEditor/>,
        onCellChange: this.handleRowSelect,
        filterable: false,
        headerRenderer: headerRenderer,
        width: 60,
        locked: true,
        getRowMetaData: (rowData) => rowData
      };
      unshiftedCols = cols.unshift(selectColumn);
      cols = unshiftedCols > 0 ? cols : unshiftedCols;
    }
    return cols;
  },


  copyPasteEnabled: function(): boolean {
    return this.props.onCellCopyPaste !== null;
  },

  dragEnabled: function(): boolean {
    return this.props.onCellsDragged !== null;
  },

  renderToolbar(): ReactElement {
    let Toolbar = this.props.toolbar;
    if (React.isValidElement(Toolbar)) {
      return ( React.cloneElement(Toolbar, {columns: this.props.columns, onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount}));
    }
  },

  render() {
    let cellMetaData = {
      selected: this.state.selected,
      dragged: this.state.dragged,
      onCellClick: this.onCellClick,
      onCellContextMenu: this.onCellContextMenu,
      onCellDoubleClick: this.onCellDoubleClick,
      onCommit: this.onCellCommit,
      onCommitCancel: this.setInactive,
      copied: this.state.copied,
      handleDragEnterRow: this.handleDragEnter,
      handleTerminateDrag: this.handleTerminateDrag,
      enableCellSelect: this.props.enableCellSelect,
      onColumnEvent: this.onColumnEvent,
      openCellEditor: this.openCellEditor,
      onDragHandleDoubleClick: this.onDragHandleDoubleClick,
      onCellExpand: this.onCellExpand,
      onRowExpandToggle: this.onRowExpandToggle
    };

    let toolbar = this.renderToolbar();
    let containerWidth = this.props.minWidth || this.DOMMetrics.gridWidth();
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
      <div className="react-grid-Container" style={{width: containerWidth}}>
        {toolbar}
        <div className="react-grid-Main">
          <BaseGrid
            ref="base"
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
            onViewportDoubleClick={this.onViewportDoubleClick}
            onColumnResize={this.onColumnResize}
            rowScrollTimeout={this.props.rowScrollTimeout}
            contextMenu={this.props.contextMenu} />
          </div>
        </div>
      );
  }
});


module.exports = ReactDataGrid;
