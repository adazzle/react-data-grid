import { memo } from 'react';

import { getCellStyle, getCellClassname } from './utils';
import type { CalculatedColumn, CellRendererProps } from './types';

interface SharedCellRendererProps<R, SR>
  extends Pick<
    CellRendererProps<R, SR>,
    'column' | 'colSpan' | 'isCellSelected' | 'onKeyDown' | 'onFocus'
  > {
  selectCell: (row: SR, column: CalculatedColumn<R, SR>) => void;
}

interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  row: SR;
}

function SummaryCell<R, SR>({
  column,
  colSpan,
  row,
  isCellSelected,
  onKeyDown,
  onFocus,
  selectCell
}: SummaryCellProps<R, SR>) {
  const { summaryFormatter: SummaryFormatter, summaryCellClass } = column;
  const className = getCellClassname(
    column,
    typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass
  );

  function onClick() {
    selectCell(row, column);
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      aria-colspan={colSpan}
      aria-selected={isCellSelected}
      className={className}
      style={getCellStyle(column, colSpan)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onClick={onClick}
    >
      {SummaryFormatter && <SummaryFormatter column={column} row={row} />}
    </div>
  );
}

export default memo(SummaryCell) as <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
