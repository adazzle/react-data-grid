import { memo } from 'react';

import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps } from './types';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'column' | 'colSpan'>;

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  colSpan,
  row
}: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, summaryCellClass } = column;
  const className = getCellClassname(column,
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

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
