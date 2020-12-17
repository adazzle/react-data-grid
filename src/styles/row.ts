import { css } from '@linaria/core';

export const row = css`
  contain: strict;
  contain: size layout style paint;
  display: flex;
  position: absolute;
  left: 0;
  width: var(--row-width);
  height: var(--row-height);
  line-height: var(--row-height);
  background-color: var(--background-color);

  &:hover {
    background-color: var(--row-hover-background-color);
  }
`;

export const rowClassname = `rdg-row ${row}`;

const rowSelected = css`
  background-color: var(--row-selected-background-color);

  &:hover {
    background-color: var(--row-selected-hover-background-color);
  }
`;

export const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;

const summaryRow = css`
  position: sticky;
  z-index: 3;

  > .rdg-cell {
    border-top: 2px solid var(--summary-border-color);
  }
`;

export const summaryRowClassname = `rdg-summary-row ${summaryRow}`;
