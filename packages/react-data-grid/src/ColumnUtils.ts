import Immutable from 'immutable';
import { Column, ColumnList, ColumnMetrics } from './common/types';

export function getColumn(columns: ColumnList, idx: number): Column {
  if (Array.isArray(columns)) {
    return columns[idx];
  }

  return columns.get(idx);
}

export function spliceColumn(metrics: ColumnMetrics, idx: number, column: Column): ColumnMetrics {
  if (Array.isArray(metrics.columns)) {
    metrics.columns.splice(idx, 1, column);
  } else {
    metrics.columns = metrics.columns.splice(idx, 1, column) as Immutable.List<Column>;
  }
  return metrics;
}

export function getSize<T>(columns: T[] | Immutable.List<T>): number {
  if (Array.isArray(columns)) {
    return columns.length;
  }

  return columns.size;
}

// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be editing from a cell level
export function canEdit(column: Column, rowData: unknown, enableCellSelect?: boolean): boolean {
  if (typeof column.editable === 'function') {
    return enableCellSelect === true && column.editable(rowData);
  }
  return enableCellSelect === true && (!!column.editor || !!column.editable);
}

export function isFrozen(column: Column): boolean {
  return column.frozen === true;
}
