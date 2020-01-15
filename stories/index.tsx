import 'core-js/stable';
import '../style/index.less';
import './index.less';
import React from 'react';
import { storiesOf } from '@storybook/react';

import AllFeatures from './demos/AllFeatures';
import CellActions from './demos/CellActions';
import CommonFeatures from './demos/CommonFeatures';
import NoRows from './demos/NoRows';
import TreeView from './demos/TreeView';

storiesOf('Demos', module)
  .add('Common Features', () => <CommonFeatures />)
  .add('All Features', () => <AllFeatures />)
  .add('No Rows', () => <NoRows />)
  .add('Cell Actions', () => <CellActions />)
  .add('Tree View', () => <TreeView />);
