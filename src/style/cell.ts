import { css } from '@linaria/core';

export const cell = css`
  contain: strict;
  contain: size layout style paint;
  padding: 0 8px;
  border-right: 1px solid var(--rdg-border-color);
  border-bottom: 1px solid var(--rdg-border-color);
  grid-row-start: var(--rdg-grid-row-start);
  background-color: inherit;

  white-space: nowrap;
  overflow: hidden;
  overflow: clip;
  text-overflow: ellipsis;
  outline: none;

  &[aria-selected='true'] {
    box-shadow: inset 0 0 0 2px var(--rdg-selection-color);
  }
`;

export const cellClassname = `rdg-cell ${cell}`;

export const cellFrozen = css`
  position: sticky;
  /* Should have a higher value than 0 to show up above unfrozen cells */
  z-index: 1;
`;

export const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;

export const cellFrozenLast = css`
  box-shadow: var(--rdg-frozen-cell-box-shadow);
`;

export const cellFrozenLastClassname = `rdg-cell-frozen-last ${cellFrozenLast}`;
