import React from 'react';
import { DEFINE_SORT } from '../../enums';
import { CalculatedColumn } from '../../types';

const SORT_TEXT = {
  [DEFINE_SORT.ASC]: '\u25B2',
  [DEFINE_SORT.DESC]: '\u25BC',
  [DEFINE_SORT.NONE]: ''
} as const;

export interface Props<R> {
  column: CalculatedColumn<R>;
  children: React.ReactNode;
  sortColumn?: keyof R;
  sortDirection?: DEFINE_SORT;
  onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
}

export default function SortableHeaderCell<R>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  children
}: Props<R>) {
  sortDirection = sortColumn === column.key && sortDirection || DEFINE_SORT.NONE;
  function onClick() {
    if (!onSort) return;
    const sortDescendingFirst = column.sortDescendingFirst || false;
    let direction;
    switch (sortDirection) {
      case DEFINE_SORT.ASC:
        direction = sortDescendingFirst ? DEFINE_SORT.NONE : DEFINE_SORT.DESC;
        break;
      case DEFINE_SORT.DESC:
        direction = sortDescendingFirst ? DEFINE_SORT.ASC : DEFINE_SORT.NONE;
        break;
      default:
        direction = sortDescendingFirst ? DEFINE_SORT.DESC : DEFINE_SORT.ASC;
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
