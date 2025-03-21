import type { CalculatedColumn, CalculatedColumnOrColumnGroup, Maybe } from '../types';

export * from './colSpanUtils';
export * from './domUtils';
export * from './eventUtils';
export * from './keyboardUtils';
export * from './renderMeasuringCells';
export * from './selectedCellUtils';
export * from './styleUtils';

export const { min, max, floor, sign, abs } = Math;

export function assertIsValidKeyGetter<R, K extends React.Key>(
  keyGetter: Maybe<(row: NoInfer<R>) => K>
): asserts keyGetter is (row: R) => K {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}
export function getColumnWidthForMeasurement<R, SR>(
  width: number | string,
  { minWidth, maxWidth }: CalculatedColumn<R, SR>
): string {
  if (typeof width === 'number') {
    if (maxWidth != null) {
      return `clamp(${minWidth}px, ${width}px, ${maxWidth}px)`;
    }
    return `max(${minWidth}px, ${width}px)`;
  }

  const useMinMax = !width.includes('minmax') && !width.includes('fit-content');

  if (
    maxWidth != null &&
    // ignore maxWidth if it less than minWidth
    maxWidth >= minWidth
  ) {
    // TODO: how to clamp width in CSS grid?
    if (width === 'max-content') {
      return width;
    }

    if (useMinMax) {
      return `minmax(${width}, ${maxWidth}px)`;
    }
  }

  if (useMinMax) {
    return `minmax(${minWidth}px, ${width})`;
  }

  return width;
}

export function getHeaderCellRowSpan<R, SR>(
  column: CalculatedColumnOrColumnGroup<R, SR>,
  rowIdx: number
) {
  return column.parent === undefined ? rowIdx : column.level - column.parent.level;
}
