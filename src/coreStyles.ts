import { css } from '@linaria/core';

const lightTheme = `
  --color: #000;
  --border-color: #ddd;
  --summary-border-color: #aaa;
  --background-color: #fff;
  --header-background-color: #f9f9f9;
  --row-hover-background-color: #f5f5f5;
  --row-selected-background-color: #dbecfa;
  --row-selected-hover-background-color: #c9e3f8;

  --checkbox-color: #005295;
  --checkbox-focus-color: lighten(#005295, 40%);
  --checkbox-disabled-border-color: #ccc;
  --checkbox-disabled-background-color: #ddd;
`;

const darkTheme = `
  --color: #ddd;
  --border-color: #444;
  --summary-border-color: #555;
  --background-color: #222;
  --header-background-color: #1c1c1c;
  --row-hover-background-color: #181818;
  --row-selected-background-color: #1a73bc;
  --row-selected-hover-background-color: #1868aa;

  --checkbox-color: lighten(#005295, 50%);
  --checkbox-focus-color: lighten(#005295, 60%);
  --checkbox-disabled-border-color: #000;
  --checkbox-disabled-background-color: #333;
`;

export const rootClass = css`
  ${lightTheme}
  --selection-color: #66afe9;
  --font-size: 14px;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
  // We set a stacking context so internal elements don't render on top of external components.
  contain: strict;
  contain: size layout style paint;
  content-visibility: auto;
  height: 350px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  overflow: auto;
  user-select: none;
  background-color: var(--background-color);
  color: var(--color);
  font-size: var(--font-size);

  // set stacking context in safari
  @supports not (contain: strict) {
    position: relative;
    z-index: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  &.rdg-dark {
    ${darkTheme}
  }

  @media (prefers-color-scheme: dark) {
    &:not(.rdg-light) {
      ${darkTheme}
    }
  }
`;

export const focusSinkClass = css`
  position: sticky;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  outline: 0;
`;

export const viewportDraggingClass = css`
  &.rdg-row {
    cursor: move;
  }
`;
