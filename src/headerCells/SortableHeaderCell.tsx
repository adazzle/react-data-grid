import { css } from '@linaria/core';
import { useFocusRef } from '../hooks';
import type { HeaderRendererProps } from '../types';

const headerSortCell = css`
  cursor: pointer;
  display: flex;

  &:focus {
    outline: none;
  }
`;

const headerSortCellClassname = `rdg-header-sort-cell ${headerSortCell}`;

const headerSortName = css`
  flex-grow: 1;
  overflow: hidden;
  overflow: clip;
  text-overflow: ellipsis;
`;

const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`;

const arrow = css`
  fill: currentColor;

  > path {
    transition: d 0.1s;
  }
`;

const arrowClassname = `rdg-sort-arrow ${arrow}`;

type SharedHeaderCellProps<R, SR> = Pick<
  HeaderRendererProps<R, SR>,
  'sortDirection' | 'onSort' | 'priority' | 'isCellSelected'
>;

interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  onSort,
  sortDirection,
  priority,
  children,
  isCellSelected
}: Props<R, SR>) {
  const ref = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      onSort(event.ctrlKey || event.metaKey);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
    onSort(event.ctrlKey || event.metaKey);
  }

  return (
    <span
      ref={ref}
      tabIndex={-1}
      className={headerSortCellClassname}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={headerSortNameClassname}>{children}</span>
      <span>
        {sortDirection !== undefined && (
          <svg viewBox="0 0 12 8" width="12" height="8" className={arrowClassname} aria-hidden>
            <path d={sortDirection === 'ASC' ? 'M0 8 6 0 12 8' : 'M0 0 6 8 12 0'} />
          </svg>
        )}
        {priority}
      </span>
    </span>
  );
}
