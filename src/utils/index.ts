import type { CSSProperties } from 'react';
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

export function getRowStyle(rowIdx: number): CSSProperties {
  return { '--grid-row-start': rowIdx } as unknown as CSSProperties;
}

export function getCellStyle<R, SR>(column: CalculatedColumn<R, SR>): CSSProperties {
  const style: CSSProperties = {
    gridColumnStart: column.idx + 1,
    gridRowStart: 'var(--grid-row-start)'
  };

  if (column.frozen) {
    style.left = `var(--frozen-left-${column.key})`;
  }

  return style;
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
