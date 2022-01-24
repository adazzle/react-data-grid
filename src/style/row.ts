import { css } from '@linaria/core';

import { cell, cellFrozenLast } from '../style';

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

const topBoxShadow = 'inset 0 2px 0 0 var(--rdg-selection-color)';
const rightBoxShadow = 'inset -2px 0 0 0 var(--rdg-selection-color)';
const bottomBoxShadow = 'inset 0 -2px 0 0 var(--rdg-selection-color)';
const leftBoxShadow = 'inset 2px 0 0 0 var(--rdg-selection-color)';

const rowSelected = css`
  outline: none;

  > .${cell} {
    box-shadow: ${topBoxShadow}, ${bottomBoxShadow};
    &:first-child {
      box-shadow: ${topBoxShadow}, ${bottomBoxShadow}, ${leftBoxShadow};
    }
    &:last-child {
      box-shadow: ${topBoxShadow}, ${bottomBoxShadow}, ${rightBoxShadow};
    }
  }

  > .${cellFrozenLast} {
    box-shadow: ${topBoxShadow}, ${bottomBoxShadow}, var(--rdg-frozen-cell-box-shadow);
  }
`;

export const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;
