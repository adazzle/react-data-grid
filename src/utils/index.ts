import clsx from 'clsx';

import type { CalculatedColumn, ColSpanArgs } from '../types';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from '../style';

export * from './domUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';

export function assertIsValidKeyGetter<R>(keyGetter: unknown): asserts keyGetter is (row: R) => React.Key {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}

export function getCellStyle<R, SR>(column: CalculatedColumn<R, SR>, colSpan?: number): React.CSSProperties {
  return {
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan ? `span ${colSpan}` : undefined,
    left: column.frozen ? `var(--frozen-left-${column.key})` : undefined
  };
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

export function getColSpan<R, SR>(column: CalculatedColumn<R, SR>, viewportColumns: readonly CalculatedColumn<R, SR>[], args: ColSpanArgs<R, SR>) {
  const colSpan = typeof column.colSpan === 'function' ? column.colSpan(args) : column.colSpan;
  if (
    Number.isInteger(colSpan)
    && (colSpan as number) > 1
    // ignore colSpan if it spans over both frozen and regular columns
    && !areColSpanColumnsCompatible(column, viewportColumns, colSpan)
  ) {
    return undefined;
  }
  return colSpan;
}

function areColSpanColumnsCompatible<R, SR>(column: CalculatedColumn<R, SR>, viewportColumns: readonly CalculatedColumn<R, SR>[], colSpan: number) {
  const isFrozen = column.frozen;
  if (!isFrozen) return true;
  const startIdx = column.idx - viewportColumns[0].idx;
  for (
    let index = 1;
    index < colSpan && startIdx + index < viewportColumns.length;
    index++
  ) {
    if (viewportColumns[startIdx + index].frozen !== isFrozen) {
      return false;
    }
  }
  return true;
}
