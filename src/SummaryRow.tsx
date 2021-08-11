import { memo } from 'react';
import { rowClassname, summaryRowClassname } from './style';
import { getColSpan } from './utils';
import SummaryCell from './SummaryCell';
import type { CalculatedColumn, RowRendererProps } from './types';

type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>, 'viewportColumns' | 'rowIdx'>;

interface SummaryRowProps<R, SR>
  extends SharedRowRendererProps<R, SR>,
    Pick<React.HTMLAttributes<HTMLDivElement>, 'onKeyDown' | 'onFocus' | 'aria-rowindex'> {
  row: SR;
  bottom: number;
  lastFrozenColumnIndex: number;
  selectedColIdx: number | undefined;
  selectCell: (row: SR, column: CalculatedColumn<R, SR>) => void;
}

function SummaryRow<R, SR>({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  lastFrozenColumnIndex,
  selectedColIdx,
  onKeyDown,
  onFocus,
  selectCell,
  'aria-rowindex': ariaRowIndex
}: SummaryRowProps<R, SR>) {
  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'SUMMARY', row });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    const isCellSelected = selectedColIdx === column.idx;

    cells.push(
      <SummaryCell<R, SR>
        key={column.key}
        column={column}
        colSpan={colSpan}
        row={row}
        isCellSelected={isCellSelected}
        onKeyDown={isCellSelected ? onKeyDown : undefined}
        onFocus={isCellSelected ? onFocus : undefined}
        selectCell={selectCell}
      />
    );
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

export default memo(SummaryRow) as <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
