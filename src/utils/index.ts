import type { CalculatedColumn, Column, ColumnOrColumnGroup } from '../types';

export * from './colSpanUtils';
export * from './domUtils';
export * from './eventUtils';
export * from './keyboardUtils';
export * from './renderMeasuringCells';
export * from './selectedCellUtils';
export * from './styleUtils';

export const { min, max, round, floor, sign, abs } = Math;

export function assertIsValidKeyGetter<R, K extends React.Key>(
  keyGetter: unknown
): asserts keyGetter is (row: R) => K {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}

export function clampColumnWidth<R, SR>(
  width: number,
  { minWidth, maxWidth }: CalculatedColumn<R, SR>
): number {
  width = max(width, minWidth);

  // ignore maxWidth if it less than minWidth
  if (typeof maxWidth === 'number' && maxWidth >= minWidth) {
    return min(width, maxWidth);
  }

  return width;
}

export function* iterateOverColumns<R, SR>(
  rawColumns: readonly ColumnOrColumnGroup<R, SR>[]
): Generator<Column<R, SR>> {
  for (const rawColumn of rawColumns) {
    if ('children' in rawColumn) {
      yield* iterateOverColumns(rawColumn.children);
    } else {
      yield rawColumn;
    }
  }
}
