import React from 'react';
import Canvas from './Canvas';
import cellMetaDataShape from 'common/prop-shapes/CellMetaDataShape';
import PropTypes from 'prop-types';
import {getSize} from './ColumnUtils';
import {
  getGridState,
  getColOverscanEndIdx,
  getVisibleBoundaries,
  getScrollDirection,
  getRowOverscanStartIdx,
  getRowOverscanEndIdx,
  getColOverscanStartIdx,
  getNonFrozenVisibleColStartIdx,
  getNonFrozenRenderedColumnCount,
  findLastFrozenColumnIndex
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
    onCellRangeSelectionStarted: PropTypes.func,
    onCellRangeSelectionUpdated: PropTypes.func,
    onCellRangeSelectionCompleted: PropTypes.func,
    onCommit: PropTypes.func.isRequired,
    RowsContainer: PropTypes.node
  };

  static defaultProps = {
    rowHeight: 30
  };

  state = getGridState(this.props);

  onScroll = ({ scrollTop, scrollLeft }) => {
    const { rowHeight, rowsCount, onScroll } = this.props;
    const nextScrollState = this.updateScroll({
      scrollTop,
      scrollLeft,
      height: this.state.height,
      rowHeight,
      rowsCount
    });

    if (onScroll) {
      onScroll(nextScrollState);
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

  getNextScrollState({ scrollTop, scrollLeft, height, rowHeight, rowsCount}) {
    const isScrolling = true;
    const { columns } = this.props.columnMetrics;
    const scrollDirection = getScrollDirection(this.state, scrollTop, scrollLeft);
    const { rowVisibleStartIdx, rowVisibleEndIdx } = getVisibleBoundaries(height, rowHeight, scrollTop, rowsCount);
    const rowOverscanStartIdx = getRowOverscanStartIdx(scrollDirection, rowVisibleStartIdx);
    const rowOverscanEndIdx = getRowOverscanEndIdx(scrollDirection, rowVisibleEndIdx, rowsCount);
    const totalNumberColumns = getSize(columns);
    const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
    const nonFrozenColVisibleStartIdx = getNonFrozenVisibleColStartIdx(columns, scrollLeft);
    const nonFrozenRenderedColumnCount = getNonFrozenRenderedColumnCount(this.props.columnMetrics, this.getDOMNodeOffsetWidth(), scrollLeft);
    const colVisibleEndIdx = Math.min(nonFrozenColVisibleStartIdx + nonFrozenRenderedColumnCount, totalNumberColumns);
    const colOverscanStartIdx = getColOverscanStartIdx(scrollDirection, nonFrozenColVisibleStartIdx, lastFrozenColumnIndex);
    const colOverscanEndIdx = getColOverscanEndIdx(scrollDirection, colVisibleEndIdx, totalNumberColumns);
    return {
      height,
      scrollTop,
      scrollLeft,
      rowVisibleStartIdx,
      rowVisibleEndIdx,
      rowOverscanStartIdx,
      rowOverscanEndIdx,
      colVisibleStartIdx: nonFrozenColVisibleStartIdx,
      colVisibleEndIdx,
      colOverscanStartIdx,
      colOverscanEndIdx,
      scrollDirection,
      lastFrozenColumnIndex,
      isScrolling
    };
  }

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

  updateScroll = (scrollParams) => {
    this.resetScrollStateAfterDelay();
    const nextScrollState = this.getNextScrollState(scrollParams);
    this.setState(nextScrollState);
    return nextScrollState;
  };

  metricsUpdated = () => {
    const height = this.viewportHeight();
    const width = this.viewportWidth();
    if (height) {
      const { scrollTop, scrollLeft } = this.state;
      const { rowHeight, rowsCount } = this.props;
      this.updateScroll({
        scrollTop,
        scrollLeft,
        height,
        rowHeight,
        rowsCount,
        width
      });
    }
  };

  viewportHeight = () => {
    return this.viewport ? this.viewport.offsetHeight : 0;
  };

  viewportWidth = () => {
    return this.viewport ? this.viewport.offsetWidth : 0;
  };

  componentWillReceiveProps(nextProps) {
    const { rowHeight, rowsCount } = nextProps;
    if (this.props.rowHeight !== nextProps.rowHeight ||
      this.props.minHeight !== nextProps.minHeight) {
      const { scrollTop, scrollLeft, height } = getGridState(nextProps);
      this.updateScroll({
        scrollTop,
        scrollLeft,
        height,
        rowHeight,
        rowsCount
      });
    } else if (getSize(this.props.columnMetrics.columns) !== getSize(nextProps.columnMetrics.columns)) {
      this.setState(getGridState(nextProps));
    } else if (this.props.rowsCount !== nextProps.rowsCount) {
      const { scrollTop, scrollLeft, height } = this.state;
      this.updateScroll({
        scrollTop,
        scrollLeft,
        height,
        rowHeight,
        rowsCount
      });
      // Added to fix the hiding of the bottom scrollbar when showing the filters.
    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
      const { scrollTop, scrollLeft } = this.state;
      // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
      const height = this.state.height + this.props.rowOffsetHeight - nextProps.rowOffsetHeight;
      this.updateScroll({
        scrollTop,
        scrollLeft,
        height,
        rowHeight,
        rowsCount
      });
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
    const style = {
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
          totalColumnWidth={this.props.columnMetrics.totalColumnWidth}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          columns={this.props.columnMetrics.columns}
          rowRenderer={this.props.rowRenderer}
          rowOverscanStartIdx={this.state.rowOverscanStartIdx}
          rowOverscanEndIdx={this.state.rowOverscanEndIdx}
          rowVisibleStartIdx={this.state.rowVisibleStartIdx}
          rowVisibleEndIdx={this.state.rowVisibleEndIdx}
          colVisibleStartIdx={this.state.colVisibleStartIdx}
          colVisibleEndIdx={this.state.colVisibleEndIdx}
          colOverscanStartIdx={this.state.colOverscanStartIdx}
          colOverscanEndIdx={this.state.colOverscanEndIdx}
          lastFrozenColumnIndex={this.state.lastFrozenColumnIndex}
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
          onCellRangeSelectionStarted={this.props.onCellRangeSelectionStarted}
          onCellRangeSelectionUpdated={this.props.onCellRangeSelectionUpdated}
          onCellRangeSelectionCompleted={this.props.onCellRangeSelectionCompleted}
          onCommit={this.props.onCommit}
          RowsContainer={this.props.RowsContainer}
          prevScrollLeft={this.state.prevScrollLeft}
          prevScrollTop={this.state.prevScrollTop}
        />
      </div>
    );
  }
}

module.exports = Viewport;
