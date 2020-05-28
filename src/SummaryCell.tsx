import React, { memo } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './common/types';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>,
  | 'lastFrozenColumnIndex'
  | 'column'
>;

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  lastFrozenColumnIndex,
  row
}: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, width, left, summaryCellClass } = column;
  const className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    },
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  return (
    <div className={className} style={{ width, left }}>
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
