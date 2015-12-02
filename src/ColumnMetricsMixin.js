/* TODO@flow mixins */

var ColumnMetrics        = require('./ColumnMetrics');
var DOMMetrics           = require('./DOMMetrics');
Object.assign            = require('object-assign');
var PropTypes            = require('react').PropTypes;
var ColumnUtils = require('./ColumnUtils');
var React = require('react');

type ColumnMetricsType = {
    columns: Array<Column>;
    totalWidth: number;
    minColumnWidth: number;
};

class Column {
  key: string;
  left: number;
  width: number;
};

module.exports = {
  mixins: [DOMMetrics.MetricsMixin],

  propTypes: {
    columns: PropTypes.arrayOf(Column),
    minColumnWidth: PropTypes.number,
    columnEquality: PropTypes.func
  },

  DOMMetrics: {
    gridWidth(): number {
      return React.findDOMNode(this).parentElement.offsetWidth;
    }
  },

  getDefaultProps(): {minColumnWidth: number; columnEquality: (a: Column, b: Column) => boolean}  {
    return {
      minColumnWidth: 80,
      columnEquality: ColumnMetrics.sameColumn
    };
  },


  componentWillReceiveProps(nextProps: ColumnMetricsType) {
    if (nextProps.columns) {
      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)) {
        var columnMetrics = this.createColumnMetrics();
        this.setState({columnMetrics: columnMetrics});
      }
    }
  },

  getTotalWidth() {
    var totalWidth = 0;
    if(this.isMounted()){
      totalWidth = this.DOMMetrics.gridWidth();
    } else {
      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
    }
    return totalWidth;
  },

  getColumnMetricsType(metrics: ColumnMetricsType): { columns: ColumnMetricsType } {
    var totalWidth = this.getTotalWidth();
    var currentMetrics = {
      columns: metrics.columns,
      totalWidth: totalWidth,
      minColumnWidth: metrics.minColumnWidth
    };
    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
    return updatedMetrics;
  },

  getColumn(idx) {
    var columns = this.state.columnMetrics.columns;
    if(Array.isArray(columns)){
      return columns[idx];
    }else if (typeof Immutable !== 'undefined') {
      return columns.get(idx);
    }
  },

  getSize() {
    var columns = this.state.columnMetrics.columns;
    if(Array.isArray(columns)){
      return columns.length;
    }else if (typeof Immutable !== 'undefined') {
      return columns.size;
    }
  },

  metricsUpdated() {
    var columnMetrics = this.createColumnMetrics();
    this.setState({columnMetrics});
  },

  createColumnMetrics(initialRun){
    var gridColumns = this.setupGridColumns();
    return this.getColumnMetricsType({columns:gridColumns, minColumnWidth: this.props.minColumnWidth}, initialRun);
  },

  onColumnResize(index: number, width: number) {
    var columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
    this.setState({columnMetrics});
  }
};
