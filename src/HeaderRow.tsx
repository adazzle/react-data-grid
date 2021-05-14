import { useCallback, memo } from 'react';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn } from './types';
import { assertIsValidKeyGetter, getColSpan } from './utils';
import type { DataGridProps } from './DataGrid';
import { headerRowClassname } from './style';

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'rows' | 'onSelectedRowsChange' | 'sortColumn' | 'sortDirection' | 'onSort' | 'rowKeyGetter'
>;

export interface HeaderRowProps<R, SR, K extends React.Key> extends SharedDataGridProps<R, SR, K> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  lastFrozenColumnIndex: number;
}

function HeaderRow<R, SR, K extends React.Key>({
  columns,
  rows,
  rowKeyGetter,
  onSelectedRowsChange,
  allRowsSelected,
  onColumnResize,
  sortColumn,
  sortDirection,
  onSort,
  lastFrozenColumnIndex
}: HeaderRowProps<R, SR, K>) {
  const handleAllRowsSelectionChange = useCallback(
    (checked: boolean) => {
      if (!onSelectedRowsChange) return;

      assertIsValidKeyGetter<R, K>(rowKeyGetter);

      const newSelectedRows = new Set<K>(checked ? rows.map(rowKeyGetter) : undefined);
      onSelectedRowsChange(newSelectedRows);
    },
    [onSelectedRowsChange, rows, rowKeyGetter]
  );

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
        onResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={handleAllRowsSelectionChange}
        onSort={onSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
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
