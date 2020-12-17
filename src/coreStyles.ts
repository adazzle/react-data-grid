import { css } from '@linaria/core';

export const rootClass = css`
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

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  // set stacking context in safari
  @supports not (contain: strict) {
    & {
      position: relative;
      z-index: 0;
    }
  }
`;
