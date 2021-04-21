import { useMemo } from 'react';

import { getColSpan } from '../utils';
import type { CalculatedColumn, GroupRow } from '../types';

interface ViewportColumnsArgs<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  colSpanColumns: readonly CalculatedColumn<R, SR>[];
  rows: readonly (R | GroupRow<R>)[];
  summaryRows: readonly SR[] | undefined;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  enableFilterRow: boolean;
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
}

export function useViewportColumns<R, SR>({
  columns,
  colSpanColumns,
  rows,
  summaryRows,
  colOverscanStartIdx,
  colOverscanEndIdx,
  rowOverscanStartIdx,
  rowOverscanEndIdx,
  enableFilterRow,
  isGroupRow
}: ViewportColumnsArgs<R, SR>) {
  // find the column that spans over a column within the visible columns range and adjust colOverscanStartIdx
  const startIdx = useMemo(() => {
    if (colOverscanStartIdx === 0) return 0;

    let startIdx = colOverscanStartIdx;

    const updateStartIdx = (colIdx: number, colSpan: number | undefined) => {
      if (!colSpan) return false;
      if ((colIdx + colSpan) > colOverscanStartIdx && colIdx < startIdx) {
        startIdx = colIdx;
        return true;
      }
      return false;
    };

    for (const column of colSpanColumns) {
      // check header row
      const colIdx = column.idx;
      if (colIdx >= startIdx) break;
      if (updateStartIdx(colIdx, getColSpan(column, columns, { type: 'HEADER' }))) break;

      // check filter row
      if (enableFilterRow && updateStartIdx(colIdx, getColSpan(column, columns, { type: 'FILTER' }))) break;

      // check viewport rows
      for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
        const row = rows[rowIdx];
        if (isGroupRow(row)) continue;
        if (updateStartIdx(colIdx, getColSpan(column, columns, { type: 'ROW', row }))) break;
      }

      // check summary rows
      if (summaryRows !== undefined) {
        for (const row of summaryRows) {
          if (updateStartIdx(colIdx, getColSpan(column, columns, { type: 'SUMMARY', row }))) break;
        }
      }
    }

    return startIdx;
  }, [rowOverscanStartIdx, rowOverscanEndIdx, rows, summaryRows, colOverscanStartIdx, columns, colSpanColumns, isGroupRow, enableFilterRow]);

  return useMemo((): readonly CalculatedColumn<R, SR>[] => {
    const viewportColumns: CalculatedColumn<R, SR>[] = [];
    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];

      if (colIdx < startIdx && !column.frozen) continue;
      viewportColumns.push(column);
    }

    return viewportColumns;
  }, [startIdx, colOverscanEndIdx, columns]);
}
