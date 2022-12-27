import type { CSSProperties } from 'react';
import clsx from 'clsx';

import type { CalculatedColumn } from '../types';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from '../style';

export function getRowStyle(rowIdx: number, height?: number): CSSProperties {
  if (height !== undefined) {
    return {
      '--rdg-grid-row-start': rowIdx,
      '--rdg-row-height': `${height}px`
    } as unknown as CSSProperties;
  }
  return { '--rdg-grid-row-start': rowIdx } as unknown as CSSProperties;
}

export function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
  colSpan?: number
): React.CSSProperties {
  return {
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan !== undefined ? `span ${colSpan}` : undefined,
    insetInlineStart: column.frozen ? `var(--rdg-frozen-left-${column.idx})` : undefined
  };
}

export function getCellClassname<R, SR>(
  column: CalculatedColumn<R, SR>,
  ...extraClasses: Parameters<typeof clsx>
): string {
  return clsx(
    cellClassname,
    {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    ...extraClasses
  );
}
