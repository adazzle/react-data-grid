import React from 'react';
import { isElement } from 'react-is';
import { HeaderRowType, DEFINE_SORT } from '../../enums';
import { CalculatedColumn } from '../../types';

const SORT_TEXT = {
  [DEFINE_SORT.ASC]: '\u25B2',
  [DEFINE_SORT.DESC]: '\u25BC',
  [DEFINE_SORT.NONE]: ''
} as const;

export interface Props<R> {
  column: CalculatedColumn<R>;
  rowType: HeaderRowType;
  onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
  sortDirection: DEFINE_SORT;
  sortDescendingFirst: boolean;
  allRowsSelected: boolean;
  onAllRowsSelectionChange(checked: boolean): void;
}

export default function SortableHeaderCell<R>(props: Props<R>) {
  const { column, rowType, onSort, sortDirection, sortDescendingFirst, allRowsSelected, onAllRowsSelectionChange } = props;
  function onClick() {
    if (!onSort) return;
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

  const { headerRenderer } = column;
  const content = !headerRenderer
    ? column.name
    : isElement(headerRenderer)
      ? React.cloneElement(headerRenderer, { column })
      : React.createElement(headerRenderer, {
        column,
        rowType,
        allRowsSelected,
        onAllRowsSelectionChange
      });

  return (
    <span className="rdg-header-sort-cell" onClick={onClick}>
      <span className="rdg-header-sort-name">{content}</span>
      <span>{SORT_TEXT[sortDirection]}</span>
    </span>
  );
}
