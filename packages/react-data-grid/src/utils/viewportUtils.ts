import { SCROLL_DIRECTION } from '../common/enums';
import { CalculatedColumn, ScrollPosition, ColumnMetrics } from '../common/types';

const { min, max, ceil, round } = Math;

function getTotalFrozenColumnWidth<R>(columns: CalculatedColumn<R>[], lastFrozenColumnIndex: number): number {
  if (lastFrozenColumnIndex === -1) {
    return 0;
  }
  const lastFrozenColumn = columns[lastFrozenColumnIndex];
  return lastFrozenColumn.left + lastFrozenColumn.width;
}

function getColumnCountForWidth<R>(columns: CalculatedColumn<R>[], initialWidth: number, colVisibleStartIdx: number): number {
  let width = initialWidth;
  let count = 0;

  columns.forEach((column, idx) => {
    if (idx! >= colVisibleStartIdx) {
      width -= column.width;
      if (width >= 0) {
        count++;
      }
    }
  });

  return count;
}

interface VerticalRangeToRenderParams {
  height: number;
  rowHeight: number;
  scrollTop: number;
  rowsCount: number;
  scrollDirection: SCROLL_DIRECTION;
  overscanRowCount?: number;
}

export function getVerticalRangeToRender({
  height,
  rowHeight,
  scrollTop,
  rowsCount,
  scrollDirection,
  overscanRowCount = 2
}: VerticalRangeToRenderParams) {
  const renderedRowsCount = ceil(height / rowHeight);
  const rowVisibleStartIdx = max(0, round(scrollTop / rowHeight));
  const rowVisibleEndIdx = min(rowsCount, rowVisibleStartIdx + renderedRowsCount);
  const rowOverscanStartIdx = max(0, rowVisibleStartIdx - (scrollDirection === SCROLL_DIRECTION.UP ? overscanRowCount : 2));
  const rowOverscanEndIdx = min(rowsCount, rowVisibleEndIdx + (scrollDirection === SCROLL_DIRECTION.DOWN ? overscanRowCount : 2));

  return { rowVisibleStartIdx, rowVisibleEndIdx, rowOverscanStartIdx, rowOverscanEndIdx };
}

interface HorizontalRangeToRenderParams<R> {
  columnMetrics: ColumnMetrics<R>;
  viewportWidth: number;
  scrollLeft: number;
  scrollDirection: SCROLL_DIRECTION;
  overscanColumnCount?: number;
}

export function getHorizontalRangeToRender<R>({
  columnMetrics,
  scrollLeft,
  viewportWidth,
  scrollDirection,
  overscanColumnCount = 2
}: HorizontalRangeToRenderParams<R>) {
  const { columns, totalColumnWidth, lastFrozenColumnIndex } = columnMetrics;

  let remainingScroll = scrollLeft;
  let columnIndex = lastFrozenColumnIndex;
  while (remainingScroll >= 0 && columnIndex < columns.length) {
    columnIndex++;
    const column = columns[columnIndex];
    remainingScroll -= column ? column.width : 0;
  }
  const colVisibleStartIdx = max(columnIndex, 0);

  const totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns, lastFrozenColumnIndex);
  viewportWidth = viewportWidth > 0 ? viewportWidth : totalColumnWidth;
  const availableWidth = viewportWidth - totalFrozenColumnWidth;
  const nonFrozenRenderedColumnCount = getColumnCountForWidth(columns, availableWidth, colVisibleStartIdx);
  const colVisibleEndIdx = min(columns.length, colVisibleStartIdx + nonFrozenRenderedColumnCount);
  const colOverscanStartIdx = max(0, colVisibleStartIdx - (scrollDirection === SCROLL_DIRECTION.LEFT ? overscanColumnCount : 2));
  const colOverscanEndIdx = min(columns.length, colVisibleEndIdx + (scrollDirection === SCROLL_DIRECTION.RIGHT ? overscanColumnCount : 2));

  return { colVisibleStartIdx, colVisibleEndIdx, colOverscanStartIdx, colOverscanEndIdx };
}

export function getScrollDirection(prevScroll: ScrollPosition | undefined, nextScroll: ScrollPosition): SCROLL_DIRECTION {
  if (prevScroll !== undefined) {
    if (nextScroll.scrollTop !== prevScroll.scrollTop) {
      return nextScroll.scrollTop - prevScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
    }
    if (nextScroll.scrollLeft !== prevScroll.scrollLeft) {
      return nextScroll.scrollLeft - prevScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
    }
  }
  return SCROLL_DIRECTION.NONE;
}
