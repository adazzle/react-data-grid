/* TODO@flow mixins */

var ColumnMetrics        = require('./ColumnMetrics');
var DOMMetrics           = require('./DOMMetrics');
Object.assign            = require('object-assign');
var PropTypes            = require('react').PropTypes;


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
      return this.getDOMNode().offsetWidth - 2;
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
        var columnMetrics = this.getColumnMetricsType(nextProps);
        columnMetrics.columns = this.adjustColumnWidths(columnMetrics.columns);
        this.setState(columnMetrics);
      } else {
        var nextColumnStats = this.adjustColumnWidths(nextProps);
        this.setState({columnMetrics: nextColumnStats});
      }
    }
  },

  adjustColumnWidths(columnMetrics: ColumnMetricsType){
    var index = {};
    this.state.columnMetrics.columns.forEach((c) => {
      index[c.key] = {width: c.width, left: c.left};
    });
    var nextColumns = Object.assign(this.state.columnMetrics, {
      columns: columnMetrics.columns.map((c) => Object.assign(c, index[c.key]))
    });
    return nextColumns;
  },

  getColumnMetricsType(metrics: ColumnMetricsType, initial: ?number): { columns: ColumnMetricsType; gridWidth: number } {
    var totalWidth = initial ? initial : this.DOMMetrics.gridWidth();
    var currentMetrics = {
      columns: metrics.columns,
      totalWidth: totalWidth,
      minColumnWidth: metrics.minColumnWidth
    };
    var updatedMetrics
    //if state has not yet been set or else if total width has changed then call recalculate
    if(!this.state || (this.state && this.state.totalWidth !== totalWidth)){
        updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
    } else{
      updatedMetrics = currentMetrics;
    }
    return updatedMetrics;
  },

  getColumn(columns, idx) {
    if(Array.isArray(columns)){
      return columns[idx];
    }else if (typeof Immutable !== 'undefined') {
      return columns.get(idx);
    }
  },

  getColumnCount() {
    var columns = this.state.columnMetrics.columns;
    if(Array.isArray(columns)){
      return columns.length;
    }else if (typeof Immutable !== 'undefined') {
      return columns.size;
    }
  },

  metricsUpdated() {
    this.setState({columnMetrics: this.getColumnMetricsType(this.props)});
  },

  onColumnResize(index: number, width: number) {
    var columns = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
    this.setState({columns});
  }
};
