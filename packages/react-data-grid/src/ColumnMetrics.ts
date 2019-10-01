export { sameColumn } from './ColumnComparer';
import { isFrozen } from './ColumnUtils';
import { getScrollbarSize } from './utils';
import { Column, CalculatedColumn, ColumnList, ColumnMetrics } from './common/types';

type Metrics<R> = Pick<ColumnMetrics<R>, 'viewportWidth' | 'minColumnWidth' | 'columnWidths'> & {
  columns: ColumnList<R>;
};

function toArray<R>(columns: ColumnList<R>): Column<R>[] {
  columns = Array.isArray(columns) ? columns : columns.toArray();
  return columns.map(c => ({ ...c }));
}

export function getColumnMetrics<R>(metrics: Metrics<R>): ColumnMetrics<R> {
  let left = 0;
  let totalWidth = 0;

  const columns = toArray(metrics.columns);
  setSpecifiedWidths(columns, metrics.columnWidths, metrics.viewportWidth, metrics.minColumnWidth);

  const allocatedWidths = columns.map(c => c.width || 0).reduce((acc, w) => acc + w, 0);
  const unallocatedWidth = metrics.viewportWidth - allocatedWidths - getScrollbarSize();

  setRemainingWidths(columns, unallocatedWidth, metrics.minColumnWidth);

  let calculatedColumns: CalculatedColumn<R>[] = columns.map(column => {
    // Every column should have a valid width as this stage
    const width = column.width as number;
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

  const frozenColumns = calculatedColumns.filter(c => isFrozen(c));
  const nonFrozenColumns = calculatedColumns.filter(c => !isFrozen(c));
  calculatedColumns = frozenColumns.concat(nonFrozenColumns);
  calculatedColumns.forEach((c, i) => c.idx = i);
  return {
    columns: calculatedColumns,
    lastFrozenColumnIndex: frozenColumns.length - 1,
    totalColumnWidth: totalWidth,
    minColumnWidth: metrics.minColumnWidth,
    columnWidths: metrics.columnWidths,
    viewportWidth: metrics.viewportWidth
  };
}

function setSpecifiedWidths<R>(
  columns: Column<R>[],
  columnWidths: Map<keyof R, number>,
  viewportWidth: number,
  minColumnWidth: number
): void {
  for (const column of columns) {
    if (columnWidths.has(column.key)) {
      // Use the resized width if available
      column.width = columnWidths.get(column.key);
    } else if (typeof column.width === 'number') {
      // TODO: allow width to be less than minWidth?
      column.width = Math.max(column.width, minColumnWidth);
    } else if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
      column.width = Math.max(Math.floor(viewportWidth * column.width / 100), minColumnWidth);
    }
  }
}

function setRemainingWidths<R>(
  columns: Column<R>[],
  unallocatedWidth: number,
  minColumnWidth: number
) {
  const unassignedColumns = columns.filter(c => c.width === undefined);
  const columnWidth = Math.max(
    Math.floor(unallocatedWidth / unassignedColumns.length),
    minColumnWidth
  );

  for (const column of unassignedColumns) {
    column.width = columnWidth;
  }
}
