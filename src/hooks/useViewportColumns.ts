import { useMemo } from 'react';

import { getColSpan } from '../utils';
import type { CalculatedColumn, GroupRow } from '../types';

interface ViewportColumnsArgs<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  rows: readonly (R | GroupRow<R>)[];
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
}

export function useViewportColumns<R, SR>({
  columns,
  colOverscanStartIdx,
  colOverscanEndIdx,
  rowOverscanStartIdx,
  rowOverscanEndIdx,
  rows,
  isGroupRow
}: ViewportColumnsArgs<R, SR>) {
  const startIdx = useMemo(() => {
    let startIdx = colOverscanStartIdx;
    // find the column that spans over a column within the visible columns range and adjust colOverscanStartIdx
    for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
      const row = rows[rowIdx];
      if (isGroupRow(row)) continue;
      for (let colIdx = 0; colIdx < colOverscanStartIdx; colIdx++) {
        const column = columns[colIdx];
        const colSpan = getColSpan(column, columns, { type: 'ROW', row });
        if (!colSpan) continue;
        const newStartIdx = colIdx + colSpan;
        if (newStartIdx > colOverscanStartIdx && colIdx < startIdx) {
          startIdx = colIdx;
        }
      }
    }

    return startIdx;
  }, [colOverscanStartIdx, columns, isGroupRow, rowOverscanEndIdx, rowOverscanStartIdx, rows]);

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
