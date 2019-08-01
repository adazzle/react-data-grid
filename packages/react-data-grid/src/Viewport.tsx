import React from 'react';

import Canvas from './Canvas';
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
import { GridProps } from './Grid';
import { ScrollPosition } from './common/types';
import { SCROLL_DIRECTION } from './common/enums';

interface ScrollParams {
  height: number;
  scrollTop: number;
  scrollLeft: number;
  rowsCount: number;
  rowHeight: number;
}

export interface ScrollState {
  height: number;
  scrollTop: number;
  scrollLeft: number;
  rowVisibleStartIdx: number;
  rowVisibleEndIdx: number;
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  scrollDirection: SCROLL_DIRECTION;
  lastFrozenColumnIndex: number;
  isScrolling: boolean;
}

type SharedGridProps<R> = Pick<GridProps<R>,
'rowKey'
| 'rowHeight'
| 'rowRenderer'
| 'rowGetter'
| 'rowsCount'
| 'selectedRows'
| 'columnMetrics'
| 'totalWidth'
| 'cellMetaData'
| 'rowOffsetHeight'
| 'minHeight'
| 'scrollToRowIndex'
| 'contextMenu'
| 'rowSelection'
| 'getSubRowDetails'
| 'rowGroupRenderer'
| 'enableCellSelect'
| 'enableCellAutoFocus'
| 'cellNavigationMode'
| 'eventBus'
| 'interactionMasksMetaData'
| 'RowsContainer'
| 'editorPortalTarget'
>;

export interface ViewportProps<R> extends SharedGridProps<R> {
  onScroll(scrollState: ScrollState): void;
}

export interface ViewportState {
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  rowVisibleStartIdx: number;
  rowVisibleEndIdx: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  isScrolling: boolean;
  lastFrozenColumnIndex: number;
}

export default class Viewport<R extends {}> extends React.Component<ViewportProps<R>, ViewportState> {
  static displayName = 'Viewport';

  readonly state: Readonly<ViewportState> = getGridState(this.props);
  private readonly canvas = React.createRef<Canvas<R>>();
  private readonly viewport = React.createRef<HTMLDivElement>();
  private resetScrollStateTimeoutId: number | null = null;

  onScroll = ({ scrollTop, scrollLeft }: ScrollPosition) => {
    const { rowHeight, rowsCount, onScroll } = this.props;
    const nextScrollState = this.updateScroll({
      scrollTop,
      scrollLeft,
      height: this.state.height,
      rowHeight,
      rowsCount
    });

    onScroll(nextScrollState);
  };

  getScroll() {
    return this.canvas.current!.getScroll();
  }

  setScrollLeft(scrollLeft: number) {
    this.canvas.current!.setScrollLeft(scrollLeft);
  }

  getDOMNodeOffsetWidth() {
    return this.viewport.current ? this.viewport.current.offsetWidth : 0;
  }

  clearScrollTimer() {
    if (this.resetScrollStateTimeoutId !== null) {
      window.clearTimeout(this.resetScrollStateTimeoutId);
    }
  }

  getNextScrollState({ scrollTop, scrollLeft, height, rowHeight, rowsCount }: ScrollParams): ScrollState {
    const isScrolling = true;
    const { columns } = this.props.columnMetrics;
    const scrollDirection = getScrollDirection(this.state, scrollTop, scrollLeft);
    const { rowVisibleStartIdx, rowVisibleEndIdx } = getVisibleBoundaries(height, rowHeight, scrollTop, rowsCount);
    const rowOverscanStartIdx = getRowOverscanStartIdx(scrollDirection, rowVisibleStartIdx);
    const rowOverscanEndIdx = getRowOverscanEndIdx(scrollDirection, rowVisibleEndIdx, rowsCount);
    const totalNumberColumns = columns.length;
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

  resetScrollStateAfterDelay() {
    this.clearScrollTimer();
    this.resetScrollStateTimeoutId = window.setTimeout(
      this.resetScrollStateAfterDelayCallback,
      500
    );
  }

  resetScrollStateAfterDelayCallback = () => {
    this.resetScrollStateTimeoutId = null;
    this.setState({ isScrolling: false });
  };

  updateScroll(scrollParams: ScrollParams) {
    this.resetScrollStateAfterDelay();
    const nextScrollState = this.getNextScrollState(scrollParams);
    this.setState(nextScrollState);
    return nextScrollState;
  }

  metricsUpdated = () => {
    if (!this.viewport.current) {
      return;
    }

    const { height } = this.viewport.current.getBoundingClientRect();

    if (height) {
      const { scrollTop, scrollLeft } = this.state;
      const { rowHeight, rowsCount } = this.props;
      this.updateScroll({
        scrollTop,
        scrollLeft,
        height,
        rowHeight,
        rowsCount
      });
    }
  };

  componentWillReceiveProps(nextProps: ViewportProps<R>) {
    const { rowHeight, rowsCount } = nextProps;
    if (this.props.rowHeight !== nextProps.rowHeight
      || this.props.minHeight !== nextProps.minHeight) {
      const { scrollTop, scrollLeft, height } = getGridState(nextProps);
      this.updateScroll({
        scrollTop,
        scrollLeft,
        height,
        rowHeight,
        rowsCount
      });
    } else if (this.props.columnMetrics.columns.length !== nextProps.columnMetrics.columns.length) {
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

  render() {
    return (
      <div
        className="rdg-viewport"
        style={{ top: this.props.rowOffsetHeight }}
        ref={this.viewport}
      >
        <Canvas<R>
          ref={this.canvas}
          rowKey={this.props.rowKey}
          totalWidth={this.props.totalWidth}
          width={this.props.columnMetrics.width}
          totalColumnWidth={this.props.columnMetrics.totalColumnWidth}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount}
          selectedRows={this.props.selectedRows}
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
          scrollToRowIndex={this.props.scrollToRowIndex}
          contextMenu={this.props.contextMenu}
          rowSelection={this.props.rowSelection}
          getSubRowDetails={this.props.getSubRowDetails}
          rowGroupRenderer={this.props.rowGroupRenderer}
          isScrolling={this.state.isScrolling}
          enableCellSelect={this.props.enableCellSelect}
          enableCellAutoFocus={this.props.enableCellAutoFocus}
          cellNavigationMode={this.props.cellNavigationMode}
          eventBus={this.props.eventBus}
          RowsContainer={this.props.RowsContainer}
          editorPortalTarget={this.props.editorPortalTarget}
          interactionMasksMetaData={this.props.interactionMasksMetaData}
        />
      </div>
    );
  }
}
