/* @flow */
/**
 * @jsx React.DOM


 */
"use strict";

var React               = require('react');
var joinClasses          = require('classnames');
var shallowCloneObject  = require('./shallowCloneObject');
var ColumnMetrics       = require('./ColumnMetrics');
var HeaderRow           = require('./HeaderRow');

type Column = {
  width: number
}

var Header = React.createClass({
  propTypes: {
    columnMetrics: React.PropTypes.shape({  width: React.PropTypes.number.isRequired }).isRequired,
    totalWidth: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    headerRows : React.PropTypes.array.isRequired
  },

  render(): ?ReactElement {
    var state = this.state.resizing || this.props;

    var className = joinClasses({
      'react-grid-Header': true,
      'react-grid-Header--resizing': !!this.state.resizing
    });
    var headerRows = this.getHeaderRows();

    return (

      <div {...this.props} style={this.getStyle()} className={className}>
        {headerRows}
      </div>
    );
  },

  shouldComponentUpdate : function(nextProps: any, nextState: any): boolean{
    var update =  !(ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn))
    || this.props.totalWidth != nextProps.totalWidth
    || (this.props.headerRows.length != nextProps.headerRows.length)
    || (this.state.resizing != nextState.resizing)
    || this.props.sortColumn != nextProps.sortColumn
    || this.props.sortDirection != nextProps.sortDirection;
    return update;
  },

  getHeaderRows(): Array<HeaderRow>{
    var columnMetrics = this.getColumnMetrics();
    var resizeColumn;
    if(this.state.resizing){
      resizeColumn = this.state.resize.column;
    }
    var headerRows = [];
    this.props.headerRows.forEach((function(row, index){
      var headerRowStyle = {
        position: 'absolute',
        top: this.props.height * index,
        left: 0,
        width: this.props.totalWidth,
        overflow : 'hidden'
      };

      headerRows.push(<HeaderRow
        key={row.ref}
        ref={row.ref}
        style={headerRowStyle}
        onColumnResize={this.onColumnResize}
        onColumnResizeEnd={this.onColumnResizeEnd}
        width={columnMetrics.width}
        height={row.height || this.props.height}
        columns={columnMetrics.columns}
        resizing={resizeColumn}
        headerCellRenderer={row.headerCellRenderer}
        />)
    }).bind(this));
    return headerRows;
  },

  getInitialState(): {resizing: any} {
    return {resizing: null};
  },

  componentWillReceiveProps(nextProps: any) {
    this.setState({resizing: null});
  },

  onColumnResize(column: Column, width: number) {
    var state = this.state.resizing || this.props;

    var pos = this.getColumnPosition(column);

    if (pos != null) {
      var resizing = {
        columns: shallowCloneObject(state.columns)
      };
      resizing.columnMetrics = ColumnMetrics.resizeColumn(
          resizing.columns, pos, width);

      // we don't want to influence scrollLeft while resizing
      if (resizing.columns.totalWidth < state.columns.totalWidth) {
        resizing.columns.totalWidth = state.columns.totalWidth;
      }

      resizing.column = resizing.columns.columns[pos];
      this.setState({resizing});
    }
  },

  getColumnMetrics() {
    var columnMetrics;
    if(this.state.resizing){
      columnMetrics = this.state.resizing.columnMetrics;
    }else{
      columnMetrics = this.props.columnMetrics;
    }
    return columnMetrics;
  },

  getColumnPosition(column: Column): ?number {
    var columnMetrics = this.getColumnMetrics();
    var pos = -1;
    columnMetrics.columns.forEach((c,idx) => {
      var identifier = 'key';
      if(c[identifier] === column[identifier]){
        pos = idx;
      }
    });
    return pos === -1 ? null : pos;
  },

  onColumnResizeEnd(column: Column, width: number) {
    var pos = this.getColumnPosition(column);
    if (pos !== null && this.props.onColumnResize) {
      this.props.onColumnResize(pos, width || column.width);
    }
  },

  setScrollLeft(scrollLeft: number) {
    var node = this.refs.row.getDOMNode();
    node.scrollLeft = scrollLeft;
    this.refs.row.setScrollLeft(scrollLeft);
  },

  getStyle(): {position: string; height: number} {
    return {
      position: 'relative',
      height: this.props.height * this.props.headerRows.length,
      overflow : 'hidden'
    };
  },
});


module.exports = Header;
