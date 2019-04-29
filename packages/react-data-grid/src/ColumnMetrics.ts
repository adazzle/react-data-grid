export { sameColumn } from './ColumnComparer';
import { getSize, getColumn, isFrozen, spliceColumn } from './ColumnUtils';
import getScrollbarSize from './getScrollbarSize';
import { isColumnsImmutable } from './common/utils';
import { Column, ColumnList, ColumnMetrics } from './common/types';

type Metrics = Pick<ColumnMetrics, 'columns' | 'totalWidth' | 'minColumnWidth'>;

function cloneColumns(columns: ColumnList): Column[] {
  if (Array.isArray(columns)) {
    return columns.map(c => ({ ...c }));
  }
  return cloneColumns(columns.toArray());
}

function setColumnWidths(columns: Column[], totalWidth: number): void {
  for (const column of columns) {
    if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
      column.width = Math.floor(totalWidth * column.width / 100);
    }
  }
}

function setDefferedColumnWidths(columns: Column[], unallocatedWidth: number, minColumnWidth: number): void {
  const defferedColumns = columns.filter(c => !c.width);
  const columnWidth = Math.floor(unallocatedWidth / getSize(defferedColumns));

  for (const column of columns) {
    if (column.width) continue;

    if (unallocatedWidth <= 0) {
      column.width = minColumnWidth;
    }

    column.width = columnWidth < minColumnWidth ? minColumnWidth : columnWidth;
  }
}

function setColumnOffsets(columns: Column[]): void {
  let left = 0;
  for (const column of columns) {
    column.left = left;
    left += column.width;
  }
}

const getTotalColumnWidth = (columns: Column[]): number => columns.reduce((acc, c) => acc + (c.width || 0), 0);

export function recalculate(metrics: Metrics) {
  // clone columns so we can safely edit them:
  let columns = cloneColumns(metrics.columns);
  // compute width for columns which specify width
  setColumnWidths(columns, metrics.totalWidth);

  const width = getTotalColumnWidth(columns);
  const unallocatedWidth = metrics.totalWidth - width - getScrollbarSize();

  // compute width for columns which doesn't specify width
  setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

  // compute left offset
  setColumnOffsets(columns);

  const frozenColumns = columns.filter(c => isFrozen(c));
  const nonFrozenColumns = columns.filter(c => !isFrozen(c));
  columns = frozenColumns.concat(nonFrozenColumns);
  columns.forEach((c, i) => c.idx = i);
  return {
    columns,
    width,
    totalWidth: metrics.totalWidth,
    totalColumnWidth: getTotalColumnWidth(columns),
    minColumnWidth: metrics.minColumnWidth
  };
}

/**
 * Update column metrics calculation by resizing a column.
 */
export function resizeColumn(metrics: ColumnMetrics, index: number, width: number) {
  const column = getColumn(metrics.columns, index);
  const metricsClone = { ...metrics };
  metricsClone.columns = cloneColumns(metrics.columns);

  const updatedColumn = { ...column };
  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

  return recalculate(spliceColumn(metricsClone, index, updatedColumn));
}

type ColumnComparer = (colA: Column, colB: Column) => boolean;

function compareEachColumn(prevColumns: Column[], nextColumns: Column[], isSameColumn: ColumnComparer): boolean {
  if (getSize(prevColumns) !== getSize(nextColumns)) return false;

  const keys = new Set<string>();
  const prevColumnsMap = new Map<string, Column>();
  const nextColumnsMap = new Map<string, Column>();

  for (const column of prevColumns) {
    keys.add(column.key);
    prevColumnsMap.set(column.key, column);
  }

  for (const column of nextColumns) {
    keys.add(column.key);
    nextColumnsMap.set(column.key, column);
  }

  if (keys.size > prevColumnsMap.size) return false;

  for (const key of keys) {
    if (!prevColumnsMap.has(key) || !nextColumnsMap.has(key)) return false;
    const prevColumn = prevColumnsMap.get(key)!;
    const nextColumn = nextColumnsMap.get(key)!;
    if (!isSameColumn(prevColumn, nextColumn)) return false;
  }

  return true;
}

export function sameColumns(prevColumns: ColumnList, nextColumns: ColumnList, isSameColumn: ColumnComparer): boolean {
  if (isColumnsImmutable(prevColumns) && isColumnsImmutable(nextColumns)) {
    return prevColumns === nextColumns;
  }

  return compareEachColumn(prevColumns as Column[], nextColumns as Column[], isSameColumn);
}
