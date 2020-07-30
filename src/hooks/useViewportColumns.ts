import { useMemo } from 'react';

import { CalculatedColumn } from '../types';
import { getColumnMetrics, getHorizontalRangeToRender, getViewportColumns } from '../utils';
import { DataGridProps } from '../DataGrid';

type SharedDataGridProps<R, K extends keyof R, SR> =
  Pick<DataGridProps<R, K, SR>, 'columns'> &
  Required<Required<Pick<DataGridProps<R, K, SR>, | 'minColumnWidth' | 'defaultFormatter'>>>;

interface ViewportColumnsArgs<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  viewportWidth: number;
  scrollLeft: number;
  columnWidths: ReadonlyMap<string, number>;
  groupBy?: string;
}

export function useViewportColumns<R, K extends keyof R, SR>({
  columns: rawColumns,
  minColumnWidth,
  columnWidths,
  viewportWidth,
  defaultFormatter,
  scrollLeft,
  groupBy
}: ViewportColumnsArgs<R, K, SR>) {
  rawColumns = useMemo(() => {
    if (!groupBy) return rawColumns;
    // TODO: make it generic
    const selectColumn = rawColumns.find(c => c.key === 'select-row');
    const groupByColumn = rawColumns.find(c => c.key === groupBy);
    const remaningColumns = rawColumns.filter(c => c.key !== groupBy && c.key !== 'select-row');
    return [
      selectColumn!,
      { ...groupByColumn!, frozen: true },
      ...remaningColumns
    ];
  }, [groupBy, rawColumns]);

  const { columns, lastFrozenColumnIndex, totalColumnWidth } = useMemo(() => {
    return getColumnMetrics<R, SR>({
      columns: rawColumns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultFormatter
    });
  }, [columnWidths, rawColumns, defaultFormatter, minColumnWidth, viewportWidth]);

  const [colOverscanStartIdx, colOverscanEndIdx] = useMemo((): [number, number] => {
    return getHorizontalRangeToRender(
      columns,
      lastFrozenColumnIndex,
      viewportWidth,
      scrollLeft
    );
  }, [scrollLeft, columns, lastFrozenColumnIndex, viewportWidth]);

  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    return getViewportColumns(
      columns,
      colOverscanStartIdx,
      colOverscanEndIdx
    );
  }, [colOverscanEndIdx, colOverscanStartIdx, columns]);

  return { columns, viewportColumns, totalColumnWidth, lastFrozenColumnIndex };
}
