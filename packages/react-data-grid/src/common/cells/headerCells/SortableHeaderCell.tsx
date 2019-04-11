import React from 'react';
import { Column } from '../../types';

export enum DEFINE_SORT {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'NONE'
}

const SORT_TEXT = {
  [DEFINE_SORT.ASC]: '\u25B2',
  [DEFINE_SORT.DESC]: '\u25BC',
  [DEFINE_SORT.NONE]: ''
} as const;

export interface Props {
  columnKey: string;
  column: Column;
  onSort(columnKey: string, direction: DEFINE_SORT): void;
  sortDirection: DEFINE_SORT;
  sortDescendingFirst?: boolean;
  headerRenderer?: React.ReactElement;
}

export default function SortableHeaderCell(props: Props) {
  const { columnKey, column, onSort, sortDirection, headerRenderer, sortDescendingFirst } = props;
  function onClick() {
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
    onSort(columnKey, direction);
  }

  const content = headerRenderer ? React.cloneElement(headerRenderer, props) : column.name;
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <span className="pull-right">{SORT_TEXT[sortDirection]}</span>
      {content}
    </div>
  );
}
