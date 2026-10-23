import { useCallback, useMemo } from 'react';

import {
  getColSpan,
  getViewportColSpanArgs,
  getViewportColumns,
  getViewportColumnsWithColSpan,
  min
} from '../utils';
import type { CalculatedColumn, IterateOverViewportColumnsForRow, Maybe } from '../types';

interface ViewportColumnsArgs<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  colSpanColumns: readonly CalculatedColumn<R, SR>[];
  rows: readonly R[];
  topSummaryRows: Maybe<readonly SR[]>;
  bottomSummaryRows: Maybe<readonly SR[]>;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  lastStartFrozenColumnIndex: number;
  firstEndFrozenColumnIndex: number;
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
}

export function useViewportColumns<R, SR>({
  columns,
  colSpanColumns,
  rows,
  topSummaryRows,
  bottomSummaryRows,
  colOverscanStartIdx,
  colOverscanEndIdx,
  lastStartFrozenColumnIndex,
  firstEndFrozenColumnIndex,
  rowOverscanStartIdx,
  rowOverscanEndIdx
}: ViewportColumnsArgs<R, SR>) {
  // find the column that spans over a column within the visible columns range and adjust colOverscanStartIdx
  const startIdx = useMemo(() => {
    if (colOverscanStartIdx === 0 || colSpanColumns.length === 0) return colOverscanStartIdx;

    const colSpanArgs = getViewportColSpanArgs(
      rows,
      topSummaryRows,
      bottomSummaryRows,
      rowOverscanStartIdx,
      rowOverscanEndIdx
    );

    for (const column of colSpanColumns) {
      if (column.frozen) continue;
      const colIdx = column.idx;
      if (colIdx >= colOverscanStartIdx) break;

      for (const args of colSpanArgs) {
        const colSpan = getColSpan(
          column,
          lastStartFrozenColumnIndex,
          firstEndFrozenColumnIndex,
          args
        );

        if (colSpan !== undefined && colIdx + colSpan > colOverscanStartIdx) {
          return colIdx;
        }
      }
    }

    return colOverscanStartIdx;
  }, [
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    topSummaryRows,
    bottomSummaryRows,
    colOverscanStartIdx,
    lastStartFrozenColumnIndex,
    firstEndFrozenColumnIndex,
    colSpanColumns
  ]);

  // Effective inclusive upper bound for overscan in the unfrozen band.
  // When end-frozen columns exist, the unfrozen band ends just before them.
  const effectiveOverscanEndIdx =
    firstEndFrozenColumnIndex > -1
      ? min(colOverscanEndIdx, firstEndFrozenColumnIndex - 1)
      : colOverscanEndIdx;

  // the columns of the rows without an active cell, shared by all of them
  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    return getViewportColumns(
      columns,
      lastStartFrozenColumnIndex,
      firstEndFrozenColumnIndex,
      startIdx,
      effectiveOverscanEndIdx,
      -1
    );
  }, [
    columns,
    lastStartFrozenColumnIndex,
    firstEndFrozenColumnIndex,
    startIdx,
    effectiveOverscanEndIdx
  ]);

  const iterateOverViewportColumnsForRow = useCallback<IterateOverViewportColumnsForRow<R, SR>>(
    (activeColumnIdx = -1, args) => {
      const rowColumns =
        activeColumnIdx === -1
          ? viewportColumns
          : getViewportColumns(
              columns,
              lastStartFrozenColumnIndex,
              firstEndFrozenColumnIndex,
              startIdx,
              effectiveOverscanEndIdx,
              activeColumnIdx
            );

      return getViewportColumnsWithColSpan(
        rowColumns,
        activeColumnIdx,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        args
      ).values();
    },
    [
      viewportColumns,
      columns,
      lastStartFrozenColumnIndex,
      firstEndFrozenColumnIndex,
      startIdx,
      effectiveOverscanEndIdx
    ]
  );

  const iterateOverViewportColumnsForRowOutsideOfViewport = useCallback<
    IterateOverViewportColumnsForRow<R, SR>
  >(
    (activeColumnIdx = -1, args) => {
      const rowColumns =
        activeColumnIdx >= 0 && activeColumnIdx < columns.length ? [columns[activeColumnIdx]] : [];

      return getViewportColumnsWithColSpan(
        rowColumns,
        activeColumnIdx,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        args
      ).values();
    },
    [columns, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex]
  );

  return {
    viewportColumns,
    iterateOverViewportColumnsForRow,
    iterateOverViewportColumnsForRowOutsideOfViewport
  } as const;
}
