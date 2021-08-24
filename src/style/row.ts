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

  &[aria-selected='true'] {
    background-color: var(--row-selected-background-color);

    &:hover {
      background-color: var(--row-selected-hover-background-color);
    }
  }
`;

export const rowClassname = `rdg-row ${row}`;

const rowSelected = css`
  outline: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 2px var(--selection-color);
    pointer-events: none;
    z-index: 2;
  }

  > .${cell}:first-child {
    // preserve left border on the first frozen cell after scrolling to the right
    box-shadow: inset 2px 0 0 0 var(--selection-color);
  }
`;

export const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;
