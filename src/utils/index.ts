export * from './domUtils';
export * from './columnUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';

export function assertIsValidKeyGetter<R>(keyGetter: unknown): asserts keyGetter is (row: R) => React.Key {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}

export function getCellStyle(column: { key: string; frozen?: boolean; idx: number }): React.CSSProperties {
  return column.frozen
    ? { left: `var(--sticky-left-${column.key})` }
    : { gridColumnStart: column.idx + 1 };
}
