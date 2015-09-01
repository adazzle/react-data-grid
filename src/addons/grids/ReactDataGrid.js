/* @flow */
/**
 * @jsx React.DOM

 */
"use strict";

var React                 = require('react');
var PropTypes             = React.PropTypes;
var BaseGrid              = require('../../Grid');
var Row                   = require('../../Row');
var ExcelColumn           = require('./ExcelColumn');
var KeyboardHandlerMixin  = require('../../KeyboardHandlerMixin');
var CheckboxEditor        = require('../editors/CheckboxEditor');
var FilterableHeaderCell  = require('../cells/headerCells/FilterableHeaderCell');
var cloneWithProps        = require('react/lib/cloneWithProps');
var DOMMetrics           = require('../../DOMMetrics');
var ColumnMetricsMixin      = require('../../ColumnMetricsMixin');
var RowUtils = require('../../RowUtils');
var ColumnUtils = require('../../ColumnUtils');

if(!Object.assign){
  Object.assign = require('object-assign');
}
type SelectedType = {
  rowIdx: number;
  idx: number;
};

type DraggedType = {
  idx: number;
  rowIdx: number;
  value: string;
};

type ReactDataGridProps = {
  rowHeight: number;
  minHeight: number;
  enableRowSelect: ?boolean;
  onRowUpdated: ?() => void;
  columns: Array<ExcelColumn>;
  rowGetter: () => Array<any>;
  rowsCount: number;
  toolbar: ?any;
  enableCellSelect: ?boolean;
  onCellCopyPaste: ?() => any;
  onCellsDragged: ?() => any;
  onFilter: ?() => any;
};



type RowUpdateEvent = {
  keyCode: string;
  changed: {expandedHeight: number};
  rowIdx: number;
};


var ReactDataGrid = React.createClass({

  propTypes: {
    rowHeight: React.PropTypes.number.isRequired,
    minHeight: React.PropTypes.number.isRequired,
    enableRowSelect: React.PropTypes.bool,
    onRowUpdated:React.PropTypes.func,
    rowGetter: React.PropTypes.func.isRequired,
    rowsCount : React.PropTypes.number.isRequired,
    toolbar:React.PropTypes.element,
    enableCellSelect : React.PropTypes.bool,
    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
    onFilter : React.PropTypes.func,
    onCellCopyPaste : React.PropTypes.func,
    onCellsDragged : React.PropTypes.func,
    onAddFilter : React.PropTypes.func
  },

  mixins: [
    ColumnMetricsMixin,
    DOMMetrics.MetricsComputatorMixin,
    KeyboardHandlerMixin
  ],


  getDefaultProps(): {enableCellSelect: boolean} {
    return {
      enableCellSelect : false,
      tabIndex : -1,
      rowHeight: 35,
      enableRowSelect : false,
      minHeight : 350
    };
  },

  getInitialState: function(): {selected: SelectedType; copied: ?{idx: number; rowIdx: number}; selectedRows: Array<Row>; expandedRows: Array<Row>; canFilter: boolean; columnFilters: any; sortDirection: ?SortType; sortColumn: ?ExcelColumn; dragged: ?DraggedType;  } {
    var columnMetrics = this.createColumnMetrics(true);
    var initialState = {columnMetrics, selectedRows : this.getInitialSelectedRows(), copied : null, expandedRows : [], canFilter : false, columnFilters : {}, sortDirection: null, sortColumn: null, dragged : null, scrollOffset: 0}
    if(this.props.enableCellSelect){
      initialState.selected = {rowIdx: 0, idx: 0};
    }else{
      initialState.selected = {rowIdx: -1, idx: -1};
    }
    return initialState;
  },

  getInitialSelectedRows: function(){
    var selectedRows = [];
    for(var i = 0; i < this.props.rowsCount; i++){
      selectedRows.push(false);
    }
    return selectedRows;
  },

  componentWillReceiveProps:function(nextProps: ReactDataGridProps){
    if(nextProps.rowsCount  === this.props.rowsCount + 1){
      this.onAfterAddRow(nextProps.rowsCount + 1);
    }
  },

  componentDidMount() {
    var scrollOffset = 0;
    var canvas = this.getDOMNode().querySelector('.react-grid-Canvas');
    if(canvas != null){
        scrollOffset = canvas.offsetWidth - canvas.clientWidth;
    }
    this.setState({scrollOffset: scrollOffset});
  },

  render: function(): ?ReactElement {
    var cellMetaData = {
      selected : this.state.selected,
      dragged : this.state.dragged,
      onCellClick : this.onCellClick,
      onCellDoubleClick : this.onCellDoubleClick,
      onCommit : this.onCellCommit,
      onCommitCancel : this.setInactive,
      copied : this.state.copied,
      handleDragEnterRow : this.handleDragEnter,
      handleTerminateDrag : this.handleTerminateDrag
    }



    var toolbar = this.renderToolbar();
    var gridWidth = this.DOMMetrics.gridWidth();
    var containerWidth = gridWidth  + this.state.scrollOffset;

    return(
      <div className="react-grid-Container" style={{width:containerWidth}}>
      {toolbar}
        <div className="react-grid-Main">
          <BaseGrid
            ref="base"
            {...this.props}
            headerRows={this.getHeaderRows()}
            columnMetrics={this.state.columnMetrics}
            rowGetter={this.props.rowGetter}
            rowsCount={this.props.rowsCount}
            rowHeight={this.props.rowHeight}
            cellMetaData={cellMetaData}
            selectedRows={this.state.selectedRows}
            expandedRows={this.state.expandedRows}
            rowOffsetHeight={this.getRowOffsetHeight()}
            sortColumn={this.state.sortColumn}
            sortDirection={this.state.sortDirection}
            onSort={this.handleSort}
            minHeight={this.props.minHeight}
            totalWidth={gridWidth}
            onViewportKeydown={this.onKeyDown}
            onViewportDragStart={this.onDragStart}
            onViewportDragEnd={this.handleDragEnd}
            onViewportDoubleClick={this.onViewportDoubleClick}
            onColumnResize={this.onColumnResize}/>
          </div>
        </div>
      )
  },

  renderToolbar(): ReactElement {
    var Toolbar = this.props.toolbar;
    if(React.isValidElement(Toolbar)){
      return( cloneWithProps(Toolbar, {onToggleFilter : this.onToggleFilter, numberOfRows : this.props.rowsCount}));
    }

  },

  onSelect: function(selected: SelectedType) {
    if(this.props.enableCellSelect){
      if (this.state.selected.rowIdx === selected.rowIdx
       && this.state.selected.idx === selected.idx
       && this.state.selected.active === true) {
       } else {
        var idx = selected.idx;
        var rowIdx = selected.rowIdx;
        if (
          idx >= 0
          && rowIdx >= 0
          && idx < ColumnUtils.getSize(this.state.columnMetrics.columns)
          && rowIdx < this.props.rowsCount
        ) {
          this.setState({selected: selected});
        }
      }
    }
  },

  onCellClick: function(cell: SelectedType) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
  },

  onCellDoubleClick: function(cell: SelectedType) {
    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
    this.setActive('Enter');
  },

  onViewportDoubleClick: function(e: Event) {
    this.setActive();
  },

  onPressArrowUp(e: SyntheticEvent){
    this.moveSelectedCell(e, -1, 0);
  },

  onPressArrowDown(e: SyntheticEvent){
    this.moveSelectedCell(e, 1, 0);
  },

  onPressArrowLeft(e: SyntheticEvent){
    this.moveSelectedCell(e, 0, -1);
  },

  onPressArrowRight(e: SyntheticEvent){
    this.moveSelectedCell(e, 0, 1);
  },

  onPressTab(e: SyntheticEvent){
    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
  },

  onPressEnter(e: SyntheticKeyboardEvent){
    this.setActive(e.key);
  },

  onPressDelete(e: SyntheticKeyboardEvent){
    this.setActive(e.key);
  },

  onPressEscape(e: SyntheticKeyboardEvent){
    this.setInactive(e.key);
  },

  onPressBackspace(e: SyntheticKeyboardEvent){
    this.setActive(e.key);
  },

  onPressChar(e: SyntheticKeyboardEvent){
    if(this.isKeyPrintable(e.keyCode)){
      this.setActive(e.keyCode);
    }
  },

  onPressKeyWithCtrl(e: SyntheticKeyboardEvent){
    var keys = {
      KeyCode_c : 99,
      KeyCode_C : 67,
      KeyCode_V : 86,
      KeyCode_v : 118,
    }

    var idx = this.state.selected.idx
    if(this.canEdit(idx)){
      if(e.keyCode == keys.KeyCode_c || e.keyCode == keys.KeyCode_C){
        var value = this.getSelectedValue();
        this.handleCopy({value : value});
      }else if(e.keyCode == keys.KeyCode_v || e.keyCode == keys.KeyCode_V){
        this.handlePaste();
      }
    }
  },

  onDragStart(e: SyntheticEvent){
    var value = this.getSelectedValue();
    this.handleDragStart({idx: this.state.selected.idx, rowIdx : this.state.selected.rowIdx, value : value});
    //need to set dummy data for FF
    if(e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
  },

  moveSelectedCell(e: SyntheticEvent, rowDelta: number, cellDelta: number){
    // we need to prevent default as we control grid scroll
    //otherwise it moves every time you left/right which is janky
    e.preventDefault();
    var rowIdx = this.state.selected.rowIdx + rowDelta;
    var idx = this.state.selected.idx + cellDelta;
    this.onSelect({idx: idx, rowIdx: rowIdx});
  },

  getSelectedValue(): string{
    var rowIdx = this.state.selected.rowIdx;
    var idx = this.state.selected.idx;
    var cellKey = this.getColumn(this.props.columns, idx).key;
    var row = this.props.rowGetter(rowIdx);
    return RowUtils.get(row, cellKey);
  },

  setActive(keyPressed: string){
    var rowIdx = this.state.selected.rowIdx;
    var idx = this.state.selected.idx;
    if(this.canEdit(idx) && !this.isActive()){
      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
      this.setState({selected: selected});
    }
  },

  setInactive(){
    var rowIdx = this.state.selected.rowIdx;
    var idx =this.state.selected.idx;
    if(this.canEdit(idx) && this.isActive()){
      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : false});
      this.setState({selected: selected});
    }
  },

  canEdit(idx: number): boolean{
    var col = this.getColumn(this.props.columns, idx);
    return this.props.enableCellSelect === true && ((col.editor != null) || col.editable);
  },

  isActive(): boolean{
    return this.state.selected.active === true;
  },

  onCellCommit(commit: RowUpdateEvent){
    var selected = Object.assign({}, this.state.selected);
    selected.active = false;
    if (commit.key === 'Tab') {
      selected.idx += 1;
    }
    var expandedRows = this.state.expandedRows;
    // if(commit.changed && commit.changed.expandedHeight){
    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
    // }
    this.setState({selected : selected, expandedRows : expandedRows});
    this.props.onRowUpdated(commit);

  },

  setupGridColumns : function(): Array<any>{
    var cols = this.props.columns.slice(0);
    if(this.props.enableRowSelect){
      var selectColumn = {
          key: 'select-row',
          name: '',
          formatter : <CheckboxEditor/>,
          onCellChange : this.handleRowSelect,
          filterable : false,
          headerRenderer : <input type="checkbox" onChange={this.handleCheckboxChange} />,
          width : 60,
          locked: true
      };
      var unshiftedCols = cols.unshift(selectColumn);
      cols = unshiftedCols > 0 ? cols : unshiftedCols;
    }
    return cols;
  },

  handleCheckboxChange : function(e: SyntheticEvent){
    var allRowsSelected;
    if(e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true){
      allRowsSelected = true;
    }else{
      allRowsSelected = false;
    }
    var selectedRows = [];
    for(var i = 0; i < this.props.rowsCount; i++){
      selectedRows.push(allRowsSelected);
    }
    this.setState({selectedRows : selectedRows});
  },

// columnKey not used here as this function will select the whole row,
// but needed to match the function signature in the CheckboxEditor
  handleRowSelect(rowIdx: number, columnKey: string, e: Event){
    e.stopPropagation();
    if(this.state.selectedRows != null && this.state.selectedRows.length > 0){
      var selectedRows = this.state.selectedRows.slice();
      if(selectedRows[rowIdx] == null || selectedRows[rowIdx] == false){
        selectedRows[rowIdx] = true;
      }else{
        selectedRows[rowIdx] = false;
      }
      this.setState({selectedRows : selectedRows});
    }
  },

  //EXPAND ROW Functionality - removing for now till we decide on how best to implement
  // expandRow(row: Row, newHeight: number): Array<Row>{
  //   var expandedRows = this.state.expandedRows;
  //   if(expandedRows[row]){
  //     if(expandedRows[row]== null || expandedRows[row] < newHeight){
  //       expandedRows[row] = newHeight;
  //     }
  //   }else{
  //     expandedRows[row] = newHeight;
  //   }
  //   return expandedRows;
  // },
  //
  // handleShowMore(row: Row, newHeight: number) {
  //   var expandedRows = this.expandRow(row, newHeight);
  //   this.setState({expandedRows : expandedRows});
  // },
  //
  // handleShowLess(row: Row){
  //   var expandedRows = this.state.expandedRows;
  //   if(expandedRows[row]){
  //       expandedRows[row] = false;
  //   }
  //   this.setState({expandedRows : expandedRows});
  // },
  //
  // expandAllRows(){
  //
  // },
  //
  // collapseAllRows(){
  //
  // },

  onAfterAddRow:function(numberOfRows: number){
    this.setState({selected : {idx : 1, rowIdx : numberOfRows - 2}});
  },

  onToggleFilter(){
    this.setState({canFilter : !this.state.canFilter});
  },


  getHeaderRows(): Array<{ref: string; height: number;}> {
    var rows = [{ref:"row", height: this.props.rowHeight}];
    if(this.state.canFilter === true){
      rows.push({
        ref:"filterRow",
        headerCellRenderer : <FilterableHeaderCell onChange={this.props.onAddFilter} column={this.props.column}/>,
        height : 45
      });
    }
    return rows;
  },

  getRowOffsetHeight(): number{
    var offsetHeight = 0;
    this.getHeaderRows().forEach((row) => offsetHeight += parseFloat(row.height, 10) );
    return offsetHeight;
  },

  handleSort: function(columnKey: string, direction: SortType) {
    this.setState({sortDirection: direction, sortColumn: columnKey}, function(){
      this.props.onGridSort(columnKey, direction);
    });
  },

  copyPasteEnabled: function(): boolean {
    return this.props.onCellCopyPaste !== null;
  },

  handleCopy(args: {value: string}){
    if(!this.copyPasteEnabled()) { return; }
      var textToCopy = args.value;
      var selected = this.state.selected;
      var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
      this.setState({textToCopy:textToCopy, copied : copied});
  },

  handlePaste(){
    if(!this.copyPasteEnabled()) { return; }
      var selected = this.state.selected;

      var cellKey = this.getColumn(this.state.columnMetrics.columns, this.state.selected.idx).key;
      if(this.props.onCellCopyPaste) {
        this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx});
      }
      this.setState({copied : null});
  },

  dragEnabled: function(): boolean {
    return this.props.onCellsDragged !== null;
  },

  handleDragStart(dragged: DraggedType){
    if(!this.dragEnabled()) { return; }
      var idx = dragged.idx;
      var rowIdx = dragged.rowIdx;
      if (
        idx >= 0
        && rowIdx >= 0
        && idx < this.getSize()
        && rowIdx < this.props.rowsCount
      ) {
        this.setState({dragged: dragged});
      }
  },

  handleDragEnter(row: any){
    if(!this.dragEnabled()) { return; }
      var selected = this.state.selected;
      var dragged = this.state.dragged;
      dragged.overRowIdx = row;
      this.setState({dragged : dragged});
  },

  handleDragEnd(){
    if(!this.dragEnabled()) { return; }
      var fromRow, toRow;
      var selected = this.state.selected;
      var dragged = this.state.dragged;
      var cellKey = this.getColumn(this.state.columnMetrics.columns, this.state.selected.idx).key;
      fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
      toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
      if(this.props.onCellsDragged) {
        this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.value});
      }
      this.setState({dragged : {complete : true}});
  },

  handleTerminateDrag(){
    if(!this.dragEnabled()) { return; }
      this.setState({dragged: null});
  }

});


module.exports = ReactDataGrid;
