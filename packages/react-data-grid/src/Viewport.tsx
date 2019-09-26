import React, { useRef, useState, useMemo } from 'react';

import Canvas from './Canvas';
import { getVerticalRangeToRender, getHorizontalRangeToRender, getScrollDirection } from './utils/viewportUtils';
import { GridProps } from './Grid';
import { ScrollPosition } from './common/types';
import { SCROLL_DIRECTION } from './common/enums';

export interface ScrollState {
  scrollTop: number;
  scrollLeft: number;
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
| 'enableIsScrolling'
| 'onViewportKeydown'
| 'onViewportKeyup'
>;

export interface ViewportProps<R> extends SharedGridProps<R> {
  onScroll(scrollState: ScrollState): void;
  viewportWidth: number;
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
  enableIsScrolling,
  viewportWidth,
  ...props
}: ViewportProps<R>) {
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollLeft: 0,
    scrollTop: 0,
    scrollDirection: SCROLL_DIRECTION.NONE
  });
  const [isScrolling, setIsScrolling] = useState<boolean | undefined>(undefined);

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
    if (enableIsScrolling) {
      setIsScrolling(true);
      resetScrollStateAfterDelay();
    }

    const scrollDirection = getScrollDirection(scrollState, { scrollLeft, scrollTop });
    const newScrollState = { scrollLeft, scrollTop, scrollDirection };
    setScrollState(newScrollState);
    handleScroll(newScrollState);
  }

  const canvasHeight = minHeight - rowOffsetHeight;
  const { scrollLeft, scrollTop, scrollDirection } = scrollState;

  const verticalRangeToRender = useMemo(() => {
    return getVerticalRangeToRender({
      height: canvasHeight,
      rowHeight,
      scrollTop,
      rowsCount,
      scrollDirection,
      overscanRowCount
    });
  }, [canvasHeight, overscanRowCount, rowHeight, rowsCount, scrollDirection, scrollTop]);

  const horizontalRangeToRender = useMemo(() => {
    return getHorizontalRangeToRender({
      columnMetrics,
      scrollLeft,
      viewportWidth,
      scrollDirection,
      overscanColumnCount
    });
  }, [columnMetrics, overscanColumnCount, scrollDirection, scrollLeft, viewportWidth]);

  return (
    <div
      onKeyDown={props.onViewportKeydown}
      onKeyUp={props.onViewportKeyup}
    >
      <Canvas<R>
        {...verticalRangeToRender}
        {...horizontalRangeToRender}
        rowKey={props.rowKey}
        width={columnMetrics.width}
        totalColumnWidth={columnMetrics.totalColumnWidth}
        columns={columnMetrics.columns}
        lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
        rowGetter={props.rowGetter}
        rowsCount={rowsCount}
        selectedRows={props.selectedRows}
        rowRenderer={props.rowRenderer}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
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
