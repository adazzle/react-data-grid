import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { css } from '@linaria/core';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import Nav from './Nav';

const CommonFeatures = lazy(() => import('./demos/CommonFeatures'));
const AllFeatures = lazy(() => import('./demos/AllFeatures'));
const CellNavigation = lazy(() => import('./demos/CellNavigation'));
const ColumnSpanning = lazy(() => import('./demos/ColumnSpanning'));
const ColumnsReordering = lazy(() => import('./demos/ColumnsReordering'));
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
      height: 100%;
    }

    .rdg.small-grid {
      height: 300px;
    }

    .rdg.big-grid {
      height: 600px;
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
  height: 100vh;
  padding: 8px;
`;

function Root() {
  return (
    <Router>
      <Nav />

      <main className={mainClassname}>
        <Suspense fallback="Loading...">
          <Switch>
            <Redirect exact from="/" to="/common-features" />
            <Route exact path="/common-features">
              <CommonFeatures />
            </Route>
            <Route exact path="/all-features">
              <AllFeatures />
            </Route>
            <Route exact path="/cell-navigation">
              <CellNavigation />
            </Route>
            <Route exact path="/column-spanning">
              <ColumnSpanning />
            </Route>
            <Route exact path="/columns-reordering">
              <ColumnsReordering />
            </Route>
            <Route exact path="/context-menu">
              <ContextMenuDemo />
            </Route>
            <Route exact path="/grouping">
              <Grouping />
            </Route>
            <Route exact path="/header-filters">
              <HeaderFilters />
            </Route>
            <Route exact path="/infinite-scrolling">
              <InfiniteScrolling />
            </Route>
            <Route exact path="/master-detail">
              <MasterDetail />
            </Route>
            <Route exact path="/million-cells">
              <MillionCells />
            </Route>
            <Route exact path="/no-rows">
              <NoRows />
            </Route>
            <Route exact path="/resizable-grid">
              <ResizableGrid />
            </Route>
            <Route exact path="/rows-reordering">
              <RowsReordering />
            </Route>
            <Route exact path="/scroll-to-row">
              <ScrollToRow />
            </Route>
            <Route exact path="/tree-view">
              <TreeView />
            </Route>
            <Route exact path="/variable-row-height">
              <VariableRowHeight />
            </Route>
            <Route>
              <>Nothing to see here</>
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
}

render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById('root')
);
