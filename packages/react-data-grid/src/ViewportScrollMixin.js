import ColumnUtils from './ColumnUtils';
const ReactDOM = require('react-dom');
const DOMMetrics = require('./DOMMetrics');
import PropTypes from 'prop-types';
import {
  getGridState,
  getRenderedColumnCount,
  getVisibleColStart,
  getNextScrollState
} from './utils/viewportUtils';

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
    },
    viewportWidth(): number {
      return ReactDOM.findDOMNode(this).offsetWidth;
    }
  },

  propTypes: {
    rowHeight: PropTypes.number,
    rowsCount: PropTypes.number.isRequired
  },

  getDefaultProps(): { rowHeight: number } {
    return {
      rowHeight: 30
    };
  },

  getInitialState(): ViewportScrollState {
    return getGridState(this.props);
  },

  getDOMNodeOffsetWidth() {
    return ReactDOM.findDOMNode(this).offsetWidth;
  },

  getRenderedColumnCount(displayStart, width) {
    return getRenderedColumnCount(this.props, this.getDOMNodeOffsetWidth, displayStart, width);
  },

  clearScrollTimer() {
    if (this.resetScrollStateTimeoutId) {
      clearTimeout(this.resetScrollStateTimeoutId);
    }
  },

  resetScrollStateAfterDelay() {
    this.clearScrollTimer();
    this.resetScrollStateTimeoutId = setTimeout(
      this.resetScrollStateAfterDelayCallback,
      500
    );
  },

  resetScrollStateAfterDelayCallback() {
    this.resetScrollStateTimeoutId = null;
    this.setState({
      isScrolling: false
    });
  },

  updateScroll(scrollTop: number, scrollLeft: number, height: number, rowHeight: number, length: number, width) {
    this.resetScrollStateAfterDelay();
    const nextScrollState = getNextScrollState(this.props, this.getDOMNodeOffsetWidth, scrollTop, scrollLeft, height, rowHeight, length, width);

    this.setState(nextScrollState);
  },

  metricsUpdated() {
    let height = this.DOMMetrics.viewportHeight();
    let width = this.DOMMetrics.viewportWidth();
    if (height) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        height,
        this.props.rowHeight,
        this.props.rowsCount,
        width
      );
    }
  },

  componentWillReceiveProps(nextProps: { rowHeight: number; rowsCount: number, rowOffsetHeight: number }) {
    if (this.props.rowHeight !== nextProps.rowHeight ||
      this.props.minHeight !== nextProps.minHeight) {
      const newState = getGridState(nextProps);
      this.updateScroll(
        newState.scrollTop,
        newState.scrollLeft,
        newState.height,
        nextProps.rowHeight,
        nextProps.rowsCount
      );
    } else if (ColumnUtils.getSize(this.props.columnMetrics.columns) !== ColumnUtils.getSize(nextProps.columnMetrics.columns)) {
      this.setState(getGridState(nextProps));
    } else if (this.props.rowsCount !== nextProps.rowsCount) {
      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        this.state.height,
        nextProps.rowHeight,
        nextProps.rowsCount
      );
      // Added to fix the hiding of the bottom scrollbar when showing the filters.
    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
      // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
      let height = this.props.rowOffsetHeight - nextProps.rowOffsetHeight;

      this.updateScroll(
        this.state.scrollTop,
        this.state.scrollLeft,
        this.state.height + height,
        nextProps.rowHeight,
        nextProps.rowsCount
      );
    }
  },

  componentWillUnmount() {
    this.clearScrollTimer();
  }
};
