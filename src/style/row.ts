import { css } from '@linaria/core';
import { cell } from './cell';

export const row = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  grid-template-rows: var(--row-height);
  grid-template-columns: var(--template-columns);
  position: absolute;
  left: 0;
  width: var(--row-width);
  height: var(--row-height); // needed on Firefox
  line-height: var(--row-height);
  background-color: var(--background-color);

  &:hover {
    background-color: var(--row-hover-background-color);
  }
`;

export const rowClassname = `rdg-row ${row}`;

export const rowSelected = css`
  background-color: var(--row-selected-background-color);

  &:hover {
    background-color: var(--row-selected-hover-background-color);
  }
`;

export const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;

const summaryRow = css`
  position: sticky;
  z-index: 3;

  > .${cell} {
    border-top: 2px solid var(--summary-border-color);
  }
`;

export const summaryRowClassname = `rdg-summary-row ${summaryRow}`;
