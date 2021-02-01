import { memo } from 'react';
import { rowClassname, summaryRowClassname } from './style';
import SummaryCell from './SummaryCell';
import type { RowRendererProps } from './types';

type SharedRowRendererProps<R, SR, FR> = Pick<RowRendererProps<R, SR, FR>,
  | 'viewportColumns'
  | 'rowIdx'
>;

interface SummaryRowProps<R, SR, FR> extends SharedRowRendererProps<R, SR, FR> {
  'aria-rowindex': number;
  row: SR;
  bottom: number;
}

function SummaryRow<R, SR, FR>({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  'aria-rowindex': ariaRowIndex
}: SummaryRowProps<R, SR, FR>) {
  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className={`${rowClassname} rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'} ${summaryRowClassname}`}
      style={{ bottom }}
    >
      {viewportColumns.map(column => (
        <SummaryCell
          key={column.key}
          column={column}
          row={row}
        />
      ))}
    </div>
  );
}

export default memo(SummaryRow) as <R, SR, FR>(props: SummaryRowProps<R, SR, FR>) => JSX.Element;
