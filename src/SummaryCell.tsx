import React, { memo } from 'react';
import classNames from 'classnames';

import { CellRendererProps } from './common/types';

export interface SummaryCellProps<TRow> extends Pick<CellRendererProps<TRow>, 'idx' | 'rowIdx' | 'column' | 'lastFrozenColumnIndex' | 'scrollLeft'> {
  row: unknown;
}

function SummaryCell<R>({
  column,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  scrollLeft
}: SummaryCellProps<R>) {
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
      {SummaryFormatter && <SummaryFormatter rowIdx={rowIdx} column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R>(props: SummaryCellProps<R>) => JSX.Element;
