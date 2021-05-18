import { memo } from 'react';

import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps } from './types';

type SharedCellRendererProps<R, SR, FR> = Pick<CellRendererProps<R, SR, FR>, 'column' | 'colSpan'>;

interface SummaryCellProps<R, SR, FR> extends SharedCellRendererProps<R, SR, FR> {
  row: SR;
}

function SummaryCell<R, SR, FR>({ column, colSpan, row }: SummaryCellProps<R, SR, FR>) {
  const { summaryFormatter: SummaryFormatter, summaryCellClass } = column;
  const className = getCellClassname(
    column,
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      aria-colspan={colSpan}
      className={className}
      style={getCellStyle(column, colSpan)}
    >
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR, FR>(props: SummaryCellProps<R, SR, FR>) => JSX.Element;
