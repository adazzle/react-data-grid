import { memo } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import { cell, row, rowClassname, rowSelectedClassname } from './style';
import { getColSpan, getRowStyle } from './utils';
import SummaryCell from './SummaryCell';
import type { CalculatedColumn, RowRendererProps } from './types';

type SharedRowRendererProps<R, SR> = Pick<
  RowRendererProps<R, SR>,
  'viewportColumns' | 'rowIdx' | 'gridRowStart'
>;

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
  &.${row} {
    line-height: var(--rdg-summary-row-height);
    > .${cell} {
      position: sticky;
    }
  }
`;

const summaryRowBorderClassname = css`
  & > .${cell} {
    border-block-start: 2px solid var(--rdg-summary-border-color);
  }
`;

const summaryRowClassname = `rdg-summary-row ${summaryRow}`;

function SummaryRow<R, SR>({
  rowIdx,
  gridRowStart,
  row,
  viewportColumns,
  top,
  bottom,
  lastFrozenColumnIndex,
  selectedCellIdx,
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
      className={clsx(
        rowClassname,
        `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
        summaryRowClassname,
        {
          [summaryRowBorderClassname]: rowIdx === 0,
          [rowSelectedClassname]: selectedCellIdx === -1
        }
      )}
      style={
        {
          ...getRowStyle(gridRowStart),
          '--rdg-summary-row-top': top !== undefined ? `${top}px` : undefined,
          '--rdg-summary-row-bottom': bottom !== undefined ? `${bottom}px` : undefined
        } as unknown as React.CSSProperties
      }
    >
      {cells}
    </div>
  );
}

export default memo(SummaryRow) as <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
