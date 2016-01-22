const React             = require('react');
const ReactDOM = require('react-dom');
const DOMMetrics        = require('./DOMMetrics');
const min   = Math.min;
const max   = Math.max;
const floor = Math.floor;
const ceil  = Math.ceil;

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
      return ReactDOM.findDOMNode(this).offsetHeight;
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
    let renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
    let totalRowCount = min(renderedRowsCount * 2, props.rowsCount);
    return {
      displayStart: 0,
      displayEnd: totalRowCount,
      height: props.minHeight,
      scrollTop: 0,
      scrollLeft: 0
    };
  },

  updateScroll(scrollTop: number, scrollLeft: number, height: number, rowHeight: number, length: number) {
    let renderedRowsCount = ceil(height / rowHeight);

    let visibleStart = floor(scrollTop / rowHeight);

    let visibleEnd = min(
        visibleStart + renderedRowsCount,
        length);

    let displayStart = max(
        0,
        visibleStart - renderedRowsCount * 2);

    let displayEnd = min(
        visibleStart + renderedRowsCount * 2,
        length);

    let nextScrollState = {
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
    let height = this.DOMMetrics.viewportHeight();
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

  componentWillReceiveProps(nextProps: { rowHeight: number; rowsCount: number }) {
    if (this.props.rowHeight !== nextProps.rowHeight ||
        this.props.minHeight !== nextProps.minHeight) {
      this.setState(this.getGridState(nextProps));
    } else if (this.props.rowsCount !== nextProps.rowsCount) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        this.state.height,
        nextProps.rowHeight,
        nextProps.rowsCount
      );
    }
  }
};
