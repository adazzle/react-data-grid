import { RowData } from '../common/types';

export function get<R>(row: R, property: keyof R) {
  if (typeof (row as RowData).get === 'function') {
    return (row as RowData).get!(property) as R[typeof property];
  }

  return row[property];
}
