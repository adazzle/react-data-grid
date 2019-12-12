import { CalculatedColumn, ColumnMetrics } from '../common/types';

function getTotalFrozenColumnWidth<R>(columns: CalculatedColumn<R>[], lastFrozenColumnIndex: number): number {
  if (lastFrozenColumnIndex === -1) {
    return 0;
  }
  const lastFrozenColumn = columns[lastFrozenColumnIndex];
  return lastFrozenColumn.left + lastFrozenColumn.width;
}

export function getVerticalRangeToRender(
  height: number,
  rowHeight: number,
  scrollTop: number,
  rowsCount: number,
  renderBatchSize: number
) {
  const overscanThreshold = 4;
  const rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
  const rowVisibleEndIdx = Math.min(rowsCount - 1, Math.floor((scrollTop + height) / rowHeight));
  const rowOverscanStartIdx = Math.max(0, Math.floor((rowVisibleStartIdx - overscanThreshold) / renderBatchSize) * renderBatchSize);
  const rowOverscanEndIdx = Math.min(rowsCount - 1, Math.ceil((rowVisibleEndIdx + overscanThreshold) / renderBatchSize) * renderBatchSize);

  return [rowOverscanStartIdx, rowOverscanEndIdx] as const;
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
  const { columns, lastFrozenColumnIndex, viewportWidth } = columnMetrics;
  // get the viewport's left side and right side positions for non-frozen columns
  const totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns, lastFrozenColumnIndex);
  const viewportLeft = scrollLeft + totalFrozenColumnWidth;
  const viewportRight = scrollLeft + viewportWidth;
  // get first and last non-frozen column indexes
  const lastColIdx = columns.length - 1;
  const firstUnfrozenColumnIdx = Math.min(lastFrozenColumnIndex + 1, lastColIdx);

  // skip rendering non-frozen columns if the frozen columns cover the entire viewport
  if (viewportLeft >= viewportRight) {
    return {
      colVisibleStartIdx: firstUnfrozenColumnIdx,
      colVisibleEndIdx: firstUnfrozenColumnIdx,
      colOverscanStartIdx: firstUnfrozenColumnIdx,
      colOverscanEndIdx: firstUnfrozenColumnIdx
    };
  }

  // get the first visible non-frozen column index
  let colVisibleStartIdx = firstUnfrozenColumnIdx;
  while (colVisibleStartIdx < lastColIdx) {
    const { left, width } = columns[colVisibleStartIdx];
    // if the right side of the columnn is beyond the left side of the available viewport,
    // then it is the first column that's at least partially visible
    if (left + width > viewportLeft) {
      break;
    }
    colVisibleStartIdx++;
  }

  // get the last visible non-frozen column index
  let colVisibleEndIdx = colVisibleStartIdx;
  while (colVisibleEndIdx < lastColIdx) {
    const { left, width } = columns[colVisibleEndIdx];
    // if the right side of the column is beyond or equal to the right side of the available viewport,
    // then it the last column that's at least partially visible, as the previous column's right side is not beyond the viewport.
    if (left + width >= viewportRight) {
      break;
    }
    colVisibleEndIdx++;
  }

  const colOverscanStartIdx = Math.max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
  const colOverscanEndIdx = Math.min(lastColIdx, colVisibleEndIdx + 1);

  return { colVisibleStartIdx, colVisibleEndIdx, colOverscanStartIdx, colOverscanEndIdx };
}
