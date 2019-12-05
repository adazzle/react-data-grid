import React from 'react';

import { getScrollbarSize, isFrozen } from './utils';
import HeaderCell from './HeaderCell';
import { CalculatedColumn, ColumnMetrics } from './common/types';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, K extends keyof R> = Pick<DataGridProps<R, K>,
| 'draggableHeaderCell'
| 'rowGetter'
| 'rowsCount'
| 'onHeaderDrop'
| 'onSelectedRowsChange'
| 'sortColumn'
| 'sortDirection'
| 'onGridSort'
> & Required<Pick<DataGridProps<R, K>,
| 'rowKey'
>>;

export interface HeaderRowProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
  height: number;
  columnMetrics: ColumnMetrics<R>;
  allRowsSelected: boolean;
  scrollLeft: number | undefined;
  onColumnResize(column: CalculatedColumn<R>, width: number): void;
}

export default function HeaderRow<R, K extends keyof R>({
  height,
  columnMetrics,
  onSelectedRowsChange,
  ...props
}: HeaderRowProps<R, K>) {
  const width = columnMetrics.totalColumnWidth + getScrollbarSize();

  function handleAllRowsSelectionChange(checked: boolean) {
    if (!onSelectedRowsChange) return;

    const newSelectedRows = new Set<R[K]>();
    if (checked) {
      for (let i = 0; i < props.rowsCount; i++) {
        newSelectedRows.add(props.rowGetter(i)[props.rowKey]);
      }
    }

    onSelectedRowsChange(newSelectedRows);
  }

  return (
    <div
      className="rdg-header-row"
      style={{ width, height }}
    >
      {columnMetrics.columns.map(column => {
        return (
          <HeaderCell<R, K>
            key={column.key as string}
            column={column}
            lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
            height={height}
            onResize={props.onColumnResize}
            onHeaderDrop={props.onHeaderDrop}
            allRowsSelected={props.allRowsSelected}
            onAllRowsSelectionChange={handleAllRowsSelectionChange}
            draggableHeaderCell={props.draggableHeaderCell}
            onSort={props.onGridSort}
            sortColumn={props.sortColumn}
            sortDirection={props.sortDirection}
            scrollLeft={isFrozen(column) ? props.scrollLeft : undefined}
          />
        );
      })}
    </div>
  );
}
