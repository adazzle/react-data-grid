import 'core-js/stable';
import '../style/index.less';
import './index.less';
import React from 'react';
import { storiesOf } from '@storybook/react';

import AllFeatures from './demos/AllFeatures';
import CellActions from './demos/CellActions';
import CommonFeatures from './demos/CommonFeatures';
import MillionCells from './demos/MillionCells';
import NoRows from './demos/NoRows';
import TreeView from './demos/TreeView';
import ContextMenu from './demos/ContextMenu';
import ScrollToRow from './demos/ScrollToRow';
import CellNavigation from './demos/CellNavigation';
import HeaderFilters from './demos/HeaderFilters';
import ColumnsReordering from './demos/ColumnsReordering';
import RowsReordering from './demos/RowsReordering';
import LegacyGrouping from './demos/LegacyGrouping';

storiesOf('Demos', module)
  .add('Common Features', () => <CommonFeatures />)
  .add('All Features', () => <AllFeatures />)
  .add('A Million Cells', () => <MillionCells />)
  .add('No Rows', () => <NoRows />)
  .add('Cell Actions', () => <CellActions />)
  .add('Tree View', () => <TreeView />)
  .add('Context Menu', () => <ContextMenu />)
  .add('Scroll To Row', () => <ScrollToRow />)
  .add('Cell Navigation', () => <CellNavigation />)
  .add('Header Filters', () => <HeaderFilters />)
  .add('Columns Reordering', () => <ColumnsReordering />)
  .add('Rows Reordering', () => <RowsReordering />)
  .add('Legacy Grouping', () => <LegacyGrouping />);
