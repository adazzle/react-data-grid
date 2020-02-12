import React, { memo } from 'react';
import classNames from 'classnames';

import { CellRendererProps } from './common/types';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>,
  | 'idx'
  | 'lastFrozenColumnIndex'
  | 'scrollLeft'
  | 'column'
>;

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  lastFrozenColumnIndex,
  row,
  scrollLeft
}: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, frozen, idx, width, left, summaryCellClass } = column;
  const className = classNames(
    'rdg-cell',
    {
      'rdg-cell-frozen': frozen,
      'rdg-cell-frozen-last': idx === lastFrozenColumnIndex
    },
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  const style: React.CSSProperties = { width, left };

  if (scrollLeft !== undefined) {
    style.transform = `translateX(${scrollLeft}px)`;
  }

  return (
    <div className={className} style={style}>
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
