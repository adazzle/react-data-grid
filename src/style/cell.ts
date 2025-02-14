import { css } from '@linaria/core';

export const cell = css`
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://issues.chromium.org/issues/40840864
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    align-content: center;
    background-color: inherit;

    white-space: nowrap;
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

export const cellFrozen = css`
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;

    /* Add box-shadow on the last frozen cell */
    &:nth-last-child(1 of &) {
      box-shadow: var(--rdg-cell-frozen-box-shadow);
    }
  }
`;

export const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;


export const cellRightFrozen = css`
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
    right: 0;
    /* Add box-shadow on the last frozen cell */
    &:nth-child(1 of &) {
      box-shadow: var(--rdg-cell-right-frozen-box-shadow);
    }
  }
`;

export const cellRightFrozenClassname = `rdg-cell-frozen ${cellRightFrozen}`;
