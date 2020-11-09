import clsx from 'clsx';

import type { CalculatedColumn } from './types';
import type { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import ResizableHeaderCell from './headerCells/ResizableHeaderCell';
import type { SortDirection } from './enums';

function getAriaSort(sortDirection?: SortDirection) {
  switch (sortDirection) {
    case 'ASC':
      return 'ascending';
    case 'DESC':
      return 'descending';
    default:
      return 'none';
  }
}

type SharedHeaderRowProps<R, SR> = Pick<HeaderRowProps<R, SR>,
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'allRowsSelected'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

export default function HeaderCell<R, SR>({
  column,
  onResize,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortColumn,
  sortDirection,
  onSort
}: HeaderCellProps<R, SR>) {
  function getCell() {
    if (column.headerRenderer) {
      return (
        <column.headerRenderer
          column={column}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={onSort}
          allRowsSelected={allRowsSelected}
          onAllRowsSelectionChange={onAllRowsSelectionChange}
        />
      );
    }

    if (column.sortable) {
      return (
        <SortableHeaderCell
          column={column}
          onSort={onSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        >
          {column.name}
        </SortableHeaderCell>
      );
    }

    return column.name;
  }

  let cell = getCell();

  const className = clsx('rdg-cell', column.headerCellClass, {
    'rdg-cell-resizable': column.resizable,
    'rdg-cell-frozen': column.frozen,
    'rdg-cell-frozen-last': column.isLastFrozenColumn
  });
  const style: React.CSSProperties = {
    width: column.width,
    left: column.left
  };

  cell = (
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      aria-sort={sortColumn === column.key ? getAriaSort(sortDirection) : undefined}
      className={className}
      style={style}
    >
      {cell}
    </div>
  );

  if (column.resizable) {
    cell = (
      <ResizableHeaderCell
        column={column}
        onResize={onResize}
      >
        {cell as React.ReactElement<React.ComponentProps<'div'>>}
      </ResizableHeaderCell>
    );
  }

  return cell;
}
