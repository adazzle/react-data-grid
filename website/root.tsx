import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { css } from '@linaria/core';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import type { Direction } from '../src/types';
import Nav from './Nav';

import CommonFeatures from './demos/CommonFeatures';
import AllFeatures from './demos/AllFeatures';
import CellNavigation from './demos/CellNavigation';
import ColumnSpanning from './demos/ColumnSpanning';
import ColumnsReordering from './demos/ColumnsReordering';
import CustomizableRenderers from './demos/CustomizableRenderers';
import ContextMenuDemo from './demos/ContextMenu';
import Grouping from './demos/Grouping';
import HeaderFilters from './demos/HeaderFilters';
import InfiniteScrolling from './demos/InfiniteScrolling';
import MasterDetail from './demos/MasterDetail';
import MillionCells from './demos/MillionCells';
import NoRows from './demos/NoRows';
import ResizableGrid from './demos/Resizable';
import RowsReordering from './demos/RowsReordering';
import ScrollToRow from './demos/ScrollToRow';
import TreeView from './demos/TreeView';
import VariableRowHeight from './demos/VariableRowHeight';
import Animation from './demos/Animation';

css`
  @at-root {
    :root,
    body {
      padding: 0;
      margin: 0;
      font-family: sans-serif;
    }

    :root {
      color-scheme: light dark;

      @media (prefers-color-scheme: light) {
        background-color: #fff;
        color: #111;
      }

      @media (prefers-color-scheme: dark) {
        background-color: hsl(0deg 0% 10%);
        color: #fff;
      }
    }

    #root {
      display: grid;
      grid-template-columns: auto 1fr;
    }

    .rdg.fill-grid {
      block-size: 100%;
    }

    .rdg.small-grid {
      block-size: 300px;
    }

    .rdg.big-grid {
      block-size: 600px;
    }

    .rdg-cell .Select {
      max-height: 30px;
      font-size: 12px;
      font-weight: normal;
    }
  }
`;

const mainClassname = css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  block-size: 100vh;
  padding: 8px;
  overflow: hidden;
`;

function Root() {
  const [direction, setDirection] = useState<Direction>('ltr');
  return (
    <Router>
      <Nav direction={direction} onDirectionChange={setDirection} />
      <main className={mainClassname} dir={direction}>
        <Routes>
          <Route index element={<Navigate to="common-features" replace />} />
          <Route path="common-features" element={<CommonFeatures direction={direction} />} />
          <Route path="all-features" element={<AllFeatures direction={direction} />} />
          <Route path="cell-navigation" element={<CellNavigation direction={direction} />} />
          <Route path="column-spanning" element={<ColumnSpanning direction={direction} />} />
          <Route path="columns-reordering" element={<ColumnsReordering direction={direction} />} />
          <Route path="context-menu" element={<ContextMenuDemo direction={direction} />} />
          <Route
            path="customizable-renderers"
            element={<CustomizableRenderers direction={direction} />}
          />
          <Route path="grouping" element={<Grouping direction={direction} />} />
          <Route path="header-filters" element={<HeaderFilters direction={direction} />} />
          <Route path="infinite-scrolling" element={<InfiniteScrolling direction={direction} />} />
          <Route path="master-detail" element={<MasterDetail direction={direction} />} />
          <Route path="million-cells" element={<MillionCells direction={direction} />} />
          <Route path="no-rows" element={<NoRows direction={direction} />} />
          <Route path="resizable-grid" element={<ResizableGrid direction={direction} />} />
          <Route path="rows-reordering" element={<RowsReordering direction={direction} />} />
          <Route path="scroll-to-row" element={<ScrollToRow direction={direction} />} />
          <Route path="tree-view" element={<TreeView direction={direction} />} />
          <Route path="variable-row-height" element={<VariableRowHeight direction={direction} />} />
          <Route path="animation" element={<Animation direction={direction} />} />
          <Route path="*" element="Nothing to see here" />
        </Routes>
      </main>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
