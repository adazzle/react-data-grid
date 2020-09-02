import { useMemo } from 'react';

import { CalculatedColumn, Column } from '../types';
import { getColumnMetrics } from '../utils';
import { DataGridProps } from '../DataGrid';
import { ValueFormatter } from '../formatters';

type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>,
  | 'defaultColumnOptions'
  | 'rowGrouper'
>;

interface ViewportColumnsArgs<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  rawColumns: readonly Column<R, SR>[];
  rawGroupBy?: readonly string[];
  viewportWidth: number;
  scrollLeft: number;
  columnWidths: ReadonlyMap<string, number>;
}

export function useViewportColumns<R, K extends keyof R, SR>({
  rawColumns,
  columnWidths,
  viewportWidth,
  scrollLeft,
  defaultColumnOptions,
  rawGroupBy,
  rowGrouper
}: ViewportColumnsArgs<R, K, SR>) {
  const minColumnWidth = defaultColumnOptions?.minWidth ?? 80;
  const defaultFormatter = defaultColumnOptions?.formatter ?? ValueFormatter;
  const defaultSortable = defaultColumnOptions?.sortable ?? false;
  const defaultResizable = defaultColumnOptions?.resizable ?? false;

  const { columns, lastFrozenColumnIndex, totalColumnWidth, totalFrozenColumnWidth, groupBy } = useMemo(() => {
    return getColumnMetrics<R, SR>({
      rawColumns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultSortable,
      defaultResizable,
      defaultFormatter,
      rawGroupBy: rowGrouper ? rawGroupBy : undefined
    });
  }, [columnWidths, defaultFormatter, defaultResizable, defaultSortable, minColumnWidth, rawColumns, rawGroupBy, rowGrouper, viewportWidth]);

  const [colOverscanStartIdx, colOverscanEndIdx] = useMemo((): [number, number] => {
    // get the viewport's left side and right side positions for non-frozen columns
    const viewportLeft = scrollLeft + totalFrozenColumnWidth;
    const viewportRight = scrollLeft + viewportWidth;
    // get first and last non-frozen column indexes
    const lastColIdx = columns.length - 1;
    const firstUnfrozenColumnIdx = Math.min(lastFrozenColumnIndex + 1, lastColIdx);

    // skip rendering non-frozen columns if the frozen columns cover the entire viewport
    if (viewportLeft >= viewportRight) {
      return [firstUnfrozenColumnIdx, firstUnfrozenColumnIdx];
    }

    // get the first visible non-frozen column index
    let colVisibleStartIdx = firstUnfrozenColumnIdx;
    while (colVisibleStartIdx < lastColIdx) {
      const { left, width } = columns[colVisibleStartIdx];
      // if the right side of the columnn is beyond the left side of the available viewport,
      // then it is the first column that's at least partially visible
      if (left + width > viewportLeft) {
        break;
      }
      colVisibleStartIdx++;
    }

    // get the last visible non-frozen column index
    let colVisibleEndIdx = colVisibleStartIdx;
    while (colVisibleEndIdx < lastColIdx) {
      const { left, width } = columns[colVisibleEndIdx];
      // if the right side of the column is beyond or equal to the right side of the available viewport,
      // then it the last column that's at least partially visible, as the previous column's right side is not beyond the viewport.
      if (left + width >= viewportRight) {
        break;
      }
      colVisibleEndIdx++;
    }

    const colOverscanStartIdx = Math.max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
    const colOverscanEndIdx = Math.min(lastColIdx, colVisibleEndIdx + 1);

    return [colOverscanStartIdx, colOverscanEndIdx];
  }, [columns, lastFrozenColumnIndex, scrollLeft, totalFrozenColumnWidth, viewportWidth]);

  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    const viewportColumns: CalculatedColumn<R, SR>[] = [];
    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];

      if (colIdx < colOverscanStartIdx && !column.frozen) continue;
      viewportColumns.push(column);
    }

    return viewportColumns;
  }, [colOverscanEndIdx, colOverscanStartIdx, columns]);

  return { columns, viewportColumns, totalColumnWidth, lastFrozenColumnIndex, totalFrozenColumnWidth, groupBy };
}
