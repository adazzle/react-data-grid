import { useCallback, useMemo } from 'react';

import { getColSpan, min } from '../utils';
import {
  iterateOverColumns,
  iterateOverColumnsForRow,
  iterateOverColumnsForRowOutsideOfViewport,
  iterateOverRowsForColSpanArgs
} from '../utils/iterators';
import type {
  CalculatedColumn,
  IterateOverViewportColumns,
  IterateOverViewportColumnsForRow,
  Maybe
} from '../types';

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
    if (colOverscanStartIdx === 0) return 0;

    for (const column of colSpanColumns) {
      if (column.frozen) continue;
      const colIdx = column.idx;
      if (colIdx >= colOverscanStartIdx) break;

      for (const args of iterateOverRowsForColSpanArgs(
        rows,
        topSummaryRows,
        bottomSummaryRows,
        rowOverscanStartIdx,
        rowOverscanEndIdx
      )) {
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

  const iterateOverViewportColumns = useCallback<IterateOverViewportColumns<R, SR>>(
    (activeColumnIdx) =>
      iterateOverColumns(
        columns,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        startIdx,
        effectiveOverscanEndIdx,
        activeColumnIdx
      ),
    [
      startIdx,
      effectiveOverscanEndIdx,
      columns,
      lastStartFrozenColumnIndex,
      firstEndFrozenColumnIndex
    ]
  );

  const iterateOverViewportColumnsForRow = useCallback<IterateOverViewportColumnsForRow<R, SR>>(
    (activeColumnIdx = -1, args) =>
      iterateOverColumnsForRow(
        iterateOverViewportColumns(activeColumnIdx),
        activeColumnIdx,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        args
      ),
    [iterateOverViewportColumns, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex]
  );

  const iterateOverViewportColumnsForRowOutsideOfViewport = useCallback<
    IterateOverViewportColumnsForRow<R, SR>
  >(
    (activeColumnIdx = -1, args) =>
      iterateOverColumnsForRowOutsideOfViewport(
        columns,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        activeColumnIdx,
        args
      ),
    [columns, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex]
  );

  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    return iterateOverViewportColumns(-1).toArray();
  }, [iterateOverViewportColumns]);

  return {
    viewportColumns,
    iterateOverViewportColumnsForRow,
    iterateOverViewportColumnsForRowOutsideOfViewport
  } as const;
}
