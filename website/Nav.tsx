import { NavLink } from 'react-router-dom';
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
      <NavLink to="/common-features" end className={getActiveClassname}>
        Common Features
      </NavLink>
      <NavLink to="/all-features" end className={getActiveClassname}>
        All Features
      </NavLink>
      <NavLink to="/cell-navigation" end className={getActiveClassname}>
        Cell Navigation
      </NavLink>
      <NavLink to="/column-spanning" end className={getActiveClassname}>
        Column Spanning
      </NavLink>
      <NavLink to="/columns-reordering" end className={getActiveClassname}>
        Columns Reordering
      </NavLink>
      <NavLink to="/context-menu" end className={getActiveClassname}>
        Context Menu
      </NavLink>
      <NavLink to="/customizable-renderers" end className={getActiveClassname}>
        Customizable Renderers
      </NavLink>
      <NavLink to="/grouping" end className={getActiveClassname}>
        Grouping
      </NavLink>
      <NavLink to="/header-filters" end className={getActiveClassname}>
        Header Filters
      </NavLink>
      <NavLink to="/infinite-scrolling" end className={getActiveClassname}>
        Infinite Scrolling
      </NavLink>
      <NavLink to="/master-detail" end className={getActiveClassname}>
        Master Detail
      </NavLink>
      <NavLink to="/million-cells" end className={getActiveClassname}>
        A Million Cells
      </NavLink>
      <NavLink to="/no-rows" end className={getActiveClassname}>
        No Rows
      </NavLink>
      <NavLink to="/resizable-grid" end className={getActiveClassname}>
        Resizable Grid
      </NavLink>
      <NavLink to="/rows-reordering" end className={getActiveClassname}>
        Rows Reordering
      </NavLink>
      <NavLink to="/scroll-to-row" end className={getActiveClassname}>
        Scroll To Row
      </NavLink>
      <NavLink to="/tree-view" end className={getActiveClassname}>
        Tree View
      </NavLink>
      <NavLink to="/variable-row-height" end className={getActiveClassname}>
        Variable Row Height
      </NavLink>
      <NavLink to="/animation" end className={getActiveClassname}>
        Animation
      </NavLink>

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

function getActiveClassname({ isActive }: { isActive: boolean }) {
  return isActive ? activeNavClassname : '';
}
