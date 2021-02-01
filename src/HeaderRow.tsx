import { useCallback, memo } from 'react';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn } from './types';
import { assertIsValidKeyGetter } from './utils';
import type { DataGridProps } from './DataGrid';
import { headerRowClassname } from './style';

type SharedDataGridProps<R, SR, FR> = Pick<DataGridProps<R, SR, FR>,
  | 'rows'
  | 'onSelectedRowsChange'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'rowKeyGetter'
>;

export interface HeaderRowProps<R, SR, FR> extends SharedDataGridProps<R, SR, FR> {
  columns: readonly CalculatedColumn<R, SR, FR>[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR, FR>, width: number) => void;
}

function HeaderRow<R, SR, FR>({
  columns,
  rows,
  rowKeyGetter,
  onSelectedRowsChange,
  allRowsSelected,
  onColumnResize,
  sortColumn,
  sortDirection,
  onSort
}: HeaderRowProps<R, SR, FR>) {
  const handleAllRowsSelectionChange = useCallback((checked: boolean) => {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter(rowKeyGetter);

    const newSelectedRows = new Set<React.Key>();
    if (checked) {
      for (const row of rows) {
        newSelectedRows.add(rowKeyGetter(row));
      }
    }

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
          <HeaderCell
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

export default memo(HeaderRow) as <R, SR, FR>(props: HeaderRowProps<R, SR, FR>) => JSX.Element;
