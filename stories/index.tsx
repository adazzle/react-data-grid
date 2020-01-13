import 'core-js/stable';
import '../style/index.less';
import './index.less';
import React from 'react';
import { storiesOf } from '@storybook/react';

import AllFeatures from './demos/AllFeatures';
import Basic from './demos/Basic';
import CellActions from './demos/CellActions';
import FrozenColumns from './demos/FrozenColumns';
import ResizableColumns from './demos/ResizableColumns';
import TreeView from './demos/TreeView';

storiesOf('Demos', module)
  .add('All Features', () => <AllFeatures />)
  .add('Basic', () => <Basic />)
  .add('Resizable Columns', () => <ResizableColumns />)
  .add('Frozen Columns', () => <FrozenColumns />)
  .add('Cell Actions', () => <CellActions />)
  .add('Tree View', () => <TreeView />);
