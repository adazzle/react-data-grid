import { isFrozen } from '../ColumnUtils';
import { SCROLL_DIRECTION } from '../common/enums';
import { CalculatedColumn } from '../common/types';

const { min, max, ceil, round } = Math;

function findLastIndex<T>(items: T[], predicate: (item: T) => boolean) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (predicate(items[i])) {
      return i;
    }
  }
  return -1;
}

export function findLastFrozenColumnIndex<R>(columns: CalculatedColumn<R>[]): number {
  return findLastIndex(columns, c => isFrozen(c));
}

function getTotalFrozenColumnWidth<R>(columns: CalculatedColumn<R>[]): number {
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
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
  const rowOverscanStartIdx = max(0, rowVisibleStartIdx - (scrollDirection === SCROLL_DIRECTION.UP ? overscanRowCount : 1));
  const rowOverscanEndIdx = min(rowsCount, rowVisibleEndIdx + (scrollDirection === SCROLL_DIRECTION.DOWN ? overscanRowCount : 1));

  return { rowVisibleStartIdx, rowVisibleEndIdx, rowOverscanStartIdx, rowOverscanEndIdx };
}

interface HorizontalRangeToRenderParams<R> {
  columns: CalculatedColumn<R>[];
  viewportWidth: number;
  totalColumnWidth: number;
  scrollLeft: number;
  scrollDirection: SCROLL_DIRECTION;
  overscanColumnCount?: number;
}

export function getHorizontalRangeToRender<R>({
  columns,
  scrollLeft,
  viewportWidth,
  totalColumnWidth,
  scrollDirection,
  overscanColumnCount = 2
}: HorizontalRangeToRenderParams<R>) {
  let remainingScroll = scrollLeft;
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
  let columnIndex = lastFrozenColumnIndex;
  while (remainingScroll >= 0 && columnIndex < columns.length) {
    columnIndex++;
    const column = columns[columnIndex];
    remainingScroll -= column ? column.width : 0;
  }
  const colVisibleStartIdx = max(columnIndex, 0);

  const totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns);
  viewportWidth = viewportWidth > 0 ? viewportWidth : totalColumnWidth;
  const availableWidth = viewportWidth - totalFrozenColumnWidth;
  const nonFrozenRenderedColumnCount = getColumnCountForWidth(columns, availableWidth, colVisibleStartIdx);
  const colVisibleEndIdx = min(columns.length, colVisibleStartIdx + nonFrozenRenderedColumnCount);
  const colOverscanStartIdx = max(0, colVisibleStartIdx - (scrollDirection === SCROLL_DIRECTION.LEFT ? overscanColumnCount : 1));
  const colOverscanEndIdx = min(columns.length, colVisibleEndIdx + (scrollDirection === SCROLL_DIRECTION.RIGHT ? overscanColumnCount : 1));

  return { colVisibleStartIdx, colVisibleEndIdx, lastFrozenColumnIndex, colOverscanStartIdx, colOverscanEndIdx };
}

interface ScrollState {
  scrollTop: number;
  scrollLeft: number;
}

export function getScrollDirection(prevScroll: ScrollState, nextScroll: ScrollState): SCROLL_DIRECTION {
  if (nextScroll.scrollTop !== prevScroll.scrollTop) {
    return nextScroll.scrollTop - prevScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
  }
  if (nextScroll.scrollLeft !== prevScroll.scrollLeft) {
    return nextScroll.scrollLeft - prevScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
  }
  return SCROLL_DIRECTION.NONE;
}
