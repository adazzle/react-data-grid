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
    <span className={headerSortCellClassname} onClick={onClick}>
      <span className={headerSortNameClassname}>{children}</span>
      {sortText && <span>{priority}</span>}
      <span>{sortText}</span>
    </span>
  );
}
