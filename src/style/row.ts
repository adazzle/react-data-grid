import { css } from '@linaria/core';

import { cellFrozen } from './cell';

export const row = css`
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }

    /* Add box-shadow on the last frozen cell */
    > :nth-last-child(1 of .${cellFrozen}) {
      box-shadow: var(--rdg-cell-frozen-box-shadow);
    }
  }
`;

export const rowClassname = `rdg-row ${row}`;

export const rowSelected = css`
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
`;

export const rowSelectedClassname = 'rdg-row-selected';

export const rowSelectedWithFrozenCell = css`
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
`;

export const topSummaryRowClassname = 'rdg-top-summary-row';

export const bottomSummaryRowClassname = 'rdg-bottom-summary-row';
