import { memo } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn } from './types';
import { getColSpan, getRowStyle } from './utils';
import type { DataGridProps } from './DataGrid';
import { useRovingRowRef } from './hooks';
import { cell, cellFrozen } from './style';

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'sortColumns' | 'onSortColumnsChange'
>;

export interface HeaderRowProps<R, SR, K extends React.Key> extends SharedDataGridProps<R, SR, K> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  selectCell: (columnIdx: number) => void;
  lastFrozenColumnIndex: number;
  selectedCellIdx: number | undefined;
  shouldFocusGrid: boolean;
}

const headerRow = css`
  display: contents;
  line-height: var(--rdg-header-row-height);
  background-color: var(--rdg-header-background-color);
  font-weight: bold;
  outline: none;

  > .${cell} {
    z-index: 3;
    position: sticky;
    top: 0;
  }

  > .${cellFrozen} {
    z-index: 4;
  }

  &[aria-selected='true'] {
    box-shadow: inset 0 0 0 2px var(--rdg-selection-color);
  }
`;

const headerRowClassname = `rdg-header-row ${headerRow}`;

function HeaderRow<R, SR, K extends React.Key>({
  columns,
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  shouldFocusGrid
}: HeaderRowProps<R, SR, K>) {
  const { ref, tabIndex, className } = useRovingRowRef(selectedCellIdx);

  const cells = [];
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'HEADER' });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    cells.push(
      <HeaderCell<R, SR>
        key={column.key}
        column={column}
        colSpan={colSpan}
        isCellSelected={selectedCellIdx === column.idx}
        onColumnResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={onAllRowsSelectionChange}
        onSortColumnsChange={onSortColumnsChange}
        sortColumns={sortColumns}
        selectCell={selectCell}
        shouldFocusGrid={shouldFocusGrid && index === 0}
      />
    );
  }

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      ref={ref}
      tabIndex={tabIndex}
      className={clsx(headerRowClassname, className)}
      style={getRowStyle(1)}
    >
      {cells}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR, K extends React.Key>(
  props: HeaderRowProps<R, SR, K>
) => JSX.Element;
