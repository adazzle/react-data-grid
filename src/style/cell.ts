import { css } from '@linaria/core';

export const cell = css`
  contain: strict;
  contain: size layout style paint;
  padding: 0 8px;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background-color: inherit;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const cellClassname = `rdg-cell ${cell}`;

const cellFrozen = css`
  position: sticky;
  // Should have a higher value than 0 to show up above unfrozen cells
  z-index: 1;
`;

export const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;

export const cellFrozenLast = css`
  box-shadow: 2px 0 5px -2px rgba(136, 136, 136, .3);
`;

export const cellFrozenLastClassname = `rdg-cell-frozen-last ${cellFrozenLast}`;

const cellSelected = css`
  box-shadow: inset 0 0 0 2px var(--selection-color);
`;

export const cellSelectedClassname = `rdg-cell-selected ${cellSelected}`;
