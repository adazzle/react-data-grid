/* TODO@flow mixins */

var React             = require('react');
var DOMMetrics        = require('./DOMMetrics');
var getWindowSize     = require('./getWindowSize');

var PropTypes            = React.PropTypes;
var min   = Math.min;
var max   = Math.max;
var floor = Math.floor;
var ceil  = Math.ceil;

type ViewportScrollState = {
  displayStart: number;
  displayEnd: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
};

module.exports = {
  mixins: [DOMMetrics.MetricsMixin],

  DOMMetrics: {
    viewportHeight(): number {
      return this.getDOMNode().offsetHeight;
    }
  },

  propTypes: {
    rowHeight: React.PropTypes.number,
    rowsCount: React.PropTypes.number.isRequired
  },

  getDefaultProps(): { rowHeight: number } {
    return {
      rowHeight: 30
    };
  },

  getInitialState(): ViewportScrollState {
    return this.getGridState(this.props);
  },

  getGridState(props: {rowHeight: number; rowsCount: number; minHeight: number}): ViewportScrollState  {
	var renderedRowsCount = ceil(props.minHeight / props.rowHeight);
	var totalRowCount = min(renderedRowsCount * 2, props.rowsCount);
    return {
      displayStart: 0,
      displayEnd: totalRowCount,
      height: props.minHeight,
      scrollTop: 0,
      scrollLeft: 0
    };
  },

  updateScroll(scrollTop: number, scrollLeft: number, height: number, rowHeight: number, length: number) {
    var renderedRowsCount = ceil(height / rowHeight);

    var visibleStart = floor(scrollTop / rowHeight);

    var visibleEnd = min(
        visibleStart + renderedRowsCount,
        length);

    var displayStart = max(
        0,
        visibleStart - renderedRowsCount * 2);

    var displayEnd = min(
        visibleStart + renderedRowsCount * 2,
        length);

    var nextScrollState = {
      visibleStart,
      visibleEnd,
      displayStart,
      displayEnd,
      height,
      scrollTop,
      scrollLeft
    };

    this.setState(nextScrollState);
  },

  metricsUpdated() {
    var height = this.DOMMetrics.viewportHeight();
    if (height) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        height,
        this.props.rowHeight,
        this.props.rowsCount
      );
    }
  },

  componentWillReceiveProps(nextProps: { rowHeight: number; totalRows: number }) {
    if (this.props.rowHeight !== nextProps.rowHeight) {
      this.setState(this.getGridState(nextProps));
    } else if (this.props.totalRows !== nextProps.totalRows) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        this.state.height,
        nextProps.rowHeight,
        nextProps.totalRows
      );
    }
  }
};
