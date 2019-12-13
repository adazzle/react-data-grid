import Immutable from 'immutable';
import { Column, CalculatedColumn } from './common/types';

export function getSize<T>(columns: T[] | Immutable.List<T>): number {
  if (Array.isArray(columns)) {
    return columns.length;
  }

  return columns.size;
}

// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be editing from a cell level
export function canEdit<R>(column: CalculatedColumn<R>, rowData: R, enableCellSelect?: boolean): boolean {
  if (typeof column.editable === 'function') {
    return enableCellSelect === true && column.editable(rowData);
  }
  return enableCellSelect === true && (!!column.editor || !!column.editable);
}

export function isFrozen<R>(column: Column<R> | CalculatedColumn<R>): boolean {
  return column.frozen === true;
}
