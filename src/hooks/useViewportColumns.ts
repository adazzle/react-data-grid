import { useMemo } from 'react';

import { CalculatedColumn, GroupRow } from '../types';
import { getColumnMetrics, getHorizontalRangeToRender, getViewportColumns } from '../utils';
import { DataGridProps } from '../DataGrid';
import { SELECT_COLUMN_KEY } from '../Columns';
import { ValueFormatter, ToggleGroupedFormatter } from '../formatters';

type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>,
  | 'columns'
  | 'defaultColumnOptions'
  | 'groupBy'
  | 'rowGrouper'
>;

interface ViewportColumnsArgs<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  viewportWidth: number;
  scrollLeft: number;
  columnWidths: ReadonlyMap<string, number>;
}

export function useViewportColumns<R, K extends keyof R, SR>({
  columns: rawColumns,
  columnWidths,
  viewportWidth,
  scrollLeft,
  defaultColumnOptions,
  groupBy: rawGroupBy,
  rowGrouper
}: ViewportColumnsArgs<R, K, SR>) {
  const [sortedColumns, groupBy] = useMemo(() => {
    if (!rawGroupBy || !rowGrouper) return [rawColumns, []];

    // Find valid groupBy columns
    const groupBy: readonly string[] = rawGroupBy.filter(g => rawColumns.find(c => c.key === g) !== undefined);
    if (groupBy.length === 0) return [rawColumns, groupBy];

    const selectColumn = rawColumns.find(c => c.key === SELECT_COLUMN_KEY);

    // Move group columns after the select column
    const groupByColumns = rawColumns
      .filter(c => groupBy.includes(c.key))
      .map((c, index) => ({
        ...c,
        frozen: true,
        rowGroup: true,
        groupFormatter: c.groupFormatter ?? ToggleGroupedFormatter,
        formatterOptions: {
          groupFocusable(row: GroupRow<R>) {
            return row.level === index;
          }
        }
      }))
      .sort((c1, c2) => groupBy.findIndex(k => k === c1.key) - groupBy.findIndex(k => k === c2.key));
    const remaningColumns = rawColumns.filter(c => !groupBy.includes(c.key) && c.key !== SELECT_COLUMN_KEY);
    const sortedColumns = [
      ...groupByColumns,
      ...remaningColumns
    ];

    if (selectColumn) {
      sortedColumns.unshift(selectColumn);
    }

    return [sortedColumns, groupBy];
  }, [rawColumns, rawGroupBy, rowGrouper]);

  const minColumnWidth = defaultColumnOptions?.minWidth ?? 80;
  const defaultFormatter = defaultColumnOptions?.formatter ?? ValueFormatter;
  const defaultSortable = defaultColumnOptions?.sortable ?? false;
  const defaultResizable = defaultColumnOptions?.resizable ?? false;

  const { columns, lastFrozenColumnIndex, totalColumnWidth } = useMemo(() => {
    return getColumnMetrics<R, SR>({
      columns: sortedColumns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultSortable,
      defaultResizable,
      defaultFormatter
    });
  }, [columnWidths, defaultFormatter, defaultResizable, defaultSortable, minColumnWidth, sortedColumns, viewportWidth]);

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

  return { columns, viewportColumns, totalColumnWidth, lastFrozenColumnIndex, groupBy };
}
