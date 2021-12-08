import { css } from '@linaria/core';

export const row = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  grid-template-rows: var(--rdg-row-height);
  grid-template-columns: var(--rdg-template-columns);
  position: absolute;
  left: 0;
  width: var(--rdg-row-width);
  height: var(--rdg-row-height); /* needed on Firefox */
  line-height: var(--rdg-row-height);
  background-color: var(--rdg-background-color);

  &:hover {
    background-color: var(--rdg-row-hover-background-color);
  }

  &[aria-selected='true'] {
    background-color: var(--rdg-row-selected-background-color);

    &:hover {
      background-color: var(--row-selected-hover-background-color);
    }
  }
`;

export const rowClassname = `rdg-row ${row}`;
