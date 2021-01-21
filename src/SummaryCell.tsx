import { memo } from 'react';
import clsx from 'clsx';

import { getCellStyle } from './utils';
import type { CellRendererProps } from './types';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from './style';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'column'>;

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  row
}: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, summaryCellClass } = column;
  const className = clsx(
    cellClassname,
    {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      className={className}
      style={getCellStyle(column)}
    >
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
