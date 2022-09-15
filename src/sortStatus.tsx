import { css } from '@linaria/core';
import type { SortStatusProps, SortIconProps, SortPriorityProps } from './types';

const arrow = css`
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
`;

const arrowClassname = `rdg-sort-arrow ${arrow}`;

export default function sortStatus({ sortDirection, priority }: SortStatusProps) {
  return (
    <>
      {sortIcon({ sortDirection })}
      {sortPriority({ priority })}
    </>
  );
}

export function sortIcon({ sortDirection }: SortIconProps) {
  if (sortDirection === undefined) return null;

  return (
    <svg viewBox="0 0 12 8" width="12" height="8" className={arrowClassname} aria-hidden>
      <path d={sortDirection === 'ASC' ? 'M0 8 6 0 12 8' : 'M0 0 6 8 12 0'} />
    </svg>
  );
}

export function sortPriority({ priority }: SortPriorityProps) {
  return priority;
}
