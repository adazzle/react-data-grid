import React, { useCallback, memo } from 'react';

import HeaderCell from './HeaderCell';
import { CalculatedColumn } from './types';
import { assertIsValidKey } from './utils';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>,
  | 'rows'
  | 'onSelectedRowsChange'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'rowKey'
>;

export interface HeaderRowProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}

function HeaderRow<R, K extends keyof R, SR>({
  columns,
  rows,
  rowKey,
  onSelectedRowsChange,
  allRowsSelected,
  onColumnResize,
  sortColumn,
  sortDirection,
  onSort
}: HeaderRowProps<R, K, SR>) {
  const handleAllRowsSelectionChange = useCallback((checked: boolean) => {
    if (!onSelectedRowsChange) return;

    assertIsValidKey(rowKey);

    const newSelectedRows = new Set<R[K]>();
    if (checked) {
      for (const row of rows) {
        newSelectedRows.add(row[rowKey]);
      }
    }

    onSelectedRowsChange(newSelectedRows);
  }, [onSelectedRowsChange, rows, rowKey]);

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className="rdg-header-row"
    >
      {columns.map(column => {
        return (
          <HeaderCell<R, SR>
            key={column.key}
            column={column}
            onResize={onColumnResize}
            allRowsSelected={allRowsSelected}
            onAllRowsSelectionChange={handleAllRowsSelectionChange}
            onSort={onSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        );
      })}
    </div>
  );
}

export default memo(HeaderRow) as <R, K extends keyof R, SR>(props: HeaderRowProps<R, K, SR>) => JSX.Element;
