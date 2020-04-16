import React, { useCallback, memo } from 'react';

import HeaderCell from './HeaderCell';
import { CalculatedColumn } from './common/types';
import { assertIsValidKey } from './utils';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>,
  | 'draggableHeaderCell'
  | 'rows'
  | 'onHeaderDrop'
  | 'onSelectedRowsChange'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'rowKey'
>;

export interface HeaderRowProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  lastFrozenColumnIndex: number;
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}

function HeaderRow<R, K extends keyof R, SR>({
  onSelectedRowsChange,
  rowKey,
  rows,
  ...props
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
    <div className="rdg-header-row">
      {props.columns.map(column => {
        return (
          <HeaderCell<R, SR>
            key={column.key}
            column={column}
            lastFrozenColumnIndex={props.lastFrozenColumnIndex}
            onResize={props.onColumnResize}
            onHeaderDrop={props.onHeaderDrop}
            allRowsSelected={props.allRowsSelected}
            onAllRowsSelectionChange={handleAllRowsSelectionChange}
            draggableHeaderCell={props.draggableHeaderCell}
            onSort={props.onSort}
            sortColumn={props.sortColumn}
            sortDirection={props.sortDirection}
          />
        );
      })}
    </div>
  );
}

export default memo(HeaderRow) as <R, K extends keyof R, SR>(props: HeaderRowProps<R, K, SR>) => JSX.Element;
