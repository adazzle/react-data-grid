import { memo } from 'react';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn } from './types';
import { getColSpan } from './utils';
import type { DataGridProps } from './DataGrid';
import { headerRowClassname } from './style';

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'sortColumns' | 'onSortColumnsChange'
>;

export interface HeaderRowProps<R, SR, K extends React.Key>
  extends SharedDataGridProps<R, SR, K>,
    Pick<React.HTMLAttributes<HTMLDivElement>, 'onKeyDown' | 'onFocus'> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  selectCell: (column: CalculatedColumn<R, SR>) => void;
  lastFrozenColumnIndex: number;
  selectedColIdx: number | undefined;
}

function HeaderRow<R, SR, K extends React.Key>({
  columns,
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex,
  selectedColIdx,
  selectCell,
  onKeyDown,
  onFocus
}: HeaderRowProps<R, SR, K>) {
  const cells = [];
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'HEADER' });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    const isCellSelected = selectedColIdx === column.idx;

    cells.push(
      <HeaderCell<R, SR>
        key={column.key}
        column={column}
        colSpan={colSpan}
        isCellSelected={isCellSelected}
        onResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={onAllRowsSelectionChange}
        onSortColumnsChange={onSortColumnsChange}
        sortColumns={sortColumns}
        onKeyDown={isCellSelected ? onKeyDown : undefined}
        onFocus={onFocus}
        selectCell={selectCell}
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
