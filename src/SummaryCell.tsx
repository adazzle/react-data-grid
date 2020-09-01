import React, { memo } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './types';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'column'>;

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  row
}: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, width, left, summaryCellClass } = column;
  const className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.isLastFrozenColumn
    },
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      className={className}
      style={{ width, left }}
    >
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
