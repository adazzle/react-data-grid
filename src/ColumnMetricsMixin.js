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

  getInitialState(): ColumnMetricsType {
    return this.getColumnMetricsType(this.props, true);
  },

  componentWillReceiveProps(nextProps: ColumnMetricsType) {
    if (nextProps.columns) {
      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)) {
        var columnMetrics = this.getColumnMetricsType(nextProps);
        columnMetrics.columns = this.adjustColumnWidths(columnMetrics.columns);
        this.setState(columnMetrics);
      } else {
        var nextColumns = this.adjustColumnWidths(nextProps);
        this.setState({columns: nextColumns});
      }
    }
  },

  adjustColumnWidths(columns: ColumnMetricsType){
    var index = {};
    this.state.columns.columns.forEach((c) => {
      index[c.key] = {width: c.width, left: c.left};
    });
    var nextColumns = Object.assign(this.state.columns, {
      columns: columns.columns.map((c) => Object.assign(c, index[c.key]))
    });
    return nextColumns;
  },

  getColumnMetricsType(props: ColumnMetricsType, initial: ?number): { columns: ColumnMetricsType; gridWidth: number } {
    var totalWidth = initial ? initial : this.DOMMetrics.gridWidth();
    return {
      columns: ColumnMetrics.calculate({
        columns: props.columns,
        totalWidth: totalWidth,
        minColumnWidth: props.minColumnWidth
      }),
      gridWidth: totalWidth
    };
  },

  metricsUpdated() {
    this.setState(this.getColumnMetricsType(this.props));
  },

  onColumnResize(index: number, width: number) {
    var columns = ColumnMetrics.resizeColumn(this.state.columns, index, width);
    this.setState({columns});
  }
};
