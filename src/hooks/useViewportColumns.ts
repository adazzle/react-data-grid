import { useMemo } from 'react';

import { getColSpan } from '../utils';
import type { CalculatedColumn, GroupRow } from '../types';

interface ViewportColumnsArgs<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  rows: readonly (R | GroupRow<R>)[];
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
}

export function useViewportColumns<R, SR>({ columns, colOverscanStartIdx, colOverscanEndIdx, rows, isGroupRow }: ViewportColumnsArgs<R, SR>) {
  return useMemo((): readonly CalculatedColumn<R, SR>[] => {
    let startIdx = colOverscanStartIdx;
    // find the column that spans over a column within the visible columns range and adjust colOverscanStartIdx
    for (const row of rows) {
      if (isGroupRow(row)) continue;
      for (let colIdx = 0; colIdx <= colOverscanStartIdx; colIdx++) {
        const column = columns[colIdx];
        const colSpan = getColSpan<R, SR>(column, columns, { type: 'ROW', row });
        if (!colSpan) continue;
        if ((colSpan + column.idx - 1) > startIdx) {
          startIdx = column.idx;
        }
      }
    }

    const viewportColumns: CalculatedColumn<R, SR>[] = [];
    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];

      if (colIdx < startIdx && !column.frozen) continue;
      viewportColumns.push(column);
    }

    return viewportColumns;
  }, [colOverscanEndIdx, colOverscanStartIdx, columns, isGroupRow, rows]);
}
