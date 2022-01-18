import { StrictMode } from 'react';
import { render } from 'react-dom';
import { css } from '@linaria/core';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import Nav from './Nav';

import CommonFeatures from './demos/CommonFeatures';
import AllFeatures from './demos/AllFeatures';
import CellNavigation from './demos/CellNavigation';
import ColumnSpanning from './demos/ColumnSpanning';
import ColumnsReordering from './demos/ColumnsReordering';
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
          <Route>Nothing to see here</Route>
        </Switch>
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
