import React, { useRef, useState, useEffect } from 'react';

import Canvas from './Canvas';
import { getVerticalRangeToRender, getHorizontalRangeToRender, getScrollDirection } from './utils/viewportUtils';
import { GridProps } from './Grid';
import { ScrollPosition } from './common/types';
import { SCROLL_DIRECTION } from './common/enums';

export interface ScrollState {
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
  lastFrozenColumnIndex: number;
  scrollDirection: SCROLL_DIRECTION;
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
| 'overscanRowCount'
| 'overscanColumnCount'
| 'useIsScrolling'
>;

export interface ViewportProps<R> extends SharedGridProps<R> {
  onScroll(scrollState: ScrollState): void;
}

export default function Viewport<R>({
  minHeight,
  rowHeight,
  rowOffsetHeight,
  rowsCount,
  onScroll: handleScroll,
  columnMetrics,
  overscanRowCount,
  overscanColumnCount,
  useIsScrolling,
  ...props
}: ViewportProps<R>) {
  const canvas = useRef<Canvas<R>>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const firstRender = useRef(true);

  const canvasHeight = minHeight - rowOffsetHeight;

  const [scrollState, setScrollState] = useState<ScrollState>(() => {
    return {
      scrollLeft: 0,
      scrollTop: 0,
      scrollDirection: SCROLL_DIRECTION.NONE,
      ...getVerticalRangeToRender({
        height: canvasHeight,
        rowHeight,
        scrollTop: 0,
        rowsCount,
        scrollDirection: SCROLL_DIRECTION.NONE,
        overscanRowCount
      }),
      ...getHorizontalRangeToRender({
        columns: columnMetrics.columns,
        scrollLeft: 0,
        viewportWidth: getDOMNodeOffsetWidth(),
        totalColumnWidth: columnMetrics.totalColumnWidth,
        scrollDirection: SCROLL_DIRECTION.NONE,
        overscanColumnCount
      })
    };
  });
  const [isScrolling, setIsScrolling] = useState<boolean | undefined>(undefined);

  function getDOMNodeOffsetWidth() {
    return viewport.current ? viewport.current.offsetWidth : 0;
  }

  function clearScrollTimer() {
    if (resetScrollStateTimeoutId.current !== null) {
      window.clearTimeout(resetScrollStateTimeoutId.current);
      resetScrollStateTimeoutId.current = null;
    }
  }

  function resetScrollStateAfterDelay() {
    clearScrollTimer();
    resetScrollStateTimeoutId.current = window.setTimeout(
      resetScrollStateAfterDelayCallback,
      150
    );
  }

  function resetScrollStateAfterDelayCallback() {
    resetScrollStateTimeoutId.current = null;
    setIsScrolling(false);
  }

  function onScroll({ scrollLeft, scrollTop }: ScrollPosition) {
    if (useIsScrolling) {
      setIsScrolling(true);
      resetScrollStateAfterDelay();
    }

    const scrollDirection = getScrollDirection(scrollState, { scrollLeft, scrollTop });
    const nextScrollState = {
      scrollLeft,
      scrollTop,
      scrollDirection,
      ...getVerticalRangeToRender({
        height: canvasHeight,
        rowHeight,
        scrollTop,
        rowsCount,
        scrollDirection,
        overscanRowCount
      }),
      ...getHorizontalRangeToRender({
        columns: columnMetrics.columns,
        scrollLeft,
        viewportWidth: getDOMNodeOffsetWidth(),
        totalColumnWidth: columnMetrics.totalColumnWidth,
        scrollDirection,
        overscanColumnCount
      })
    };

    setScrollState(nextScrollState);
    handleScroll(nextScrollState);
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const scrollDirection = SCROLL_DIRECTION.NONE;
    setScrollState(({ scrollTop, scrollLeft }) => ({
      scrollTop,
      scrollLeft,
      scrollDirection,
      ...getVerticalRangeToRender({
        height: canvasHeight,
        rowHeight,
        scrollTop,
        rowsCount,
        scrollDirection,
        overscanRowCount
      }),
      ...getHorizontalRangeToRender({
        columns: columnMetrics.columns,
        scrollLeft,
        viewportWidth: getDOMNodeOffsetWidth(),
        totalColumnWidth: columnMetrics.totalColumnWidth,
        scrollDirection,
        overscanColumnCount
      })
    }));
  }, [canvasHeight, columnMetrics.columns, columnMetrics.totalColumnWidth, overscanColumnCount, overscanRowCount, rowHeight, rowsCount]);

  return (
    <div
      className="rdg-viewport"
      style={{ top: rowOffsetHeight }}
      ref={viewport}
    >
      <Canvas<R>
        ref={canvas}
        rowKey={props.rowKey}
        totalWidth={props.totalWidth}
        width={columnMetrics.width}
        totalColumnWidth={columnMetrics.totalColumnWidth}
        rowGetter={props.rowGetter}
        rowsCount={rowsCount}
        selectedRows={props.selectedRows}
        columns={columnMetrics.columns}
        rowRenderer={props.rowRenderer}
        scrollTop={scrollState.scrollTop}
        scrollLeft={scrollState.scrollLeft}
        rowOverscanStartIdx={scrollState.rowOverscanStartIdx}
        rowOverscanEndIdx={scrollState.rowOverscanEndIdx}
        rowVisibleStartIdx={scrollState.rowVisibleStartIdx}
        rowVisibleEndIdx={scrollState.rowVisibleEndIdx}
        colVisibleStartIdx={scrollState.colVisibleStartIdx}
        colVisibleEndIdx={scrollState.colVisibleEndIdx}
        colOverscanStartIdx={scrollState.colOverscanStartIdx}
        colOverscanEndIdx={scrollState.colOverscanEndIdx}
        lastFrozenColumnIndex={scrollState.lastFrozenColumnIndex}
        cellMetaData={props.cellMetaData}
        height={canvasHeight}
        rowHeight={rowHeight}
        onScroll={onScroll}
        scrollToRowIndex={props.scrollToRowIndex}
        contextMenu={props.contextMenu}
        rowSelection={props.rowSelection}
        getSubRowDetails={props.getSubRowDetails}
        rowGroupRenderer={props.rowGroupRenderer}
        isScrolling={isScrolling}
        enableCellSelect={props.enableCellSelect}
        enableCellAutoFocus={props.enableCellAutoFocus}
        cellNavigationMode={props.cellNavigationMode}
        eventBus={props.eventBus}
        RowsContainer={props.RowsContainer}
        editorPortalTarget={props.editorPortalTarget}
        interactionMasksMetaData={props.interactionMasksMetaData}
      />
    </div>
  );
}
