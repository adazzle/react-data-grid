import type { CSSProperties } from 'react';

import { rowClassname, summaryRowClassname } from './style';
import { useColumns, useAriaRowIndex, useRowPosition } from './hooks';
import SummaryCell from './SummaryCell';

export const DEFAULT_SUMMARY_ROW_HEIGHT = 35;

export interface SummaryRowProps<SR> {
  /** The height of the summary row in pixels */
  height?: number;
  row: SR;
}

export default function SummaryRow<R, SR>({
  height,
  row
}: SummaryRowProps<SR>) {
  const ariaRowIndex = useAriaRowIndex();
  const viewportColumns = useColumns<R, SR>();
  const bottom = useRowPosition();
  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className={`${rowClassname} ${summaryRowClassname}`}
      style={{
        bottom,
        '--summary-row-height': `${height}px`
      } as unknown as CSSProperties}
    >
      {viewportColumns.map(column => (
        <SummaryCell<R, SR>
          key={column.key}
          column={column}
          row={row}
        />
      ))}
    </div>
  );
}
