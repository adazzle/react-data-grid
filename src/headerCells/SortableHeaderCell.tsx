import React from 'react';
import { HeaderCellProps } from '../HeaderCell';
import { SortDirection } from '../common/enums';

const SORT_TEXT = {
  ASC: '\u25B2',
  DESC: '\u25BC',
  NONE: ''
} as const;

type SharedHeaderCellProps<R> = Pick<HeaderCellProps<R>,
  | 'column'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
>;

export interface Props<R> extends SharedHeaderCellProps<R> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  children
}: Props<R>) {
  sortDirection = sortColumn === column.key && sortDirection || 'NONE';
  function onClick() {
    if (!onSort) return;
    const sortDescendingFirst = column.sortDescendingFirst || false;
    let direction: SortDirection;
    switch (sortDirection) {
      case 'ASC':
        direction = sortDescendingFirst ? 'NONE' : 'DESC';
        break;
      case 'DESC':
        direction = sortDescendingFirst ? 'ASC' : 'NONE';
        break;
      default:
        direction = sortDescendingFirst ? 'DESC' : 'ASC';
        break;
    }
    onSort(column.key, direction);
  }

  return (
    <span className="rdg-header-sort-cell" onClick={onClick}>
      <span className="rdg-header-sort-name">{children}</span>
      <span>{SORT_TEXT[sortDirection]}</span>
    </span>
  );
}
