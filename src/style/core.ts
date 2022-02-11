import { css } from '@linaria/core';
import { row } from './row';

const lightTheme = `
  --rdg-color: #000;
  --rdg-border-color: #ddd;
  --rdg-summary-border-color: #aaa;
  --rdg-background-color: hsl(0deg 0% 100%);
  --rdg-header-background-color: hsl(0deg 0% 97.5%);
  --rdg-row-hover-background-color: hsl(0deg 0% 96%);
  --rdg-row-selected-background-color: hsl(207deg 76% 92%);
  --row-selected-hover-background-color: hsl(207deg 76% 88%);

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
  --rdg-row-hover-background-color: hsl(0deg 0% 9%);
  --rdg-row-selected-background-color: hsl(207deg 76% 42%);
  --row-selected-hover-background-color: hsl(207deg 76% 38%);

  --rdg-checkbox-color: hsl(207deg 100% 79%);
  --rdg-checkbox-focus-color: hsl(207deg 100% 89%);
  --rdg-checkbox-disabled-border-color: #000;
  --rdg-checkbox-disabled-background-color: #333;
`;

const root = css`
  ${lightTheme}
  --rdg-selection-color: #66afe9;
  --rdg-font-size: 14px;

  display: grid;

  color-scheme: var(--rdg-color-scheme, light dark);

  /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
  /* We set a stacking context so internal elements don't render on top of external components. */
  contain: strict;
  contain: size layout style paint;
  content-visibility: auto;
  block-size: 350px;
  border: 1px solid var(--rdg-border-color);
  box-sizing: border-box;
  overflow: auto;
  user-select: none;
  background-color: var(--rdg-background-color);
  color: var(--rdg-color);
  font-size: var(--rdg-font-size);

  /* set stacking context in safari */
  @supports not (contain: strict) {
    position: relative;
    z-index: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* needed on Firefox */
  &::before {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    block-size: var(--rdg-grid-block-size);
    inline-size: var(--rdg-grid-inline-size);
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
`;

export const rootClassname = `rdg ${root}`;

const viewportDragging = css`
  &.${row} {
    cursor: move;
  }
`;

export const viewportDraggingClassname = `rdg-viewport-dragging ${viewportDragging}`;

export const focusSinkClassname = css`
  position: sticky;
  inset-inline-start: 0;
  grid-column-start: 1;
`;
