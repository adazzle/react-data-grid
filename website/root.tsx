import React, { StrictMode, useState } from 'react';
import { render } from 'react-dom';
import { css } from '@linaria/core';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import type { Direction } from '../src/types';
import Nav from './Nav';

import CommonFeatures from './demos/CommonFeatures';
import AllFeatures from './demos/AllFeatures';
import CellNavigation from './demos/CellNavigation';
import ColumnSpanning from './demos/ColumnSpanning';
import ColumnsReordering from './demos/ColumnsReordering';
import CustomizableComponents from './demos/CustomizableComponents';
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
        <Switch>
          <Redirect exact from="/" to="/common-features" />
          <Route exact path="/common-features">
            <CommonFeatures direction={direction} />
          </Route>
          <Route exact path="/all-features">
            <AllFeatures direction={direction} />
          </Route>
          <Route exact path="/cell-navigation">
            <CellNavigation direction={direction} />
          </Route>
          <Route exact path="/column-spanning">
            <ColumnSpanning direction={direction} />
          </Route>
          <Route exact path="/columns-reordering">
            <ColumnsReordering direction={direction} />
          </Route>
          <Route exact path="/context-menu">
            <ContextMenuDemo direction={direction} />
          </Route>
          <Route exact path="/customizable-components">
            <CustomizableComponents direction={direction} />
          </Route>
          <Route exact path="/grouping">
            <Grouping direction={direction} />
          </Route>
          <Route exact path="/header-filters">
            <HeaderFilters direction={direction} />
          </Route>
          <Route exact path="/infinite-scrolling">
            <InfiniteScrolling direction={direction} />
          </Route>
          <Route exact path="/master-detail">
            <MasterDetail direction={direction} />
          </Route>
          <Route exact path="/million-cells">
            <MillionCells direction={direction} />
          </Route>
          <Route exact path="/no-rows">
            <NoRows direction={direction} />
          </Route>
          <Route exact path="/resizable-grid">
            <ResizableGrid direction={direction} />
          </Route>
          <Route exact path="/rows-reordering">
            <RowsReordering direction={direction} />
          </Route>
          <Route exact path="/scroll-to-row">
            <ScrollToRow direction={direction} />
          </Route>
          <Route exact path="/tree-view">
            <TreeView direction={direction} />
          </Route>
          <Route exact path="/variable-row-height">
            <VariableRowHeight direction={direction} />
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
