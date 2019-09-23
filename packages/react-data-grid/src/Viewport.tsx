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
| 'onViewportKeydown'
| 'onViewportKeyup'
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
  const [scrollState, setScrollState] = useState<ScrollState | null>(null);
  const [isScrolling, setIsScrolling] = useState<boolean | undefined>(undefined);

  const canvasHeight = minHeight - rowOffsetHeight;

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

    let previousScrollPosition: ScrollPosition | undefined;
    if (scrollState !== null) {
      previousScrollPosition = {
        scrollLeft: scrollState.scrollLeft,
        scrollTop: scrollState.scrollTop
      };
    }

    const scrollDirection = getScrollDirection(previousScrollPosition, { scrollLeft, scrollTop });
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
        columnMetrics,
        scrollLeft,
        viewportWidth: getDOMNodeOffsetWidth(),
        scrollDirection,
        overscanColumnCount
      })
    };

    setScrollState(nextScrollState);
    handleScroll(nextScrollState);
  }

  useEffect(() => {
    const scrollDirection = SCROLL_DIRECTION.NONE;
    setScrollState(prevScrollState => {
      const scrollTop = prevScrollState ? prevScrollState.scrollTop : 0;
      const scrollLeft = prevScrollState ? prevScrollState.scrollLeft : 0;

      return {
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
          columnMetrics,
          scrollLeft,
          viewportWidth: getDOMNodeOffsetWidth(),
          scrollDirection,
          overscanColumnCount
        })
      };
    });
  }, [canvasHeight, columnMetrics, overscanColumnCount, overscanRowCount, rowHeight, rowsCount]);

  return (
    <div
      ref={viewport}
      onKeyDown={props.onViewportKeydown}
      onKeyUp={props.onViewportKeyup}
    >
      {scrollState && (
        <Canvas<R>
          ref={canvas}
          rowKey={props.rowKey}
          width={columnMetrics.width}
          totalColumnWidth={columnMetrics.totalColumnWidth}
          columns={columnMetrics.columns}
          lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
          rowGetter={props.rowGetter}
          rowsCount={rowsCount}
          selectedRows={props.selectedRows}
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
      )}
    </div>
  );
}
