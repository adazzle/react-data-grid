const React                = require('react');
const Canvas               = require('./Canvas');
const cellMetaDataShape    = require('./PropTypeShapes/CellMetaDataShape');
const PropTypes            = React.PropTypes;
import ColumnUtils from './ColumnUtils';
const ReactDOM = require('react-dom');
const DOMMetrics = require('./DOMMetrics');
const min = Math.min;
const max = Math.max;
const floor = Math.floor;
const ceil = Math.ceil;

type ViewportScrollState = {
  displayStart: number;
  displayEnd: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
};

const Viewport = React.createClass({
  mixins: [DOMMetrics.MetricsMixin],

  propTypes: {
    rowOffsetHeight: PropTypes.number.isRequired,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    columnMetrics: PropTypes.object.isRequired,
    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    selectedRows: PropTypes.array,
    rowSelection: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
      }),
      React.PropTypes.shape({
        isSelectedKey: React.PropTypes.string.isRequired
      }),
      React.PropTypes.shape({
        keys: React.PropTypes.shape({
          values: React.PropTypes.array.isRequired,
          rowKey: React.PropTypes.string.isRequired
        }).isRequired
      })
    ]),
    expandedRows: PropTypes.array,
    rowRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    rowsCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    onRows: PropTypes.func,
    onScroll: PropTypes.func,
    minHeight: PropTypes.number,
    cellMetaData: PropTypes.shape(cellMetaDataShape),
    rowKey: PropTypes.string.isRequired,
    rowScrollTimeout: PropTypes.number,
    contextMenu: PropTypes.element,
    getSubRowDetails: PropTypes.func,
    rowGroupRenderer: PropTypes.func
  },

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
      rowHeight: 30
    };
  },

  getInitialState(): ViewportScrollState {
    return this.getGridState(this.props);
  },

  getGridState(props: { rowHeight: number; rowsCount: number; minHeight: number }): ViewportScrollState {
    let totalNumberColumns = ColumnUtils.getSize(props.columnMetrics.columns);
    let canvasHeight = props.minHeight - props.rowOffsetHeight;
    let renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
    let totalRowCount = min(renderedRowsCount * 4, props.rowsCount);
    return {
      displayStart: 0,
      displayEnd: totalRowCount,
      visibleStart: 0,
      visibleEnd: totalRowCount,
      height: canvasHeight,
      scrollTop: 0,
      scrollLeft: 0,
      colVisibleStart: 0,
      colVisibleEnd: totalNumberColumns,
      colDisplayStart: 0,
      colDisplayEnd: totalNumberColumns
    };
  },

  getRenderedColumnCount(displayStart, width) {
    let remainingWidth = width && width > 0 ? width : this.props.columnMetrics.totalWidth;
    if (remainingWidth === 0) {
      remainingWidth = ReactDOM.findDOMNode(this).offsetWidth;
    }
    let columnIndex = displayStart;
    let columnCount = 0;
    while (remainingWidth > 0) {
      let column = ColumnUtils.getColumn(this.props.columnMetrics.columns, columnIndex);

      if (!column) {
        break;
      }

      columnCount++;
      columnIndex++;
      remainingWidth -= column.width;
    }
    return columnCount;
  },

  getVisibleColStart(scrollLeft) {
    let remainingScroll = scrollLeft;
    let columnIndex = -1;
    while (remainingScroll >= 0) {
      columnIndex++;
      remainingScroll -= ColumnUtils.getColumn(this.props.columnMetrics.columns, columnIndex).width;
    }
    return columnIndex;
  },

  resetScrollStateAfterDelay() {
    if (this.resetScrollStateTimeoutId) {
      clearTimeout(this.resetScrollStateTimeoutId);
    }

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
    let isScrolling = true;
    this.resetScrollStateAfterDelay();

    let renderedRowsCount = ceil(height / rowHeight);

    let visibleStart = max(0, floor(scrollTop / rowHeight));

    let visibleEnd = min(visibleStart + renderedRowsCount, length);

    let displayStart = max(0, visibleStart - this.props.overScan.rowsStart);

    let displayEnd = min(visibleEnd + this.props.overScan.rowsEnd, length);

    let totalNumberColumns = ColumnUtils.getSize(this.props.columnMetrics.columns);
    let colVisibleStart = (totalNumberColumns > 0) ? max(0, this.getVisibleColStart(scrollLeft)) : 0;
    let renderedColumnCount = this.getRenderedColumnCount(colVisibleStart, width);
    let colVisibleEnd = (renderedColumnCount !== 0) ? colVisibleStart + renderedColumnCount : totalNumberColumns;
    let colDisplayStart = max(0, colVisibleStart - this.props.overScan.colsStart);
    let colDisplayEnd = min(colVisibleEnd + this.props.overScan.colsEnd, totalNumberColumns);

    let nextScrollState = {
      visibleStart,
      visibleEnd,
      displayStart,
      displayEnd,
      height,
      scrollTop,
      scrollLeft,
      colVisibleStart,
      colVisibleEnd,
      colDisplayStart,
      colDisplayEnd,
      isScrolling
    };

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
      this.props.minHeight !== nextProps.minHeight ||
      ColumnUtils.getSize(this.props.columnMetrics.columns) !== ColumnUtils.getSize(nextProps.columnMetrics.columns)) {
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
  },

  onScroll(scroll: {scrollTop: number; scrollLeft: number}) {
    this.updateScroll(
      scroll.scrollTop, scroll.scrollLeft,
      this.state.height,
      this.props.rowHeight,
      this.props.rowsCount
    );

    if (this.props.onScroll) {
      this.props.onScroll({scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft});
    }
  },

  getScroll(): {scrollLeft: number; scrollTop: number} {
    return this.canvas.getScroll();
  },

  setScrollLeft(scrollLeft: number) {
    this.canvas.setScrollLeft(scrollLeft);
  },

  render() {
    let style = {
      padding: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: this.props.rowOffsetHeight
    };
    return (
      <div
        className="react-grid-Viewport"
        style={style}>
        <Canvas
          ref={(node) => this.canvas = node}
          rowKey={this.props.rowKey}
          totalWidth={this.props.totalWidth}
          width={this.props.columnMetrics.width}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          columns={this.props.columnMetrics.columns}
          rowRenderer={this.props.rowRenderer}
          displayStart={this.state.displayStart}
          displayEnd={this.state.displayEnd}
          visibleStart={this.state.visibleStart}
          visibleEnd={this.state.visibleEnd}
          colVisibleStart={this.state.colVisibleStart}
          colVisibleEnd={this.state.colVisibleEnd}
          colDisplayStart={this.state.colDisplayStart}
          colDisplayEnd={this.state.colDisplayEnd}
          cellMetaData={this.props.cellMetaData}
          height={this.state.height}
          rowHeight={this.props.rowHeight}
          onScroll={this.onScroll}
          onRows={this.props.onRows}
          rowScrollTimeout={this.props.rowScrollTimeout}
          contextMenu={this.props.contextMenu}
          rowSelection={this.props.rowSelection}
          getSubRowDetails={this.props.getSubRowDetails}
          rowGroupRenderer={this.props.rowGroupRenderer}
          isScrolling={this.state.isScrolling || false}
        />
      </div>
    );
  }
});

module.exports = Viewport;
