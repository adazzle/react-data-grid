import { RowData } from './common/types';

export function get<R>(row: R, property: keyof R) {
  if (typeof (row as RowData).get === 'function') {
    return (row as RowData).get!(property) as R[typeof property];
  }

  return row[property];
}

interface Keys {
  rowKey?: string;
  values?: string[];
}

export function isRowSelected<R, K extends keyof R>(
  keys?: Keys | null,
  indexes?: number[] | null,
  isSelectedKey?: string | null,
  rowData?: R,
  rowIdx?: number
): boolean {
  if (Array.isArray(indexes) && typeof rowIdx === 'number') {
    return indexes.includes(rowIdx);
  }

  if (rowData && keys && keys.rowKey && Array.isArray(keys.values)) {
    return keys.values.includes(rowData[keys.rowKey as K] as unknown as string);
  }

  if (rowData && typeof isSelectedKey === 'string') {
    return !!rowData[isSelectedKey as K];
  }

  return false;
}
