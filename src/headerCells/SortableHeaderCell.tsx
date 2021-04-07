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

interface SharedHeaderCellProps<R, SR> extends Pick<HeaderCellProps<R, SR>, 'column'> {
  sortDirection?: SortDirection;
  onSort?: (columnKey: string, direction: SortDirection) => void;
}

interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortDirection = 'NONE',
  children
}: Props<R, SR>) {
  let sortText = '';
  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

  function onClick() {
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
    onSort(column.key, direction);
  }

  return (
    <span className={headerSortCellClassname} onClick={onClick}>
      <span className={headerSortNameClassname}>{children}</span>
      <span>{sortText}</span>
    </span>
  );
}
