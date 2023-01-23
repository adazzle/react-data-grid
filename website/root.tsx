import { StrictMode, useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { css } from '@linaria/core';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import type { Direction } from '../src/types';
import Nav from './Nav';

const CommonFeatures = lazy(() => import('./demos/CommonFeatures'));
const AllFeatures = lazy(() => import('./demos/AllFeatures'));
const CellNavigation = lazy(() => import('./demos/CellNavigation'));
const ColumnSpanning = lazy(() => import('./demos/ColumnSpanning'));
const ColumnsReordering = lazy(() => import('./demos/ColumnsReordering'));
const CustomizableRenderers = lazy(() => import('./demos/CustomizableRenderers'));
const ContextMenuDemo = lazy(() => import('./demos/ContextMenu'));
const Grouping = lazy(() => import('./demos/Grouping'));
const HeaderFilters = lazy(() => import('./demos/HeaderFilters'));
const InfiniteScrolling = lazy(() => import('./demos/InfiniteScrolling'));
const MasterDetail = lazy(() => import('./demos/MasterDetail'));
const MillionCells = lazy(() => import('./demos/MillionCells'));
const NoRows = lazy(() => import('./demos/NoRows'));
const ResizableGrid = lazy(() => import('./demos/Resizable'));
const RowsReordering = lazy(() => import('./demos/RowsReordering'));
const ScrollToRow = lazy(() => import('./demos/ScrollToRow'));
const TreeView = lazy(() => import('./demos/TreeView'));
const VariableRowHeight = lazy(() => import('./demos/VariableRowHeight'));
const Animation = lazy(() => import('./demos/Animation'));

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
        <Suspense fallback="Loading...">
          <Routes>
            <Route index element={<Navigate to="common-features" replace />} />
            <Route path="common-features" element={<CommonFeatures direction={direction} />} />
            <Route path="all-features" element={<AllFeatures direction={direction} />} />
            <Route path="cell-navigation" element={<CellNavigation direction={direction} />} />
            <Route path="column-spanning" element={<ColumnSpanning direction={direction} />} />
            <Route
              path="columns-reordering"
              element={<ColumnsReordering direction={direction} />}
            />
            <Route path="context-menu" element={<ContextMenuDemo direction={direction} />} />
            <Route
              path="customizable-renderers"
              element={<CustomizableRenderers direction={direction} />}
            />
            <Route path="grouping" element={<Grouping direction={direction} />} />
            <Route path="header-filters" element={<HeaderFilters direction={direction} />} />
            <Route
              path="infinite-scrolling"
              element={<InfiniteScrolling direction={direction} />}
            />
            <Route path="master-detail" element={<MasterDetail direction={direction} />} />
            <Route path="million-cells" element={<MillionCells direction={direction} />} />
            <Route path="no-rows" element={<NoRows direction={direction} />} />
            <Route path="resizable-grid" element={<ResizableGrid direction={direction} />} />
            <Route path="rows-reordering" element={<RowsReordering direction={direction} />} />
            <Route path="scroll-to-row" element={<ScrollToRow direction={direction} />} />
            <Route path="tree-view" element={<TreeView direction={direction} />} />
            <Route
              path="variable-row-height"
              element={<VariableRowHeight direction={direction} />}
            />
            <Route path="animation" element={<Animation direction={direction} />} />
            <Route path="*" element="Nothing to see here" />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
