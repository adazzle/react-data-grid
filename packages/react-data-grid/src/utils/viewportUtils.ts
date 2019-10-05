import { SCROLL_DIRECTION } from '../common/enums';
import { CalculatedColumn, ScrollPosition, ColumnMetrics } from '../common/types';

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
    if (idx >= colVisibleStartIdx) {
      width -= column.width;
      if (width >= 0) {
        count++;
      }
    }
  });

  return count;
}

export interface VerticalRangeToRenderParams {
  height: number;
  rowHeight: number;
  scrollTop: number;
  rowsCount: number;
  scrollDirection: SCROLL_DIRECTION;
  overscanRowCount?: number;
}

export interface VerticalRangeToRender {
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
}

export function getVerticalRangeToRender({
  height,
  rowHeight,
  scrollTop,
  rowsCount,
  scrollDirection,
  overscanRowCount = 2
}: VerticalRangeToRenderParams): VerticalRangeToRender {
  const rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
  const rowVisibleEndIdx = Math.min(rowsCount - 1, Math.floor((scrollTop + height) / rowHeight));
  const rowOverscanStartIdx = Math.max(0, rowVisibleStartIdx - (scrollDirection === SCROLL_DIRECTION.UP ? overscanRowCount : 2));
  const rowOverscanEndIdx = Math.min(rowsCount - 1, rowVisibleEndIdx + (scrollDirection === SCROLL_DIRECTION.DOWN ? overscanRowCount : 2));

  return { rowOverscanStartIdx, rowOverscanEndIdx };
}

export interface HorizontalRangeToRender {
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
}

export interface HorizontalRangeToRenderParams<R> {
  columnMetrics: ColumnMetrics<R>;
  scrollLeft: number;
  scrollDirection: SCROLL_DIRECTION;
  overscanColumnCount?: number;
}

export function getHorizontalRangeToRender<R>({
  columnMetrics,
  scrollLeft,
  scrollDirection,
  overscanColumnCount = 2
}: HorizontalRangeToRenderParams<R>): HorizontalRangeToRender {
  const { columns, totalColumnWidth, lastFrozenColumnIndex } = columnMetrics;
  let { viewportWidth } = columnMetrics;

  let remainingScroll = scrollLeft;
  let columnIndex = lastFrozenColumnIndex;
  let hiddenColumnsWidth = 0;
  while (remainingScroll >= 0 && columnIndex < columns.length) {
    columnIndex++;
    const column = columns[columnIndex];
    remainingScroll -= column.width;
    if (remainingScroll >= 0) {
      hiddenColumnsWidth += column.width;
    }
  }
  const colVisibleStartIdx = Math.max(columnIndex, 0);
  const firstVisibleColumnHiddenWidth = scrollLeft - hiddenColumnsWidth;

  const totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns, lastFrozenColumnIndex);
  viewportWidth = viewportWidth > 0 ? viewportWidth + firstVisibleColumnHiddenWidth : totalColumnWidth;
  const availableWidth = viewportWidth - totalFrozenColumnWidth;
  const nonFrozenRenderedColumnCount = getColumnCountForWidth(columns, availableWidth, colVisibleStartIdx);
  const colVisibleEndIdx = Math.min(columns.length, colVisibleStartIdx + nonFrozenRenderedColumnCount);
  const colOverscanStartIdx = Math.max(0, colVisibleStartIdx - (scrollDirection === SCROLL_DIRECTION.LEFT ? overscanColumnCount : 2));
  const colOverscanEndIdx = Math.min(columns.length, colVisibleEndIdx + (scrollDirection === SCROLL_DIRECTION.RIGHT ? overscanColumnCount : 2));

  return { colVisibleStartIdx, colVisibleEndIdx, colOverscanStartIdx, colOverscanEndIdx };
}

export function getScrollDirection(prevScroll: ScrollPosition, nextScroll: ScrollPosition): SCROLL_DIRECTION {
  if (nextScroll.scrollTop > prevScroll.scrollTop) return SCROLL_DIRECTION.DOWN;
  if (nextScroll.scrollTop < prevScroll.scrollTop) return SCROLL_DIRECTION.UP;
  if (nextScroll.scrollLeft > prevScroll.scrollLeft) return SCROLL_DIRECTION.RIGHT;
  if (nextScroll.scrollLeft < prevScroll.scrollLeft) return SCROLL_DIRECTION.LEFT;
  return SCROLL_DIRECTION.NONE;
}
