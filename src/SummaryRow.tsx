import { memo } from 'react';
import { rowClassname, summaryRowClassname } from './style';
import { getColSpan } from './utils';
import SummaryCell from './SummaryCell';
import type { RowRendererProps } from './types';

type SharedRowRendererProps<R, SR, FR> = Pick<
  RowRendererProps<R, SR, FR>,
  'viewportColumns' | 'rowIdx'
>;

interface SummaryRowProps<R, SR, FR> extends SharedRowRendererProps<R, SR, FR> {
  'aria-rowindex': number;
  row: SR;
  bottom: number;
  lastFrozenColumnIndex: number;
}

function SummaryRow<R, SR, FR>({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  lastFrozenColumnIndex,
  'aria-rowindex': ariaRowIndex
}: SummaryRowProps<R, SR, FR>) {
  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'SUMMARY', row });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    cells.push(<SummaryCell key={column.key} column={column} colSpan={colSpan} row={row} />);
  }

  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className={`${rowClassname} rdg-row-${
        rowIdx % 2 === 0 ? 'even' : 'odd'
      } ${summaryRowClassname}`}
      style={{ bottom }}
    >
      {cells}
    </div>
  );
}

export default memo(SummaryRow) as <R, SR, FR>(props: SummaryRowProps<R, SR, FR>) => JSX.Element;
