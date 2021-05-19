import { css } from '@linaria/core';

const headerRow = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  grid-template-columns: var(--template-columns);
  grid-template-rows: var(--header-row-height);
  height: var(--header-row-height); // needed on Firefox
  line-height: var(--header-row-height);
  width: var(--row-width);
  position: sticky;
  top: 0;
  background-color: var(--header-background-color);
  font-weight: bold;
  z-index: 3;
  touch-action: none;
`;

export const headerRowClassname = `rdg-header-row ${headerRow}`;
