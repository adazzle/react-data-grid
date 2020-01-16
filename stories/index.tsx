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

storiesOf('Demos', module)
  .add('Common Features', () => <CommonFeatures />)
  .add('All Features', () => <AllFeatures />)
  .add('A Million Cells', () => <MillionCells />)
  .add('No Rows', () => <NoRows />)
  .add('Cell Actions', () => <CellActions />)
  .add('Tree View', () => <TreeView />)
  .add('Context Menu', () => <ContextMenu />);
