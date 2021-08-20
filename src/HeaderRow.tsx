import { memo } from 'react';
import { css } from '@linaria/core';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn } from './types';
import { getColSpan } from './utils';
import type { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'sortColumns' | 'onSortColumnsChange'
>;

export interface HeaderRowProps<R, SR, K extends React.Key> extends SharedDataGridProps<R, SR, K> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  lastFrozenColumnIndex: number;
}

const headerRow = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  grid-template-columns: var(--template-columns);
  grid-template-rows: var(--header-row-height);
  height: var(--header-row-height); // needed on Firefox
  line-height: var(--header-row-height);
  width: var(--row-width);
  position: sticky;
  top: 0;
  background-color: var(--header-background-color);
  font-weight: bold;
  z-index: 3;
`;

const headerRowClassname = `rdg-header-row ${headerRow}`;

function HeaderRow<R, SR, K extends React.Key>({
  columns,
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex
}: HeaderRowProps<R, SR, K>) {
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
        onColumnResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={onAllRowsSelectionChange}
        onSortColumnsChange={onSortColumnsChange}
        sortColumns={sortColumns}
      />
    );
  }

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className={headerRowClassname}
    >
      {cells}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR, K extends React.Key>(
  props: HeaderRowProps<R, SR, K>
) => JSX.Element;
