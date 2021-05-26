import { css } from '@linaria/core';
import type { HeaderRendererProps } from '../types';
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
  'sortDirection' | 'onSort' | 'priority'
>;
interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
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

  return (
    <span className={headerSortCellClassname} onClick={(e) => onSort(e.ctrlKey)}>
      <span className={headerSortNameClassname}>{children}</span>
      <span>
        {sortText}
        {priority}
      </span>
    </span>
  );
}
