import { Link } from '@tanstack/react-router';
import { css } from '@linaria/core';

import type { Direction } from '../src/types';

const navClassname = css`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  border-inline-start: 4px solid light-dark(hsl(210deg 50% 80%), hsl(210deg 50% 40%));

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
      background-color: light-dark(hsl(210deg 50% 90%), hsl(210deg 50% 30%));
    }

    &[aria-current='page'] {
      font-weight: 500;
      background-color: light-dark(hsl(210deg 50% 80%), hsl(210deg 50% 40%));

      &:hover {
        background-color: light-dark(hsl(210deg 50% 70%), hsl(210deg 50% 50%));
      }
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
      <Link to="/CommonFeatures">Common Features</Link>
      <Link to="/AllFeatures">All Features</Link>
      <Link to="/CellNavigation">Cell Navigation</Link>
      <Link to="/ColumnSpanning">Column Spanning</Link>
      <Link to="/ColumnGrouping">Column Grouping</Link>
      <Link to="/ColumnsReordering">Columns Reordering</Link>
      <Link to="/ContextMenu">Context Menu</Link>
      <Link to="/CustomizableRenderers">Customizable Renderers</Link>
      <Link to="/RowGrouping">Row Grouping</Link>
      <Link to="/HeaderFilters">Header Filters</Link>
      <Link to="/InfiniteScrolling">Infinite Scrolling</Link>
      <Link to="/MasterDetail">Master Detail</Link>
      <Link to="/MillionCells">A Million Cells</Link>
      <Link to="/NoRows">No Rows</Link>
      <Link to="/ResizableGrid">Resizable Grid</Link>
      <Link to="/RowsReordering">Rows Reordering</Link>
      <Link to="/ScrollToCell">Scroll To Cell</Link>
      <Link to="/TreeView">Tree View</Link>
      <Link to="/VariableRowHeight">Variable Row Height</Link>
      <Link to="/Animation">Animation</Link>

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
