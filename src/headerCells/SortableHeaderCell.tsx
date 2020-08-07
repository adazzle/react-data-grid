import React from 'react';
import { HeaderCellProps } from '../HeaderCell';
import { SortDirection } from '../enums';

const SORT_TEXT = {
  ASC: '\u25B2',
  DESC: '\u25BC',
  NONE: ''
} as const;

type SharedHeaderCellProps<R, SR> = Pick<HeaderCellProps<R, SR>,
  | 'column'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
>;

export interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  children
}: Props<R, SR>) {
  let tempSortDirection: 'ASC' | 'DESC' | 'NONE' = 'NONE';
  if (typeof sortColumn === 'string' && !(sortDirection instanceof Array)) {
    tempSortDirection = sortColumn === column.key && sortDirection || 'NONE';
  }

  if (sortDirection instanceof Array) {
    sortDirection.some(ele => {
      if (ele.columnKey === column.key) {
        tempSortDirection = ele.sortDirection;
        return true;
      }
      return false;
    });
  }

  function onClick() {
    if (!onSort) return;
    const sortDescendingFirst = column.sortDescendingFirst || false;
    let direction: SortDirection;
    switch (tempSortDirection) {
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
      <span>{SORT_TEXT[tempSortDirection]}</span>
    </span>
  );
}
