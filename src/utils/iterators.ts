import type { CalculatedColumn, ColSpanArgs, Maybe, ViewportColumnWithColSpan } from '../types';
import { getColSpan } from './colSpanUtils';

export function* iterateOverViewportRowIdx(
  activeRowIdx: number,
  activePositionIsInViewport: boolean,
  rowOverscanStartIdx: number,
  rowOverscanEndIdx: number
): Generator<number, void, void> {
  if (activePositionIsInViewport && activeRowIdx < rowOverscanStartIdx) {
    yield activeRowIdx;
  }
  for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
    yield rowIdx;
  }
  if (activePositionIsInViewport && activeRowIdx > rowOverscanEndIdx) {
    yield activeRowIdx;
  }
}

export function* iterateOverRowsForColSpanArgs<R, SR>(
  rows: readonly R[],
  topSummaryRows: Maybe<readonly SR[]>,
  bottomSummaryRows: Maybe<readonly SR[]>,
  rowOverscanStartIdx: number,
  rowOverscanEndIdx: number
): Generator<ColSpanArgs<R, SR>> {
  // check header row
  yield { type: 'HEADER' };

  // check top summary rows
  if (topSummaryRows != null) {
    for (const row of topSummaryRows) {
      yield { type: 'SUMMARY', row };
    }
  }

  // check viewport rows
  for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
    yield { type: 'ROW', row: rows[rowIdx] };
  }

  // check bottom summary rows
  if (bottomSummaryRows != null) {
    for (const row of bottomSummaryRows) {
      yield { type: 'SUMMARY', row };
    }
  }
}

export function* iterateOverColumns<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  lastStartFrozenColumnIndex: number,
  firstEndFrozenColumnIndex: number,
  startIdx: number,
  effectiveOverscanEndIdx: number,
  activeColumnIdx: number
): Generator<CalculatedColumn<R, SR>, void, void> {
  for (let colIdx = 0; colIdx <= lastStartFrozenColumnIndex; colIdx++) {
    yield columns[colIdx];
  }

  const unfrozenLastIdx =
    firstEndFrozenColumnIndex > -1 ? firstEndFrozenColumnIndex - 1 : columns.length - 1;

  if (lastStartFrozenColumnIndex < unfrozenLastIdx) {
    if (activeColumnIdx > lastStartFrozenColumnIndex && activeColumnIdx < startIdx) {
      yield columns[activeColumnIdx];
    }

    for (let colIdx = startIdx; colIdx <= effectiveOverscanEndIdx; colIdx++) {
      yield columns[colIdx];
    }

    if (activeColumnIdx > effectiveOverscanEndIdx && activeColumnIdx <= unfrozenLastIdx) {
      yield columns[activeColumnIdx];
    }
  }

  // Always yield end-frozen tail (virtualization must keep these in the DOM)
  if (firstEndFrozenColumnIndex > -1) {
    for (let colIdx = firstEndFrozenColumnIndex; colIdx < columns.length; colIdx++) {
      yield columns[colIdx];
    }
  }
}

export function* iterateOverColumnsForRow<R, SR>(
  iterator: IteratorObject<CalculatedColumn<R, SR>>,
  activeColumnIdx: number,
  lastStartFrozenColumnIndex: number,
  firstEndFrozenColumnIndex: number,
  args: ColSpanArgs<R, SR> | undefined
): Generator<ViewportColumnWithColSpan<R, SR>, void, void> {
  for (const column of iterator) {
    let colSpan =
      args && getColSpan(column, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex, args);

    yield [column, column.idx === activeColumnIdx, colSpan];

    // skip columns covered by colSpan
    while (colSpan !== undefined && colSpan > 1) {
      iterator.next();
      colSpan--;
    }
  }
}

export function* iterateOverColumnsForRowOutsideOfViewport<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  lastStartFrozenColumnIndex: number,
  firstEndFrozenColumnIndex: number,
  activeColumnIdx: number,
  args: ColSpanArgs<R, SR> | undefined
): Generator<ViewportColumnWithColSpan<R, SR>, void, void> {
  if (activeColumnIdx >= 0 && activeColumnIdx < columns.length) {
    const column = columns[activeColumnIdx];
    yield [
      column,
      true,
      args && getColSpan(column, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex, args)
    ];
  }
}
