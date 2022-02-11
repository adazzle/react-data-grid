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

const rowSelected = css`
  outline: 2px solid var(--rdg-selection-color);
  outline-offset: -2px;
`;

export const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;

export const rowSelectedWithFrozenCell = css`
  &::before {
    content: '';
    position: sticky;
    inset-inline-start: 0;
    border-inline-start: 2px solid var(--rdg-selection-color);
  }
`;
