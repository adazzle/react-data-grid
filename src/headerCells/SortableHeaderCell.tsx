import { css } from '@linaria/core';
import type { HeaderCellProps } from '../HeaderCell';
import type { SortDirection } from '../types';

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
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'sortData'
>;

interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  sortData,
  children
}: Props<R, SR>) {

  const index = sortData?.findIndex(sort => sort.sortColumn === column.key);
  const priority = (index !== undefined) ? index + 1 : -1;
  sortDirection = (index !== undefined &&  priority > 0) ? sortData?.[index].direction : "NONE";
  
  
  let sortText = '';
  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

  function onClick(e: any) {
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
    onSort(column.key, direction, e.ctrlKey);
  }

  return (
    <span className={headerSortCellClassname} onClick={e=>onClick(e)}>
      <span className={headerSortNameClassname}>{children}</span>
        {sortText && <span>{priority}</span>}
      <span>{sortText}</span>
    </span>
  );
}
