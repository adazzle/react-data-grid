import { CalculatedColumn, ColumnMetrics } from '../common/types';

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
}

export interface VerticalRangeToRender {
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
}

export function getVerticalRangeToRender({
  height,
  rowHeight,
  scrollTop,
  rowsCount
}: VerticalRangeToRenderParams): VerticalRangeToRender {
  const rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
  const rowVisibleEndIdx = Math.min(rowsCount - 1, Math.floor((scrollTop + height) / rowHeight));
  const rowOverscanStartIdx = Math.max(0, rowVisibleStartIdx - 2);
  const rowOverscanEndIdx = Math.min(rowsCount - 1, rowVisibleEndIdx + 2);

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
}

export function getHorizontalRangeToRender<R>({
  columnMetrics,
  scrollLeft
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
  const colOverscanStartIdx = Math.max(0, colVisibleStartIdx - 2);
  const colOverscanEndIdx = Math.min(columns.length, colVisibleEndIdx + 2);

  return { colVisibleStartIdx, colVisibleEndIdx, colOverscanStartIdx, colOverscanEndIdx };
}
