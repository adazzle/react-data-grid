import { RowData } from './common/types';

export function get(row: RowData, property: string) {
  if (typeof row.get === 'function') {
    return row.get(property);
  }

  return row[property];
}

interface Keys {
  rowKey?: string;
  values?: string[];
}

export function isRowSelected<T, K extends keyof T>(
  keys?: Keys | null,
  indexes?: number[] | null,
  isSelectedKey?: string | null,
  rowData?: T,
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
