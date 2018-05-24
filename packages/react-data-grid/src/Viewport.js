const React                = require('react');
const Canvas               = require('./Canvas');
const cellMetaDataShape    = require('./PropTypeShapes/CellMetaDataShape');
import PropTypes from 'prop-types';
import * as columnUtils from './ColumnUtils';
import {
  getGridState,
  getNextScrollState
} from './utils/viewportUtils';

class Viewport extends React.Component {
  static displayName = 'Viewport';

  static propTypes = {
    rowOffsetHeight: PropTypes.number.isRequired,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    columnMetrics: PropTypes.object.isRequired,
    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    selectedRows: PropTypes.array,
    rowSelection: PropTypes.oneOfType([
      PropTypes.shape({
        indexes: PropTypes.arrayOf(PropTypes.number).isRequired
      }),
      PropTypes.shape({
        isSelectedKey: PropTypes.string.isRequired
      }),
      PropTypes.shape({
        keys: PropTypes.shape({
          values: PropTypes.array.isRequired,
          rowKey: PropTypes.string.isRequired
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
    scrollToRowIndex: PropTypes.number,
    contextMenu: PropTypes.element,
    getSubRowDetails: PropTypes.func,
    rowGroupRenderer: PropTypes.func,
    enableCellSelect: PropTypes.bool.isRequired,
    enableCellAutoFocus: PropTypes.bool.isRequired,
    cellNavigationMode: PropTypes.string.isRequired,
    eventBus: PropTypes.object.isRequired,
    onCheckCellIsEditable: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onGridRowsUpdated: PropTypes.func.isRequired,
    onDragHandleDoubleClick: PropTypes.func.isRequired,
    onCellSelected: PropTypes.func,
    onCellDeSelected: PropTypes.func,
    onCommit: PropTypes.func.isRequired
  };

  static defaultProps = {
    rowHeight: 30
  };

  state = getGridState(this.props);

  onScroll = (scroll) => {
    this.updateScroll(
      scroll.scrollTop,
      scroll.scrollLeft,
      this.state.height,
      this.props.rowHeight,
      this.props.rowsCount
    );

    if (this.props.onScroll) {
      this.props.onScroll({scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft});
    }
  };

  getScroll = () => {
    return this.canvas.getScroll();
  };

  setScrollLeft = (scrollLeft) => {
    this.canvas.setScrollLeft(scrollLeft);
  };

  getDOMNodeOffsetWidth = () => {
    return this.viewport ? this.viewport.offsetWidth : 0;
  };

  clearScrollTimer = () => {
    if (this.resetScrollStateTimeoutId) {
      clearTimeout(this.resetScrollStateTimeoutId);
    }
  };

  resetScrollStateAfterDelay = () => {
    this.clearScrollTimer();
    this.resetScrollStateTimeoutId = setTimeout(
      this.resetScrollStateAfterDelayCallback,
      500
    );
  };

  resetScrollStateAfterDelayCallback = () => {
    this.resetScrollStateTimeoutId = null;
    this.setState({
      isScrolling: false
    });
  };

  updateScroll = (
    scrollTop,
    scrollLeft,
    height,
    rowHeight,
    length,
    width,
  ) => {
    this.resetScrollStateAfterDelay();
    const nextScrollState = getNextScrollState(this.props, this.getDOMNodeOffsetWidth, scrollTop, scrollLeft, height, rowHeight, length, width);

    this.setState(nextScrollState);
  };

  metricsUpdated = () => {
    let height = this.viewportHeight();
    let width = this.viewportWidth();
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
  };

  viewportHeight = () => {
    return this.viewport ? this.viewport.offsetHeight : 0;
  };

  viewportWidth = () => {
    return this.viewport ? this.viewport.offsetWidth : 0;
  };

  componentWillReceiveProps(nextProps) {
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
    } else if (columnUtils.getSize(this.props.columnMetrics.columns) !== columnUtils.getSize(nextProps.columnMetrics.columns)) {
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
  }

  componentDidMount() {
    window.addEventListener('resize', this.metricsUpdated);
    this.metricsUpdated();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.metricsUpdated);
    this.clearScrollTimer();
  }

  setViewportRef = (viewport) => {
    this.viewport = viewport;
  };

  setCanvasRef = (canvas) => {
    this.canvas = canvas;
  };

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
        style={style}
        ref={this.setViewportRef}>
        <Canvas
          ref={this.setCanvasRef}
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
          scrollToRowIndex={this.props.scrollToRowIndex}
          contextMenu={this.props.contextMenu}
          rowSelection={this.props.rowSelection}
          getSubRowDetails={this.props.getSubRowDetails}
          rowGroupRenderer={this.props.rowGroupRenderer}
          isScrolling={this.state.isScrolling || false}
          enableCellSelect={this.props.enableCellSelect}
          enableCellAutoFocus={this.props.enableCellAutoFocus}
          cellNavigationMode={this.props.cellNavigationMode}
          eventBus={this.props.eventBus}
          onCheckCellIsEditable={this.props.onCheckCellIsEditable}
          onCellCopyPaste={this.props.onCellCopyPaste}
          onGridRowsUpdated={this.props.onGridRowsUpdated}
          onDragHandleDoubleClick={this.props.onDragHandleDoubleClick}
          onCellSelected={this.props.onCellSelected}
          onCellDeSelected={this.props.onCellDeSelected}
          onCommit={this.props.onCommit}
        />
      </div>
    );
  }
}

module.exports = Viewport;
