import { css } from '@linaria/core';

const headerRowAndFilterRow = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  grid-template-columns: var(--template-columns);
  width: var(--row-width);
  position: sticky;
  background-color: var(--header-background-color);
  font-weight: bold;
  z-index: 3;
`;

const headerRow = css`
  grid-template-rows: var(--header-row-height);
  height: var(--header-row-height); // needed on Firefox
  line-height: var(--header-row-height);
  top: 0;
  touch-action: none;
`;

export const headerRowClassname = `rdg-header-row ${headerRowAndFilterRow} ${headerRow}`;

const filterRow = css`
  grid-template-rows: var(--filter-row-height);
  height: var(--filter-row-height); // needed on Firefox
  line-height: var(--filter-row-height);
  top: var(--header-row-height);
`;

export const filterRowClassname = `rdg-filter-row ${headerRowAndFilterRow} ${filterRow}`;
