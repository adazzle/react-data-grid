import { useCallback, memo } from 'react';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn } from './types';
import { assertIsValidKeyGetter } from './utils';
import type { DataGridProps } from './DataGrid';
import { headerRowClassname } from './style';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, SR>,
  | 'rows'
  | 'onSelectedRowsChange'
  | 'sortColumns'
  | 'onSortColumnsChange'
  | 'rowKeyGetter'
>;

export interface HeaderRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}

function HeaderRow<R, SR>({
  columns,
  rows,
  rowKeyGetter,
  onSelectedRowsChange,
  allRowsSelected,
  onColumnResize,
  sortColumns,
  onSortColumnsChange
}: HeaderRowProps<R, SR>) {
  const handleAllRowsSelectionChange = useCallback((checked: boolean) => {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter(rowKeyGetter);

    const newSelectedRows = new Set<React.Key>(checked ? rows.map(rowKeyGetter) : undefined);
    onSelectedRowsChange(newSelectedRows);
  }, [onSelectedRowsChange, rows, rowKeyGetter]);

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className={headerRowClassname}
    >
      {columns.map(column => {
        return (
          <HeaderCell<R, SR>
            key={column.key}
            column={column}
            onResize={onColumnResize}
            allRowsSelected={allRowsSelected}
            onAllRowsSelectionChange={handleAllRowsSelectionChange}
            sortColumns={sortColumns}
            onSortColumnsChange={onSortColumnsChange}
          />
        );
      })}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR>(props: HeaderRowProps<R, SR>) => JSX.Element;
