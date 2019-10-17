import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, NavLink } from 'react-router-dom';

import Basic from './demos/example01-basic';
import ResizableCols from './demos/example02-resizable-cols';
import FrozenCols from './demos/example03-frozen-cols';
import Editable from './demos/example04-editable';
import CustomFormatters from './demos/example05-custom-formatters';
import BuiltInEditors from './demos/example06-built-in-editors';
import SortableCols from './demos/example08-sortable-cols';
import FilterableGrid from './demos/example09-filterable-grid';
import OneMillionRows from './demos/example10-one-million-rows';
import ImmutableData from './demos/example11-immutable-data';
import CustomRowRenderer from './demos/example12-customRowRenderer';
import AllFeatures from './demos/example13-all-features';
import AllFeaturesImmutable from './demos/example14-all-features-immutable';
import EmptyRows from './demos/example15-empty-rows';
import CellDragDown from './demos/example16-cell-drag-down';
import FilterableSortableGrid from './demos/example16-filterable-sortable-grid';
import RowSelect from './demos/example16-row-select';
import GridEvents from './demos/example17-grid-events';
import ContextMenu from './demos/example18-context-menu';
import ColumnEvents from './demos/example19-column-events';
import CellNavigation from './demos/example20-cell-navigation';
import CellSelectionEvents from './demos/example21-cell-selection-events';
import Grouping from './demos/example21-grouping';
import CustomFilters from './demos/example22-custom-filters';
import ImmutableDataGrouping from './demos/example23-immutable-data-grouping';
import DraggableHeader from './demos/example24-draggable-header';
import TreeView from './demos/example25-tree-view';
import TreeViewNoAddDelete from './demos/example26-tree-view-no-add-delete';
import CellActions from './demos/example27-cell-actions';
import ScrollToRowIndex from './demos/example28-scroll-to-row-index';
import DescendingFirstSortable from './demos/example29-descendingFirstSortable';
import SelectionRangeEvents from './demos/example30-selection-range-events';
import IsScrolling from './demos/example31-isScrolling';
import SummaryRows from './demos/example32-summary-rows';

ReactDOM.render((
  <StrictMode>
    <HashRouter>
      <ul className="nav">
        <li><NavLink to="/examples/basic">Basic Example</NavLink></li>
        <li><NavLink to="/examples/resizable-cols">Resizable Cols Example</NavLink></li>
        <li><NavLink to="/examples/frozen-cols">Frozen Cols Example</NavLink></li>
        <li><NavLink to="/examples/editable">Editable Example</NavLink></li>
        <li><NavLink to="/examples/custom-formatters">Custom Formatters Example</NavLink></li>
        <li><NavLink to="/examples/built-in-editors">Built In Editors Example</NavLink></li>
        <li><NavLink to="/examples/sortable-cols">Sortable Cols Example</NavLink></li>
        <li><NavLink to="/examples/filterable-grid">Filterable Grid Example</NavLink></li>
        <li><NavLink to="/examples/immutable-data">Immutable Data Example</NavLink></li>
        <li><NavLink to="/examples/customRowRenderer">Custom Row Renderer Example</NavLink></li>
        <li><NavLink to="/examples/all-features">All Features Example</NavLink></li>
        <li><NavLink to="/examples/all-features-immutable">All Features Immutable Example</NavLink></li>
        <li><NavLink to="/examples/empty-rows">Empty Rows Example</NavLink></li>
        <li><NavLink to="/examples/cell-drag-down">Cell Drag Down Example</NavLink></li>
        <li><NavLink to="/examples/filterable-sortable-grid">Filterable Sortable Grid Example</NavLink></li>
        <li><NavLink to="/examples/row-select">Row Select Example</NavLink></li>
        <li><NavLink to="/examples/grid-events">Grid Events Example</NavLink></li>
        <li><NavLink to="/examples/context-menu">Context Menu Example</NavLink></li>
        <li><NavLink to="/examples/column-events">Column Events Example</NavLink></li>
        <li><NavLink to="/examples/cell-navigation">Cell Navigation Example</NavLink></li>
        <li><NavLink to="/examples/cell-selection-events">Cell Selection Events</NavLink></li>
        <li><NavLink to="/examples/grouping">Grouping Example</NavLink></li>
        <li><NavLink to="/examples/custom-filters">Custom Filters Example</NavLink></li>
        <li><NavLink to="/examples/immutable-data-grouping">Immutable Data Grouping Example</NavLink></li>
        <li><NavLink to="/examples/draggable-header">Draggable Header Example</NavLink></li>
        <li><NavLink to="/examples/tree-view">Tree View Example</NavLink></li>
        <li><NavLink to="/examples/tree-view-no-add-delete">Tree View No Add Delete Example</NavLink></li>
        <li><NavLink to="/examples/cell-actions">Cell Actions Example</NavLink></li>
        <li><NavLink to="/examples/scroll-to-row-index">Scroll To Row Index Example</NavLink></li>
        <li><NavLink to="/examples/descendingFirstSortable">Descending First Sortable Example</NavLink></li>
        <li><NavLink to="/examples/selection-range-events">Selection Range Events Example</NavLink></li>
        <li><NavLink to="/examples/isScrolling">IsScrolling Example</NavLink></li>
        <li><NavLink to="/examples/summary-rows">Summary Rows Example</NavLink></li>
      </ul>
      <Route path="/examples/basic" component={Basic} />
      <Route path="/examples/resizable-cols" component={ResizableCols} />
      <Route path="/examples/frozen-cols" component={FrozenCols} />
      <Route path="/examples/editable" component={Editable} />
      <Route path="/examples/custom-formatters" component={CustomFormatters} />
      <Route path="/examples/built-in-editors" component={BuiltInEditors} />
      <Route path="/examples/sortable-cols" component={SortableCols} />
      <Route path="/examples/filterable-grid" component={FilterableGrid} />
      <Route path="/examples/one-million-rows" component={OneMillionRows} />
      <Route path="/examples/immutable-data" component={ImmutableData} />
      <Route path="/examples/customRowRenderer" component={CustomRowRenderer} />
      <Route path="/examples/all-features" component={AllFeatures} />
      <Route path="/examples/all-features-immutable" component={AllFeaturesImmutable} />
      <Route path="/examples/empty-rows" component={EmptyRows} />
      <Route path="/examples/cell-drag-down" component={CellDragDown} />
      <Route path="/examples/filterable-sortable-grid" component={FilterableSortableGrid} />
      <Route path="/examples/row-select" component={RowSelect} />
      <Route path="/examples/grid-events" component={GridEvents} />
      <Route path="/examples/context-menu" component={ContextMenu} />
      <Route path="/examples/column-events" component={ColumnEvents} />
      <Route path="/examples/cell-navigation" component={CellNavigation} />
      <Route path="/examples/cell-selection-events" component={CellSelectionEvents} />
      <Route path="/examples/grouping" component={Grouping} />
      <Route path="/examples/custom-filters" component={CustomFilters} />
      <Route path="/examples/immutable-data-grouping" component={ImmutableDataGrouping} />
      <Route path="/examples/draggable-header" component={DraggableHeader} />
      <Route path="/examples/tree-view" component={TreeView} />
      <Route path="/examples/tree-view-no-add-delete" component={TreeViewNoAddDelete} />
      <Route path="/examples/cell-actions" component={CellActions} />
      <Route path="/examples/scroll-to-row-index" component={ScrollToRowIndex} />
      <Route path="/examples/descendingFirstSortable" component={DescendingFirstSortable} />
      <Route path="/examples/selection-range-events" component={SelectionRangeEvents} />
      <Route path="/examples/isScrolling" component={IsScrolling} />
      <Route path="/examples/summary-rows" component={SummaryRows} />
    </HashRouter>
  </StrictMode>
), document.getElementById('root'));
