import React, { memo } from 'react';
import classNames from 'classnames';

import { CellRendererProps, CalculatedColumn } from './common/types';

export interface SummaryCellProps<TRow, TSummaryRow> extends Pick<CellRendererProps<TRow>, 'idx' | 'rowIdx' | 'lastFrozenColumnIndex' | 'scrollLeft'> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TSummaryRow;
}

function SummaryCell<R, SR>({
  column,
  lastFrozenColumnIndex,
  row,
  rowIdx,
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
      {SummaryFormatter && <SummaryFormatter rowIdx={rowIdx} column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
