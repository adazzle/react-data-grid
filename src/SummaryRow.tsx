import { memo } from 'react';
import { rowClassname, summaryRowClassname } from './style';
import SummaryCell from './SummaryCell';
import type { RowRendererProps } from './types';

type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>,
  | 'viewportColumns'
  | 'rowIdx'
>;

interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
  'aria-rowindex': number;
  row: SR;
  bottom: number;
}

function SummaryRow<R, SR>({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  'aria-rowindex': ariaRowIndex
}: SummaryRowProps<R, SR>) {
  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className={`${rowClassname} rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'} ${summaryRowClassname}`}
      style={{ bottom }}
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

export default memo(SummaryRow) as <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
