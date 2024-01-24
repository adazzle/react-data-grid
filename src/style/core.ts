import { css } from '@linaria/core';

import { cell } from './cell';
import { bottomSummaryRowClassname, row, topSummaryRowClassname } from './row';

const lightTheme = `
  --rdg-color: #000;
  --rdg-border-color: #ddd;
  --rdg-summary-border-color: #aaa;
  --rdg-background-color: hsl(0deg 0% 100%);
  --rdg-header-background-color: hsl(0deg 0% 97.5%);
  --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);
  --rdg-row-hover-background-color: hsl(0deg 0% 96%);
  --rdg-row-selected-background-color: hsl(207deg 76% 92%);
  --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);

  --rdg-checkbox-color: hsl(207deg 100% 29%);
  --rdg-checkbox-focus-color: hsl(207deg 100% 69%);
  --rdg-checkbox-disabled-border-color: #ccc;
  --rdg-checkbox-disabled-background-color: #ddd;
`;

const darkTheme = `
  --rdg-color: #ddd;
  --rdg-border-color: #444;
  --rdg-summary-border-color: #555;
  --rdg-background-color: hsl(0deg 0% 13%);
  --rdg-header-background-color: hsl(0deg 0% 10.5%);
  --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);
  --rdg-row-hover-background-color: hsl(0deg 0% 9%);
  --rdg-row-selected-background-color: hsl(207deg 76% 42%);
  --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);

  --rdg-checkbox-color: hsl(207deg 100% 79%);
  --rdg-checkbox-focus-color: hsl(207deg 100% 89%);
  --rdg-checkbox-disabled-border-color: #000;
  --rdg-checkbox-disabled-background-color: #333;
`;

const root = css`
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    ${lightTheme}
    --rdg-selection-color: #66afe9;
    --rdg-font-size: 14px;
    --rdg-cell-frozen-box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);

    display: grid;

    color-scheme: var(--rdg-color-scheme, light dark);

    /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
    /* We set a stacking context so internal elements don't render on top of external elements. */
    /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
    contain: content;
    content-visibility: auto;
    block-size: 350px;
    border: 1px solid var(--rdg-border-color);
    box-sizing: border-box;
    overflow: auto;
    background-color: var(--rdg-background-color);
    color: var(--rdg-color);
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      ${darkTheme}
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        ${darkTheme}
      }
    }

    > :nth-last-child(1 of .${topSummaryRowClassname}) {
      > .${cell} {
        border-block-end: 2px solid var(--rdg-summary-border-color);
      }
    }

    > :nth-child(1 of .${bottomSummaryRowClassname}) {
      > .${cell} {
        border-block-start: 2px solid var(--rdg-summary-border-color);
      }
    }
  }
`;

export const rootClassname = `rdg ${root}`;

const viewportDragging = css`
  @layer rdg.Root {
    user-select: none;

    & .${row} {
      cursor: move;
    }
  }
`;

export const viewportDraggingClassname = `rdg-viewport-dragging ${viewportDragging}`;

export const focusSinkClassname = css`
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
`;

export const focusSinkHeaderAndSummaryClassname = css`
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
`;
