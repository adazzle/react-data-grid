import { memo } from 'react';
import { css } from '@linaria/core';

import { useRovingCellRef } from './hooks';
import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps } from './types';

export const summaryCellClassname = css`
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
`;

type SharedCellRendererProps<R, SR> = Pick<
  CellRendererProps<R, SR>,
  'rowIdx' | 'column' | 'colSpan' | 'isCellSelected' | 'selectCell' | 'shouldFocusCellRef'
>;

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  colSpan,
  row,
  rowIdx,
  isCellSelected,
  shouldFocusCellRef,
  selectCell
}: SummaryCellProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected, shouldFocusCellRef);
  const { summaryCellClass } = column;
  const className = getCellClassname(
    column,
    summaryCellClassname,
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  function onClick() {
    selectCell({ rowIdx, idx: column.idx });
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      aria-colspan={colSpan}
      aria-selected={isCellSelected}
      ref={ref}
      tabIndex={tabIndex}
      className={className}
      style={getCellStyle(column, colSpan)}
      onClick={onClick}
      onFocus={onFocus}
    >
      {column.summaryFormatter?.({ column, row, isCellSelected })}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
