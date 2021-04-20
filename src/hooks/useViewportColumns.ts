import { useMemo } from 'react';

import { getColSpan } from '../utils';
import type { CalculatedColumn, GroupRow } from '../types';

interface ViewportColumnsArgs<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  rows: readonly (R | GroupRow<R>)[];
  summaryRows: readonly SR[] | undefined;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
}

export function useViewportColumns<R, SR>({
  columns,
  rows,
  summaryRows,
  colOverscanStartIdx,
  colOverscanEndIdx,
  rowOverscanStartIdx,
  rowOverscanEndIdx,
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

    for (let colIdx = 0; colIdx < colOverscanStartIdx; colIdx++) {
      // check header
      const column = columns[colIdx];
      const colSpan = getColSpan(column, columns, { type: 'HEADER' });
      updateStartIdx(colIdx, colSpan);

      // check viewport
      for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
        const row = rows[rowIdx];
        if (isGroupRow(row)) continue;
        const column = columns[colIdx];
        const colSpan = getColSpan(column, columns, { type: 'ROW', row });
        updateStartIdx(colIdx, colSpan);
      }

      // check summary rows
      if (summaryRows) {
        for (const row of summaryRows) {
          const column = columns[colIdx];
          const colSpan = getColSpan(column, columns, { type: 'SUMMARY', row });
          updateStartIdx(colIdx, colSpan);
        }
      }
    }

    return startIdx;
  }, [colOverscanStartIdx, columns, isGroupRow, rowOverscanEndIdx, rowOverscanStartIdx, rows, summaryRows]);

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
