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
      <NavLink to="/common-features" exact activeClassName={activeNavClassname}>
        Common Features
      </NavLink>
      <NavLink to="/all-features" exact activeClassName={activeNavClassname}>
        All Features
      </NavLink>
      <NavLink to="/cell-navigation" exact activeClassName={activeNavClassname}>
        Cell Navigation
      </NavLink>
      <NavLink to="/column-spanning" exact activeClassName={activeNavClassname}>
        Column Spanning
      </NavLink>
      <NavLink to="/columns-reordering" exact activeClassName={activeNavClassname}>
        Columns Reordering
      </NavLink>
      <NavLink to="/context-menu" exact activeClassName={activeNavClassname}>
        Context Menu
      </NavLink>
      <NavLink to="/customizable-components" exact activeClassName={activeNavClassname}>
        Customizable Components
      </NavLink>
      <NavLink to="/grouping" exact activeClassName={activeNavClassname}>
        Grouping
      </NavLink>
      <NavLink to="/header-filters" exact activeClassName={activeNavClassname}>
        Header Filters
      </NavLink>
      <NavLink to="/infinite-scrolling" exact activeClassName={activeNavClassname}>
        Infinite Scrolling
      </NavLink>
      <NavLink to="/master-detail" exact activeClassName={activeNavClassname}>
        Master Detail
      </NavLink>
      <NavLink to="/million-cells" exact activeClassName={activeNavClassname}>
        A Million Cells
      </NavLink>
      <NavLink to="/no-rows" exact activeClassName={activeNavClassname}>
        No Rows
      </NavLink>
      <NavLink to="/resizable-grid" exact activeClassName={activeNavClassname}>
        Resizable Grid
      </NavLink>
      <NavLink to="/rows-reordering" exact activeClassName={activeNavClassname}>
        Rows Reordering
      </NavLink>
      <NavLink to="/scroll-to-row" exact activeClassName={activeNavClassname}>
        Scroll To Row
      </NavLink>
      <NavLink to="/tree-view" exact activeClassName={activeNavClassname}>
        Tree View
      </NavLink>
      <NavLink to="/variable-row-height" exact activeClassName={activeNavClassname}>
        Variable Row Height
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
