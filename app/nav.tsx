import Link from 'next/link';
import { css } from '@linaria/core';

import type { Direction } from '../src/types';

const navClassname = css`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  @media (prefers-color-scheme: light) {
    border-inline-start: 4px solid hsl(210deg 50% 80%);
  }
  @media (prefers-color-scheme: dark) {
    border-inline-start: 4px solid hsl(210deg 50% 40%);
  }

  h1,
  h2 {
    margin: 8px;
  }

  a {
    color: inherit;
    font-size: 14px;
    line-height: 22px;
    text-decoration: none;
    padding-block: 0;
    padding-inline: 16px;
    transition: 0.1s background-color;

    &:hover {
      @media (prefers-color-scheme: light) {
        background-color: hsl(210deg 50% 90%);
      }
      @media (prefers-color-scheme: dark) {
        background-color: hsl(210deg 50% 30%);
      }
    }
  }
`;

// const activeNavClassname = css`
//   font-weight: 500;

//   @media (prefers-color-scheme: light) {
//     background-color: hsl(210deg 50% 80%);
//   }
//   @media (prefers-color-scheme: dark) {
//     background-color: hsl(210deg 50% 40%);
//   }

//   a&:hover {
//     @media (prefers-color-scheme: light) {
//       background-color: hsl(210deg 50% 70%);
//     }
//     @media (prefers-color-scheme: dark) {
//       background-color: hsl(210deg 50% 50%);
//     }
//   }
// `;

const rtlCheckboxClassname = css`
  padding-inline-start: 8px;
`;

interface Props {
  direction: Direction;
  onDirectionChange: (direction: Direction) => void;
}

export default function Nav({ direction, onDirectionChange }: Props) {
  return (
    <nav className={navClassname}>
      <h1>react-data-grid</h1>

      <h2>Demos</h2>
      <Link href="/common-features">Common Features</Link>
      <Link href="/all-features">All Features</Link>
      <Link href="/cell-navigation">Cell Navigation</Link>
      <Link href="/column-spanning">Column Spanning</Link>
      <Link href="/columns-reordering">Columns Reordering</Link>
      <Link href="/context-menu">Context Menu</Link>
      <Link href="/customizable-renderers">Customizable Renderers</Link>
      <Link href="/grouping">Grouping</Link>
      <Link href="/header-filters">Header Filters</Link>
      <Link href="/infinite-scrolling">Infinite Scrolling</Link>
      <Link href="/master-detail">Master Detail</Link>
      <Link href="/million-cells">A Million Cells</Link>
      <Link href="/no-rows">No Rows</Link>
      <Link href="/resizable-grid">Resizable Grid</Link>
      <Link href="/rows-reordering">Rows Reordering</Link>
      <Link href="/scroll-to-row">Scroll To Row</Link>
      <Link href="/tree-view">Tree View</Link>
      <Link href="/variable-row-height">Variable Row Height</Link>
      <Link href="/animation">Animation</Link>

      <h2>Links</h2>
      <a
        href="https://github.com/adazzle/react-data-grid/blob/main/README.md"
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
      <a
        href="https://github.com/adazzle/react-data-grid/blob/main/CHANGELOG.md"
        target="_blank"
        rel="noreferrer"
      >
        Changelog
      </a>
      <a
        href="https://github.com/adazzle/react-data-grid/discussions"
        target="_blank"
        rel="noreferrer"
      >
        Discussions
      </a>
      <a href="https://github.com/adazzle/react-data-grid/issues" target="_blank" rel="noreferrer">
        Issues
      </a>

      <h2>Direction</h2>
      <label className={rtlCheckboxClassname}>
        <input
          type="checkbox"
          checked={direction === 'rtl'}
          onChange={() => onDirectionChange(direction === 'rtl' ? 'ltr' : 'rtl')}
        />
        Right to left
      </label>
    </nav>
  );
}
