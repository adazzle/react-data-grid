import clsx from 'clsx';

import type { CalculatedColumn } from '../types';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from '../style';

export * from './domUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';

export function assertIsValidKeyGetter<R>(keyGetter: unknown): asserts keyGetter is (row: R) => React.Key {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}

export function getCellStyle<R, SR>(column: CalculatedColumn<R, SR>): React.CSSProperties {
  return column.frozen
    ? { left: `var(--frozen-left-${column.key})` }
    : { gridColumnStart: column.idx + 1 };
}

export function getCellClassname<R, SR>(column: CalculatedColumn<R, SR>, ...extraClasses: Parameters<typeof clsx>): string {
  return clsx(
    cellClassname, {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    ...extraClasses
  );
}

export function getPropertyValue(element: Element | null, property: string): number {
  if (element === null) return 0;
  const value = getComputedStyle(element).getPropertyValue(property);
  const numberValue = /\d+/.exec(value);
  if (numberValue === null) return 0;
  return Number(numberValue[0]);
}
