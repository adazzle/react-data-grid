import type { CalculatedColumn, ColSpanArgs, Maybe, ViewportColumnWithColSpan } from '../types';
import { getColSpan } from './colSpanUtils';

// These functions build arrays with plain loops instead of using generators:
// iterating over generator objects is much slower, and React Compiler doesn't support `yield`

export function getViewportRowIndexes(
  activeRowIdx: number,
  activePositionIsInViewport: boolean,
  rowOverscanStartIdx: number,
  rowOverscanEndIdx: number
): number[] {
  const rowIndexes: number[] = [];

  if (activePositionIsInViewport && activeRowIdx < rowOverscanStartIdx) {
    rowIndexes.push(activeRowIdx);
  }
  for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
    rowIndexes.push(rowIdx);
  }
  if (activePositionIsInViewport && activeRowIdx > rowOverscanEndIdx) {
    rowIndexes.push(activeRowIdx);
  }

  return rowIndexes;
}

export function getViewportColSpanArgs<R, SR>(
  rows: readonly R[],
  topSummaryRows: Maybe<readonly SR[]>,
  bottomSummaryRows: Maybe<readonly SR[]>,
  rowOverscanStartIdx: number,
  rowOverscanEndIdx: number
): ColSpanArgs<R, SR>[] {
  // header row
  const colSpanArgs: ColSpanArgs<R, SR>[] = [{ type: 'HEADER' }];

  // top summary rows
  if (topSummaryRows != null) {
    for (const row of topSummaryRows) {
      colSpanArgs.push({ type: 'SUMMARY', row });
    }
  }

  // viewport rows
  for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
    colSpanArgs.push({ type: 'ROW', row: rows[rowIdx] });
  }

  // bottom summary rows
  if (bottomSummaryRows != null) {
    for (const row of bottomSummaryRows) {
      colSpanArgs.push({ type: 'SUMMARY', row });
    }
  }

  return colSpanArgs;
}

/**
 * Returns the columns to render, ordered by index:
 * start-frozen columns, the unfrozen columns in the overscan range, and end-frozen columns,
 * plus the active column when it is outside of the overscan range
 */
export function getViewportColumns<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  lastStartFrozenColumnIndex: number,
  firstEndFrozenColumnIndex: number,
  startIdx: number,
  effectiveOverscanEndIdx: number,
  activeColumnIdx: number
): CalculatedColumn<R, SR>[] {
  const viewportColumns: CalculatedColumn<R, SR>[] = [];

  for (let colIdx = 0; colIdx <= lastStartFrozenColumnIndex; colIdx++) {
    viewportColumns.push(columns[colIdx]);
  }

  const unfrozenLastIdx =
    firstEndFrozenColumnIndex > -1 ? firstEndFrozenColumnIndex - 1 : columns.length - 1;

  if (lastStartFrozenColumnIndex < unfrozenLastIdx) {
    if (activeColumnIdx > lastStartFrozenColumnIndex && activeColumnIdx < startIdx) {
      viewportColumns.push(columns[activeColumnIdx]);
    }

    for (let colIdx = startIdx; colIdx <= effectiveOverscanEndIdx; colIdx++) {
      viewportColumns.push(columns[colIdx]);
    }

    if (activeColumnIdx > effectiveOverscanEndIdx && activeColumnIdx <= unfrozenLastIdx) {
      viewportColumns.push(columns[activeColumnIdx]);
    }
  }

  // Always include the end-frozen tail (virtualization must keep these in the DOM)
  if (firstEndFrozenColumnIndex > -1) {
    for (let colIdx = firstEndFrozenColumnIndex; colIdx < columns.length; colIdx++) {
      viewportColumns.push(columns[colIdx]);
    }
  }

  return viewportColumns;
}

export function getViewportColumnsWithColSpan<R, SR>(
  viewportColumns: readonly CalculatedColumn<R, SR>[],
  activeColumnIdx: number,
  lastStartFrozenColumnIndex: number,
  firstEndFrozenColumnIndex: number,
  args: ColSpanArgs<R, SR> | undefined
): ViewportColumnWithColSpan<R, SR>[] {
  const viewportColumnsWithColSpan: ViewportColumnWithColSpan<R, SR>[] = [];
  // index of the first column after the previous cell, including the columns it spans
  let nextColumnIdx = 0;

  for (const column of viewportColumns) {
    // skip columns covered by colSpan.
    // The viewport columns are ordered by index, but there can be gaps between them,
    // so the skipped columns are counted by index, not by their position in the list
    if (column.idx < nextColumnIdx) continue;

    const colSpan =
      args && getColSpan(column, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex, args);
    viewportColumnsWithColSpan.push([column, column.idx === activeColumnIdx, colSpan]);
    nextColumnIdx = column.idx + (colSpan ?? 1);
  }

  return viewportColumnsWithColSpan;
}
