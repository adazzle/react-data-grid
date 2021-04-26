import { css } from '@linaria/core';
import type { HeaderCellProps } from '../HeaderCell';
import type { SortDirection } from '../types';
import {MouseEvent} from 'react';
const headerSortCell = css`
  cursor: pointer;
  display: flex;
`;

const headerSortCellClassname = `rdg-header-sort-cell ${headerSortCell}`;

const headerSortName = css`
  flex-grow: 1;
  overflow: hidden;
  overflow: clip;
  text-overflow: ellipsis;
`;

const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`;

type SharedHeaderCellProps<R, SR> = Pick<HeaderCellProps<R, SR>,
  | 'column'
  | 'sortDirection'
  | 'onSort'
  | 'sortColumns'
>;

interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortDirection,
  sortColumns,
  children
}: Props<R, SR>) {

  const index =   sortColumns?.findIndex(sort => sort.columnKey === column.key);
  const priority = (index !== undefined) ? index + 1 : -1;
  sortDirection = (index !== undefined &&  priority > 0) ? sortColumns?.[index].direction : undefined;
  
  
  let sortText = '';
  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

  function onClick(event: MouseEvent<HTMLSpanElement>) {
    if (!onSort) return;
    const { sortDescendingFirst } = column;
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
    onSort(column.key, direction, event.ctrlKey);
  }

  return (
    <span className={headerSortCellClassname} onClick={e=>onClick(e)}>
      <span className={headerSortNameClassname}>{children}</span>
        {sortText && <span>{priority}</span>}
      <span>{sortText}</span>
    </span>
  );
}
