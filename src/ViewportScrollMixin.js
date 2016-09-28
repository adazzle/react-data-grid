import ColumnUtils from './ColumnUtils';
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
    },
    viewportWidth(): number {
      return ReactDOM.findDOMNode(this).offsetWidth;
    }
  },

  propTypes: {
    rowHeight: React.PropTypes.number,
    rowsCount: React.PropTypes.number.isRequired
  },

  getDefaultProps(): { rowHeight: number } {
    return {
      rowHeight: 30,
      colOverFlow: 1.5,
      rowOverFlow: 2,
      scrollingResetTimeInterval: 150
    };
  },

  getInitialState(): ViewportScrollState {
    return this.getGridState(this.props);
  },

  getGridState(props: {rowHeight: number; rowsCount: number; minHeight: number}): ViewportScrollState  {
    let canvasHeight = props.minHeight - props.rowOffsetHeight;
    let renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
    let totalRowCount = min(renderedRowsCount * this.props.rowOverFlow, props.rowsCount);
    let totalNumberColumns = ColumnUtils.getSize(this.props.columnMetrics.columns);
    return {
      displayStart: 0,
      displayEnd: totalRowCount,
      height: canvasHeight,
      width: props.columnMetrics.totalWidth,
      scrollTop: 0,
      scrollLeft: 0,
      colDisplayStart: 0,
      colDisplayEnd: 0
    };
  },

  getVisibleColStart(scrollLeft) {
    let remainingScroll = scrollLeft;
    let columnIndex = -1;
    while (remainingScroll >= 0) {
      columnIndex ++;
      remainingScroll -= ColumnUtils.getColumn(this.props.columnMetrics.columns, columnIndex).width;
    }
    return columnIndex;
  },

  getRenderedColumnCount(displayStart, width) {
    let remainingWidth = width > 0 ? width : this.props.columnMetrics.totalWidth;
    let columnIndex = displayStart;
    let columnCount = 0;
    while (remainingWidth > 0) {
      columnCount++;
      columnIndex++;
      remainingWidth -= ColumnUtils.getColumn(this.props.columnMetrics.columns, columnIndex - 1).width;
    }
    return columnCount;
  },


  updateScroll(scrollTop: number, scrollLeft: number, height: number, rowHeight: number, length: number, width) {
    let isScrolling = true;
    this.setScrollStateAfterDelay();
    let renderedRowsCount = ceil(height / rowHeight);
    let visibleStart = floor(scrollTop / rowHeight);
    let totalNumberColumns = ColumnUtils.getSize(this.props.columnMetrics.columns);
    let visibleColStart = this.getVisibleColStart(scrollLeft);
    let renderedColumnCount = this.getRenderedColumnCount(visibleColStart, width);
    let displayStart = max(0, visibleStart - renderedRowsCount * this.props.rowOverFlow);
    let displayEnd = min(visibleStart + renderedRowsCount * this.props.rowOverFlow, length);
    let colDisplayStart = max(0, visibleColStart - 2);
    let colDisplayEnd = min(visibleColStart + renderedColumnCount + 4, totalNumberColumns);


    let nextScrollState = {
      isScrolling,
      displayStart,
      displayEnd,
      height,
      scrollTop,
      scrollLeft,
      colDisplayStart,
      colDisplayEnd
    };
    this.setState(nextScrollState);
  },

  setScrollStateAfterDelay() {
    const {scrollingResetTimeInterval} = this.props;

    if (this._handleScrollStopTimeoutId) {
      clearTimeout(this._handleScrollStopTimeoutId);
    }

    this._handleScrollStopTimeoutId = setTimeout(
      this.handleScrollStop,
      scrollingResetTimeInterval
    );
  },

  handleScrollStop() {
    this.setState({isScrolling: false});
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
      this.setState(this.getGridState(nextProps));
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
  }
};
