import { isFrozen } from '../ColumnUtils';
import { SCROLL_DIRECTION } from '../common/enums';
import { CalculatedColumn, ColumnMetrics } from '../common/types';

export const OVERSCAN_ROWS = 2;

const { min, max, ceil, round } = Math;

export function getGridState<R>(props: { columnMetrics: ColumnMetrics<R>; rowsCount: number; minHeight: number; rowHeight: number; rowOffsetHeight: number }) {
  const totalNumberColumns = props.columnMetrics.columns.length;
  const canvasHeight = props.minHeight - props.rowOffsetHeight;
  const renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
  const rowOverscanEndIdx = min(props.rowsCount, renderedRowsCount * 2);

  return {
    rowOverscanStartIdx: 0,
    rowOverscanEndIdx,
    rowVisibleStartIdx: 0,
    rowVisibleEndIdx: renderedRowsCount,
    height: canvasHeight,
    scrollTop: 0,
    scrollLeft: 0,
    colVisibleStartIdx: 0,
    colVisibleEndIdx: totalNumberColumns,
    colOverscanStartIdx: 0,
    colOverscanEndIdx: totalNumberColumns,
    isScrolling: false,
    lastFrozenColumnIndex: 0
  };
}

export function findLastFrozenColumnIndex<R>(columns: CalculatedColumn<R>[]): number {
  return columns.findIndex(c => isFrozen(c));
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

export function getNonFrozenVisibleColStartIdx<R>(columns: CalculatedColumn<R>[], scrollLeft: number): number {
  let remainingScroll = scrollLeft;
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
  const nonFrozenColumns = columns.slice(lastFrozenColumnIndex + 1);
  let columnIndex = lastFrozenColumnIndex;
  while (remainingScroll >= 0 && columnIndex < nonFrozenColumns.length) {
    columnIndex++;
    const column = columns[columnIndex];
    remainingScroll -= column ? column.width : 0;
  }
  return max(columnIndex, 0);
}

export function getNonFrozenRenderedColumnCount<R>(columnMetrics: ColumnMetrics<R>, viewportDomWidth: number, scrollLeft: number): number {
  const { columns, totalColumnWidth } = columnMetrics;
  if (columns.length === 0) {
    return 0;
  }
  const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(columns, scrollLeft);
  const totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns);
  const viewportWidth = viewportDomWidth > 0 ? viewportDomWidth : totalColumnWidth;
  const firstColumn = columns[colVisibleStartIdx];
  // calculate the portion width of first column hidden behind frozen columns
  const scrolledFrozenWidth = totalFrozenColumnWidth + scrollLeft;
  const firstColumnHiddenWidth = scrolledFrozenWidth > firstColumn.left ? scrolledFrozenWidth - firstColumn.left : 0;
  const initialWidth = viewportWidth - totalFrozenColumnWidth + firstColumnHiddenWidth;
  return getColumnCountForWidth(columns, initialWidth, colVisibleStartIdx);
}

export interface VisibleBoundaries {
  rowVisibleStartIdx: number;
  rowVisibleEndIdx: number;
}

export function getVisibleBoundaries(gridHeight: number, rowHeight: number, scrollTop: number, rowsCount: number): VisibleBoundaries {
  const renderedRowsCount = ceil(gridHeight / rowHeight);
  const rowVisibleStartIdx = max(0, round(scrollTop / rowHeight));
  const rowVisibleEndIdx = min(rowVisibleStartIdx + renderedRowsCount, rowsCount);
  return { rowVisibleStartIdx, rowVisibleEndIdx };
}

interface ScrollState {
  scrollTop?: number;
  scrollLeft?: number;
}

export function getScrollDirection(lastScroll: ScrollState, scrollTop: number, scrollLeft: number): SCROLL_DIRECTION {
  if (scrollTop !== lastScroll.scrollTop && lastScroll.scrollTop !== undefined) {
    return scrollTop - lastScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
  }
  if (scrollLeft !== lastScroll.scrollLeft && lastScroll.scrollLeft !== undefined) {
    return scrollLeft - lastScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
  }
  return SCROLL_DIRECTION.NONE;
}

export function getRowOverscanStartIdx(scrollDirection: SCROLL_DIRECTION, rowVisibleStartIdx: number): number {
  return scrollDirection === SCROLL_DIRECTION.UP ? max(0, rowVisibleStartIdx - OVERSCAN_ROWS) : max(0, rowVisibleStartIdx);
}

export function getRowOverscanEndIdx(scrollDirection: SCROLL_DIRECTION, rowVisibleEndIdx: number, rowsCount: number): number {
  if (scrollDirection === SCROLL_DIRECTION.DOWN) {
    const overscanBoundaryIdx = rowVisibleEndIdx + OVERSCAN_ROWS;
    return min(overscanBoundaryIdx, rowsCount);
  }
  return rowVisibleEndIdx;
}

export function getColOverscanStartIdx(scrollDirection: SCROLL_DIRECTION, colVisibleStartIdx: number, lastFrozenColumnIdx: number): number {
  if (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) {
    return lastFrozenColumnIdx > -1 ? lastFrozenColumnIdx + 1 : 0;
  }
  return colVisibleStartIdx;
}

export function getColOverscanEndIdx(scrollDirection: SCROLL_DIRECTION, colVisibleEndIdx: number, totalNumberColumns: number): number {
  if (scrollDirection === SCROLL_DIRECTION.DOWN || scrollDirection === SCROLL_DIRECTION.UP) {
    return colVisibleEndIdx;
  }
  return totalNumberColumns;
}
