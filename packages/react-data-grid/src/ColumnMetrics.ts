export { sameColumn } from './ColumnComparer';
import { isFrozen } from './ColumnUtils';
import { getScrollbarSize } from './utils';
import { Column, CalculatedColumn, ColumnList, ColumnMetrics } from './common/types';

type Metrics<R> = Pick<ColumnMetrics<R>, 'totalWidth' | 'minColumnWidth'> & {
  columns: ColumnList<R>;
  columnWidths: Map<string, number>;
};

function toArray<R>(columns: ColumnList<R>): Column<R>[] {
  if (Array.isArray(columns)) {
    return columns;
  }
  return columns.toArray();
}

export function getColumnMetrics<R>(metrics: Metrics<R>): ColumnMetrics<R> {
  // clone columns so we can safely edit them:
  let left = 0;
  let totalWidth = 0;
  const columns: CalculatedColumn<R>[] = toArray(metrics.columns).map(column => {
    const width = metrics.columnWidths.get(column.key as string)!;
    const newColumn: CalculatedColumn<R> = {
      ...column,
      idx: 0,
      width,
      left
    };
    totalWidth += width;
    left += width;
    return newColumn;
  });

  const frozenColumns = columns.filter(c => isFrozen(c));
  const nonFrozenColumns = columns.filter(c => !isFrozen(c));
  const calculatedColumns = frozenColumns.concat(nonFrozenColumns);
  calculatedColumns.forEach((c, i) => c.idx = i);
  return {
    width: totalWidth,
    columns: calculatedColumns,
    lastFrozenColumnIndex: frozenColumns.length - 1,
    totalWidth: metrics.totalWidth,
    totalColumnWidth: totalWidth,
    minColumnWidth: metrics.minColumnWidth,
    columnWidths: metrics.columnWidths
  };
}

function getTotalColumnWidth2<R>(columns: Column<R>[], columnWidths: ReadonlyMap<string, number>): number {
  return columns.reduce((acc, c) => acc + (columnWidths.has(c.key as string) ? columnWidths.get(c.key as string)! : 0), 0);
}

function setColumnWidth<R>(
  column: Column<R>,
  columnWidths: Map<string, number>,
  minColumnWidth: number,
  width: number
): void {
  columnWidths.set(column.key as string, Math.max(width, minColumnWidth));
}

function setSpecifiedWidths<R>(
  columns: Column<R>[],
  columnWidths: Map<string, number>,
  viewportWidth: number,
  minColumnWidth: number
): void {
  for (const column of columns) {
    if (columnWidths.has(column.key as string)) continue;

    if (typeof column.width === 'number') {
      setColumnWidth(column, columnWidths, minColumnWidth, column.width);
    } else if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
      setColumnWidth(column, columnWidths, minColumnWidth, Math.floor(viewportWidth * column.width / 100));
    }
  }
}

function setRemainingWidths<R>(
  columns: Column<R>[],
  columnWidths: Map<string, number>,
  unallocatedWidth: number,
  minColumnWidth: number
) {
  const unassignedColumns = columns.filter(c => !columnWidths.has(c.key as string));
  const columnWidth = Math.floor(unallocatedWidth / unassignedColumns.length);

  for (const column of unassignedColumns) {
    setColumnWidth(column, columnWidths, minColumnWidth, columnWidth);
  }
}

export function calculateColumnWidths<R>(
  columns: ColumnList<R>,
  columnWidths: ReadonlyMap<string, number>,
  viewportWidth: number,
  minColumnWidth: number
): Map<string, number> {
  columns = toArray(columns);
  const newColumnWidths = new Map(columnWidths);
  setSpecifiedWidths(columns, newColumnWidths, viewportWidth, minColumnWidth);

  const allocatedWidths = getTotalColumnWidth2(columns, newColumnWidths);
  const unallocatedWidth = viewportWidth - allocatedWidths - getScrollbarSize();

  setRemainingWidths(columns, newColumnWidths, unallocatedWidth, minColumnWidth);
  return newColumnWidths;
}
