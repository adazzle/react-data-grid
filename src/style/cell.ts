import { css } from '@linaria/core';

export const cell = css`
  @layer rdg.Cell {
    /*
    Cannot use these because of a Chromium bug:
    https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
    once this is fixed we can also remove "position: relative:"
    contain: strict;
    */
    position: relative; /* needed for absolute positioning to work */
    contain: size style;
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
`;

export const cellClassname = `rdg-cell ${cell}`;

// max-content does not work when size containment is enabled
// `contain: content` leads to odd subpixel mismatches when combined with colSpan
export const autosizeColumnsClassname = css`
  @layer rdg.Root {
    .${cell} {
      contain: style;
    }
  }
`;

export const cellFrozen = css`
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
`;

export const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;

export const cellFrozenLast = css`
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
`;

export const cellFrozenLastClassname = `rdg-cell-frozen-last ${cellFrozenLast}`;
