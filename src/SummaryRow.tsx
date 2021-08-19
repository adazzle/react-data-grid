import { memo } from 'react';
import { css } from '@linaria/core';

import { cell, rowClassname } from './style';
import { getColSpan } from './utils';
import SummaryCell from './SummaryCell';
import type { RowRendererProps } from './types';

type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>, 'viewportColumns' | 'rowIdx'>;

interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
  'aria-rowindex': number;
  row: SR;
  bottom: number;
  lastFrozenColumnIndex: number;
}

const summaryRow = css`
  position: sticky;
  z-index: 3;
  grid-template-rows: var(--summary-row-height);
  height: var(--summary-row-height); // needed on Firefox
  line-height: var(--summary-row-height);

  > .${cell} {
    border-top: 2px solid var(--summary-border-color);
  }
`;

const summaryRowClassname = `rdg-summary-row ${summaryRow}`;

function SummaryRow<R, SR>({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  lastFrozenColumnIndex,
  'aria-rowindex': ariaRowIndex
}: SummaryRowProps<R, SR>) {
  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'SUMMARY', row });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    cells.push(<SummaryCell<R, SR> key={column.key} column={column} colSpan={colSpan} row={row} />);
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
