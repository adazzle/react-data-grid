/* @flow  */
/**
 * @jsx React.DOM


 */
'use strict';

var React          = require('react/addons');
var cx             = React.addons.classSet;
var Cell           = require('./Cell');
var cloneWithProps = React.addons.cloneWithProps;
var ColumnMetrics    = require('./ColumnMetrics');

type RowPropsType = {
  height: number;
  idx: number;
  columns: any;
  row: any;
  cellRenderer: ?any;
  isSelected: ?boolean;
};

type cellProps = {
  props: {
    selected: {rowIdx: number};
    dragged: {complete: bool; rowIdx: number};
    copied: { rowIdx: number};
  }
};

var Row = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    columns: React.PropTypes.array.isRequired,
    row: React.PropTypes.object.isRequired,
    cellRenderer: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
    idx : React.PropTypes.number.isRequired,
    expandedRows : React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render(): ?ReactElement {
    var className = cx(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`
    );

    var style = {
      height: this.getRowHeight(this.props),
      overflow: 'hidden'
    };

    var cells = this.getCells();
    return (
      <div {...this.props} className={className} style={style} onDragEnter={this.handleDragEnter}>
        {React.isValidElement(this.props.row) ?
          this.props.row : cells}
      </div>
    );
  },

  getCells(): Array<ReactElement> {
    var cells = [];
    var lockedCells = [];

    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      var column = this.props.columns[i];
      var cell = this.renderCell({
        ref:i,
        key:i,
        idx:i,
        rowIdx:this.props.idx,
        value:this.getCellValue(column.key || i),
        column:column,
        height:this.getRowHeight(),
        formatter:column.formatter,
        cellMetaData : this.props.cellMetaData,
        //TODO passing the row to the cell??
        rowData : this.props.row});
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  },

  getRowHeight(): number {
    var rows = this.props.expandedRows || null;
    if(rows && this.props.key) {
      var row = rows[this.props.key] || null;
      if(row) {
        return row.height;
      }
    }
    return this.props.height;
  },

  getCellValue(key: number | string): any {
    if(key === 'select-row'){
      return this.props.isSelected;
    }else{
      return this.props.row[key]
    }
  },

  renderCell(props: any): ReactElement {
    if(typeof this.props.cellRenderer == 'function') {
      this.props.cellRenderer.call(this, props);
    }
    if (React.isValidElement(this.props.cellRenderer)) {
      return cloneWithProps(this.props.cellRenderer, props);
    } else {
      return this.props.cellRenderer(props);
    }
  },

  getDefaultProps(): {cellRenderer: Cell} {
    return {
      cellRenderer: Cell,
      isSelected: false,
      height : 35
    };
  },


  setScrollLeft(scrollLeft: number) {
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  },

  doesRowContainSelectedCell(props: any): boolean{
    var selected = props.cellMetaData.selected;
    if(selected && selected.rowIdx === props.idx){
      return true;
    }else{
      return false;
    }
  },

  willRowBeDraggedOver(props: any): boolean{
    var dragged = props.cellMetaData.dragged;
    return  dragged != null && (dragged.rowIdx || dragged.complete === true);
  },

  hasRowBeenCopied(): boolean{
    var copied = this.props.cellMetaData.copied;
    return copied != null && copied.rowIdx === this.props.idx;
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
    this.doesRowContainSelectedCell(this.props)          ||
    this.doesRowContainSelectedCell(nextProps)           ||
    this.willRowBeDraggedOver(nextProps)                 ||
    nextProps.row !== this.props.row                     ||
    this.hasRowBeenCopied()                              ||
    nextProps.height !== this.props.height;
  },

  handleDragEnter(){
    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
    if(handleDragEnterRow){
      handleDragEnterRow(this.props.idx);
    }
  }

});

module.exports = Row;
