import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
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

const activeNavClassname = css`
  font-weight: 500;

  @media (prefers-color-scheme: light) {
    background-color: hsl(210deg 50% 80%);
  }
  @media (prefers-color-scheme: dark) {
    background-color: hsl(210deg 50% 40%);
  }

  a&:hover {
    @media (prefers-color-scheme: light) {
      background-color: hsl(210deg 50% 70%);
    }
    @media (prefers-color-scheme: dark) {
      background-color: hsl(210deg 50% 50%);
    }
  }
`;

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
      <ActiveLink href="/common-features">Common Features</ActiveLink>
      <ActiveLink href="/all-features">All Features</ActiveLink>
      <ActiveLink href="/cell-navigation">Cell Navigation</ActiveLink>
      <ActiveLink href="/column-spanning">Column Spanning</ActiveLink>
      <ActiveLink href="/columns-reordering">Columns Reordering</ActiveLink>
      <ActiveLink href="/context-menu">Context Menu</ActiveLink>
      <ActiveLink href="/customizable-renderers">Customizable Renderers</ActiveLink>
      <ActiveLink href="/grouping">Grouping</ActiveLink>
      <ActiveLink href="/header-filters">Header Filters</ActiveLink>
      <ActiveLink href="/infinite-scrolling">Infinite Scrolling</ActiveLink>
      <ActiveLink href="/master-detail">Master Detail</ActiveLink>
      <ActiveLink href="/million-cells">A Million Cells</ActiveLink>
      <ActiveLink href="/no-rows">No Rows</ActiveLink>
      <ActiveLink href="/resizable-grid">Resizable Grid</ActiveLink>
      <ActiveLink href="/rows-reordering">Rows Reordering</ActiveLink>
      <ActiveLink href="/scroll-to-row">Scroll To Row</ActiveLink>
      <ActiveLink href="/tree-view">Tree View</ActiveLink>
      <ActiveLink href="/variable-row-height">Variable Row Height</ActiveLink>
      <ActiveLink href="/animation">Animation</ActiveLink>

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

function ActiveLink({ href, ...props }: React.ComponentProps<typeof Link>) {
  // TODO: is this the best way to add styles to active link?
  const segment = useSelectedLayoutSegment();
  const className =
    segment !== null && href.toString().endsWith(segment) ? activeNavClassname : undefined;

  return <Link href={href} {...props} className={className} />;
}
