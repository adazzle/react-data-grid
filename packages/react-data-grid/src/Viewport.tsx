import React, { useMemo, useRef, useState } from 'react';
import Canvas from './Canvas';
import { SCROLL_DIRECTION } from './common/enums';
import { RowRenderer, RowRendererProps, ScrollPosition } from './common/types';
import { GridProps } from './Grid';
import { getHorizontalRangeToRender, getScrollDirection, getVerticalRangeToRender } from './utils/viewportUtils';

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
  scrollLeft: number;
  setScrollLeft(scrollLeft: number): void;
  viewportWidth: number;
}

export default function Viewport<R>({
  minHeight,
  rowHeight,
  rowOffsetHeight,
  rowsCount,
  columnMetrics,
  overscanRowCount,
  overscanColumnCount,
  enableIsScrolling,
  viewportWidth,
  scrollLeft,
  setScrollLeft,
  ...props
}: ViewportProps<R>) {
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  // const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTION.NONE);
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

  function onVerticalScroll({ scrollLeft: newScrollLeft, scrollTop: newScrollTop }: ScrollPosition) {
    if (enableIsScrolling) {
      setIsScrolling(true);
      resetScrollStateAfterDelay();
    }

    const newScrollDirection = getScrollDirection({ scrollLeft, scrollTop }, { scrollLeft: newScrollLeft, scrollTop: newScrollTop });
    setScrollLeft(newScrollLeft);
    setScrollTop(newScrollTop);
    setScrollDirection(newScrollDirection);
  }

  const canvasHeight = minHeight - rowOffsetHeight;

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

  const pinnedRowsRef = useRef<Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>>();

  if (!pinnedRowsRef.current) {
    pinnedRowsRef.current = new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>();
  }

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
        onScroll={onVerticalScroll}
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
