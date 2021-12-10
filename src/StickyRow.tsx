import { css } from '@linaria/core';
import { memo } from 'react';

export interface StickyRowProps {
  
    content: string
    top: number
    isStuck: boolean
}

const headerRow = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  height: var(--header-row-height); /* needed on Firefox */
  line-height: var(--header-row-height);
  width: var(--row-width);
  position: sticky;
  top: 0;
  background-color: var(--header-background-color);
  font-weight: bold;
  z-index: 3;
  outline: none;

  &[aria-selected='true'] {
    box-shadow: inset 0 0 0 2px var(--selection-color);
  }
`;

const stickyRowClassname = `rdg-sticky-row ${headerRow}`;

function StickyRow({
  content,
  top,
  isStuck
}: StickyRowProps) {
  return (
    <div
      key={top.toString()}
      role="row"
      aria-rowindex={2} // aria-rowindex is 1 based
      className={stickyRowClassname}
      style={{
          top,
          position: isStuck ? 'sticky' : 'absolute'
      }}
    >
      {content}
    </div>
  );
}

export default memo(StickyRow) as (
  props: StickyRowProps
) => JSX.Element;
