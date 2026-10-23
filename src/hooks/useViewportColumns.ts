import { useCallback, useMemo } from 'react';

import { getColSpan, getViewportColumns, mapColumnsWithColSpan, min } from '../utils';
import type { CalculatedColumn, ColSpanArgs, MapViewportColumns, Maybe } from '../types';

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
    // only the unfrozen columns before the range can span over a column within it
    const candidateColumns = colSpanColumns.filter(
      (column) => !column.frozen && column.idx < colOverscanStartIdx
    );
    if (candidateColumns.length === 0) return colOverscanStartIdx;

    const colSpanArgs = getRenderedRowsColSpanArgs(
      rows,
      topSummaryRows,
      bottomSummaryRows,
      rowOverscanStartIdx,
      rowOverscanEndIdx
    );

    for (const column of candidateColumns) {
      const colIdx = column.idx;

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

  const mapViewportColumns = useCallback<MapViewportColumns<R, SR>>(
    (activeColumnIdx = -1, colSpanArgs, callback) => {
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

      return mapColumnsWithColSpan(
        rowColumns,
        activeColumnIdx,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        colSpanArgs,
        callback
      );
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

  const mapViewportColumnsOutsideOfViewport = useCallback<MapViewportColumns<R, SR>>(
    (activeColumnIdx = -1, colSpanArgs, callback) => {
      if (activeColumnIdx < 0 || activeColumnIdx >= columns.length) return [];

      return mapColumnsWithColSpan(
        [columns[activeColumnIdx]],
        activeColumnIdx,
        lastStartFrozenColumnIndex,
        firstEndFrozenColumnIndex,
        colSpanArgs,
        callback
      );
    },
    [columns, lastStartFrozenColumnIndex, firstEndFrozenColumnIndex]
  );

  return {
    viewportColumns,
    mapViewportColumns,
    mapViewportColumnsOutsideOfViewport
  } as const;
}

// the colSpan args of the header row, the summary rows, and the rows in the overscan range
function getRenderedRowsColSpanArgs<R, SR>(
  rows: readonly R[],
  topSummaryRows: Maybe<readonly SR[]>,
  bottomSummaryRows: Maybe<readonly SR[]>,
  rowOverscanStartIdx: number,
  rowOverscanEndIdx: number
): ColSpanArgs<R, SR>[] {
  const colSpanArgs: ColSpanArgs<R, SR>[] = [{ type: 'HEADER' }];

  if (topSummaryRows != null) {
    for (const row of topSummaryRows) {
      colSpanArgs.push({ type: 'SUMMARY', row });
    }
  }

  for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
    colSpanArgs.push({ type: 'ROW', row: rows[rowIdx] });
  }

  if (bottomSummaryRows != null) {
    for (const row of bottomSummaryRows) {
      colSpanArgs.push({ type: 'SUMMARY', row });
    }
  }

  return colSpanArgs;
}
