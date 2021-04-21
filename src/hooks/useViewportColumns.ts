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
    let startIdx = colOverscanStartIdx;

    const updateStartIdx = (colIdx: number, colSpan: number | undefined) => {
      if (!colSpan) return;
      const newStartIdx = colIdx + colSpan;
      if (newStartIdx > colOverscanStartIdx && colIdx < startIdx) {
        startIdx = colIdx;
      }
    };

    for (const column of colSpanColumns) {
      // check header row
      const colIdx = column.idx;
      if (colIdx >= colOverscanStartIdx) break;
      updateStartIdx(colIdx, getColSpan(column, columns, { type: 'HEADER' }));

      // check filter row
      if (enableFilterRow) {
        updateStartIdx(colIdx, getColSpan(column, columns, { type: 'FILTER' }));
      }

      // check viewport rows
      for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
        const row = rows[rowIdx];
        if (isGroupRow(row)) continue;
        updateStartIdx(colIdx, getColSpan(column, columns, { type: 'ROW', row }));
      }

      // check summary rows
      if (summaryRows !== undefined) {
        for (const row of summaryRows) {
          updateStartIdx(colIdx, getColSpan(column, columns, { type: 'SUMMARY', row }));
        }
      }
    }

    return startIdx;
  }, [colOverscanStartIdx, colSpanColumns, columns, enableFilterRow, isGroupRow, rowOverscanEndIdx, rowOverscanStartIdx, rows, summaryRows]);

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
