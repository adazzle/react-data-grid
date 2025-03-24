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
) {
  const widthWithUnit = typeof width === 'number' ? `${width}px` : width;

  // don't break in Node.js (SSR) and jsdom
  if (typeof CSS === 'undefined') {
    return widthWithUnit;
  }

  const hasMaxWidth = maxWidth != null;
  const clampedWidth = hasMaxWidth
    ? `clamp(${minWidth}px, ${widthWithUnit}, ${maxWidth}px)`
    : `max(${minWidth}px, ${widthWithUnit})`;

  // clamp() and max() do not handle all the css grid column width values
  if (isValidCSSGridColumnWidth(clampedWidth)) {
    return clampedWidth;
  }

  if (
    hasMaxWidth &&
    // ignore maxWidth if it less than minWidth
    maxWidth >= minWidth &&
    // we do not want to use minmax with max-content as it
    // can result in width being larger than max-content
    widthWithUnit !== 'max-content'
  ) {
    // We are setting maxWidth on the measuring cell but the browser only applies
    // it after all the widths are calculated. This results in left over space in some cases.
    const minMaxWidth = `minmax(${widthWithUnit}, ${maxWidth}px)`;
    if (isValidCSSGridColumnWidth(minMaxWidth)) {
      return minMaxWidth;
    }
  }

  return isValidCSSGridColumnWidth(widthWithUnit) ? widthWithUnit : 'auto';
}

export function getHeaderCellRowSpan<R, SR>(
  column: CalculatedColumnOrColumnGroup<R, SR>,
  rowIdx: number
) {
  return column.parent === undefined ? rowIdx : column.level - column.parent.level;
}

function isValidCSSGridColumnWidth(width: string) {
  return CSS.supports('grid-template-columns', width);
}
