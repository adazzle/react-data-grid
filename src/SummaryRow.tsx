import { memo } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import { cell, row, rowClassname } from './style';
import { getColSpan, getRowStyle } from './utils';
import SummaryCell from './SummaryCell';
import type { CalculatedColumn, RowRendererProps } from './types';
import { useRovingRowRef } from './hooks';

type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>, 'viewportColumns' | 'rowIdx'>;

interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
  'aria-rowindex': number;
  row: SR;
  top: number | undefined;
  bottom: number | undefined;
  lastFrozenColumnIndex: number;
  selectedCellIdx: number | undefined;
  selectCell: (row: SR, column: CalculatedColumn<R, SR>) => void;
}

const summaryRow = css`
  z-index: 3;
  line-height: var(--rdg-summary-row-height);

  &.${row} > .${cell} {
    position: sticky;
  }
`;

const summaryRowBorderClassname = css`
  & > .${cell} {
    border-top: 2px solid var(--rdg-summary-border-color);
  }
`;

const summaryRowClassname = `rdg-summary-row ${summaryRow}`;

function SummaryRow<R, SR>({
  rowIdx,
  row,
  viewportColumns,
  top,
  bottom,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  'aria-rowindex': ariaRowIndex
}: SummaryRowProps<R, SR>) {
  const { ref, tabIndex, className } = useRovingRowRef(selectedCellIdx);
  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'SUMMARY', row });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    const isCellSelected = selectedCellIdx === column.idx;

    cells.push(
      <SummaryCell<R, SR>
        key={column.key}
        column={column}
        colSpan={colSpan}
        row={row}
        isCellSelected={isCellSelected}
        selectCell={selectCell}
      />
    );
  }

  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      ref={ref}
      tabIndex={tabIndex}
      className={clsx(
        rowClassname,
        `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
        summaryRowClassname,
        { [summaryRowBorderClassname]: rowIdx === 0 },
        className
      )}
      style={
        {
          ...getRowStyle(ariaRowIndex),
          '--rdg-summary-row-top': `${top}px`,
          '--rdg-summary-row-bottom': `${bottom}px`
        } as unknown as React.CSSProperties
      }
    >
      {cells}
    </div>
  );
}

export default memo(SummaryRow) as <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
