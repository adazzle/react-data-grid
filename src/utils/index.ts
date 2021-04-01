import clsx from 'clsx';

import type { CalculatedColumn, CalculatedParentColumn } from '../types';
import { cell, cellFrozenClassname, cellFrozenLastClassname } from '../style';

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
    ? {
      left: `var(--frozen-left-${column.key})`
    }
    : {
      gridColumnStart: column.idx + 1
    };
}

export function getParentCellStyle<R, SR>(column: CalculatedParentColumn<R, SR>): React.CSSProperties {
  const firstColumn = column.children[0];
  return column.frozen
    ? {
      left: `var(--frozen-left-${firstColumn.key})`,
      gridColumn: `span ${column.span}`
    }
    : {
      gridColumnStart: column.idx + 1,
      gridColumn: `span ${column.span}`
    };
}

export function getCellClassname<R, SR>(column: CalculatedColumn<R, SR>, ...extraClasses: Parameters<typeof clsx>): string {
  return clsx(
    `rdg-cell ${cell}`, {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    ...extraClasses
  );
}

export function getParentCellClassname<R, SR>(column: CalculatedParentColumn<R, SR>, ...extraClasses: Parameters<typeof clsx>): string {
  return clsx(
    `rdg-cell ${cell}`, {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    ...extraClasses
  );
}
