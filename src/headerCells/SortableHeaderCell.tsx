import React from 'react';
import { HeaderCellProps } from '../HeaderCell';
import { SortDirection } from '../common/enums';

const SORT_TEXT = {
  [SortDirection.ASC]: '\u25B2',
  [SortDirection.DESC]: '\u25BC',
  [SortDirection.NONE]: ''
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
  sortDirection = sortColumn === column.key && sortDirection || SortDirection.NONE;
  function onClick() {
    if (!onSort) return;
    const sortDescendingFirst = column.sortDescendingFirst || false;
    let direction;
    switch (sortDirection) {
      case SortDirection.ASC:
        direction = sortDescendingFirst ? SortDirection.NONE : SortDirection.DESC;
        break;
      case SortDirection.DESC:
        direction = sortDescendingFirst ? SortDirection.ASC : SortDirection.NONE;
        break;
      default:
        direction = sortDescendingFirst ? SortDirection.DESC : SortDirection.ASC;
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
