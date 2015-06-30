/* @flow */
/**
 * @jsx React.DOM


 */
"use strict";

var React                = require('react');
var PropTypes            = React.PropTypes;
var Header               = require('./Header');
var Viewport             = require('./Viewport');
var DOMMetrics           = require('./DOMMetrics');
var GridScrollMixin      = require('./GridScrollMixin');
var ColumnMetricsMixin      = require('./ColumnMetricsMixin');
var ExcelColumn = require('./addons/grids/ExcelColumn');

var Grid = React.createClass({
  mixins: [
    GridScrollMixin,
    ColumnMetricsMixin,
    DOMMetrics.MetricsComputatorMixin
  ],

  propTypes: {
    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    columns: PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
    minHeight: PropTypes.number,
    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    rowHeight: PropTypes.number,
    rowRenderer: PropTypes.func,
    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    rowsCount: PropTypes.number,
    onRows: PropTypes.func,
    sortColumn : React.PropTypes.string.isRequired,
    sortDirection : React.PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
    rowOffsetHeight: PropTypes.number.isRequired,
    onViewportKeydown : PropTypes.func.isRequired,
    onViewportDragStart : PropTypes.func.isRequired,
    onViewportDragEnd : PropTypes.func.isRequired,
    onViewportDoubleClick : PropTypes.func.isRequired
  },

  getStyle: function(): { overflow: string; outline: number; position: string; minHeight: number } {
    return{
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    }
  },

  render(): ?ReactElement {
    var headerRows = this.props.headerRows || [{ref : 'row'}];
    return (
      <div {...this.props} style={this.getStyle()} className="react-grid-Grid">
        <Header
          ref="header"
          columns={this.state.columnMetrics}
          onColumnResize={this.onColumnResize}
          height={this.props.rowHeight}
          totalWidth={this.DOMMetrics.gridWidth()}
          headerRows={headerRows}
          sortColumn={this.props.sortColumn}
          sortDirection={this.props.sortDirection}
          />
        <div ref="viewPortContainer" onKeyDown={this.props.onViewportKeydown} onDoubleClick={this.props.onViewportDoubleClick}   onDragStart={this.props.onViewportDragStart} onDragEnd={this.props.onViewportDragEnd}>
            <Viewport
              ref="viewport"
              width={this.state.columnMetrics.width}
              rowHeight={this.props.rowHeight}
              rowRenderer={this.props.rowRenderer}
              rowGetter={this.props.rowGetter}
              rowsCount={this.props.rowsCount}
              selectedRows={this.props.selectedRows}
              expandedRows={this.props.expandedRows}
              columns={this.state.columnMetrics}
              totalWidth={this.DOMMetrics.gridWidth()}
              onScroll={this.onScroll}
              onRows={this.props.onRows}
              cellMetaData={this.props.cellMetaData}
              rowOffsetHeight={this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
              minHeight={this.props.minHeight}
              />
          </div>
      </div>
    );
  },

  getDefaultProps() {
    return {
      rowHeight: 35,
      minHeight: 350
    };
  },
});

module.exports = Grid;
