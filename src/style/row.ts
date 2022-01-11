import { css } from '@linaria/core';

export const row = css`
  display: contents;
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
