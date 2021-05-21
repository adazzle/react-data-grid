import { css } from '@linaria/core';
import type { HeaderRendererProps, SortDirection } from '../types';
import type { MouseEvent } from 'react';
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

type SharedHeaderCellProps<R, SR> = Pick<
  HeaderRendererProps<R, SR>,
  'column' | 'sortDirection' | 'onSort' | 'priority'
>;
interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortDirection,
  priority,
  children
}: Props<R, SR>) {
  let sortText = '';
  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

  function onClick(event: MouseEvent<HTMLSpanElement>) {
    const { sortDescendingFirst } = column;
    let direction: SortDirection;
    if (sortDirection === 'ASC' && !sortDescendingFirst) direction = 'DESC';
    else if (sortDirection === 'DESC' && sortDescendingFirst) direction = 'ASC';
    else direction = sortDescendingFirst ? 'DESC' : 'ASC';
    onSort(column.key, direction, event.ctrlKey);
  }

  return (
    <span className={headerSortCellClassname} onClick={onClick}>
      <span className={headerSortNameClassname}>{children}</span>
      <span>
        {sortText}
        {priority}
      </span>
    </span>
  );
}
