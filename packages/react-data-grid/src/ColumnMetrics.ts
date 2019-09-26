export { sameColumn } from './ColumnComparer';
import { isFrozen } from './ColumnUtils';
import { getScrollbarSize } from './utils';
import { Column, CalculatedColumn, ColumnList, ColumnMetrics } from './common/types';

type Metrics<R> = Pick<ColumnMetrics<R>, 'totalWidth' | 'minColumnWidth'> & {
  columns: ColumnList<R>;
  // columnResizes: Map<number, number>;
};

function cloneColumns<R>(columns: ColumnList<R>): Column<R>[] {
  if (Array.isArray(columns)) {
    return columns.map(c => ({ ...c }));
  }
  return cloneColumns(columns.toArray());
}

function setColumnWidths<R>(columns: Column<R>[], totalWidth: number/*, columnResizes: Map<number, number>*/): void {
  columns.forEach((column/*, idx*/) => {
    /*if (columnResizes.has(idx)) {
      column.width = columnResizes.get(idx);
    } else */
    if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
      column.width = Math.floor(totalWidth * column.width / 100);
    }
  });
}

function setDefferedColumnWidths<R>(columns: Column<R>[], unallocatedWidth: number, minColumnWidth: number): void {
  const defferedColumns = columns.filter(c => !c.width);
  const columnWidth = Math.floor(unallocatedWidth / defferedColumns.length);

  for (const column of columns) {
    if (column.width) continue;
    column.width = columnWidth < minColumnWidth ? minColumnWidth : columnWidth;
  }
}

function setColumnOffsets<R>(columns: Column<R>[]): void {
  let left = 0;
  for (const column of columns as CalculatedColumn<R>[]) {
    column.left = left;
    left += column.width;
  }
}

function getTotalColumnWidth<R>(columns: Column<R>[]): number {
  return columns.reduce((acc, c) => acc + (c.width || 0), 0);
}

export function recalculate<R>(metrics: Metrics<R>): ColumnMetrics<R> {
  // clone columns so we can safely edit them:
  const columns = cloneColumns(metrics.columns);
  // compute width for columns which specify width in %
  setColumnWidths(columns, metrics.totalWidth/*, metrics.columnResizes*/);

  const width = getTotalColumnWidth(columns);
  const unallocatedWidth = metrics.totalWidth - width - getScrollbarSize();

  // compute width for columns which doesn't specify width
  setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

  // compute left offset
  setColumnOffsets(columns);

  const frozenColumns = columns.filter(c => isFrozen(c));
  const nonFrozenColumns = columns.filter(c => !isFrozen(c));
  const calculatedColumns = frozenColumns.concat(nonFrozenColumns) as CalculatedColumn<R>[];
  calculatedColumns.forEach((c, i) => c.idx = i);
  return {
    width,
    columns: calculatedColumns,
    lastFrozenColumnIndex: frozenColumns.length - 1,
    totalWidth: metrics.totalWidth,
    totalColumnWidth: getTotalColumnWidth(columns),
    minColumnWidth: metrics.minColumnWidth
  };
}

/**
 * Update column metrics calculation by resizing a column.
 */
export function resizeColumn<R>(metrics: ColumnMetrics<R>, index: number, width: number): ColumnMetrics<R> {
  const updatedColumn = { ...metrics.columns[index] };
  updatedColumn.width = Math.max(width, metrics.minColumnWidth);
  const updatedMetrics = { ...metrics };
  updatedMetrics.columns = [...metrics.columns];
  updatedMetrics.columns.splice(index, 1, updatedColumn);

  return recalculate(updatedMetrics);
}
