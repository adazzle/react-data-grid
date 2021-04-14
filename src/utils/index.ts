import type { CSSProperties } from 'react';
import clsx from 'clsx';

import type { CalculatedColumn, ColSpanParams } from '../types';
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
  const style: CSSProperties = {
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan ? `span ${colSpan}` : undefined
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

export function getColSpan<R, SR>(column: CalculatedColumn<R, SR>, viewportColumns: readonly CalculatedColumn<R, SR>[], params: ColSpanParams<R, SR>) {
  const colSpan = typeof column.colSpan === 'function' ? column.colSpan(params) : column.colSpan;
  if (colSpan && !areColSpanColumnsCompatible(viewportColumns, column.idx, colSpan)) {
    // ignore colSpan if it spans over frozen and regular columns
    return undefined;
  }
  return colSpan;
}

function areColSpanColumnsCompatible<R, SR>(viewportColumns: readonly CalculatedColumn<R, SR>[], startIdx: number, colSpan: number) {
  const isFrozen = viewportColumns[startIdx].frozen;
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
