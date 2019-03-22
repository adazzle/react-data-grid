import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import ExampleList from './ExampleList';
import Basic from '../scripts/example01-basic';
import ResizableCols from '../scripts/example02-resizable-cols';
import FrozenCols from '../scripts/example03-frozen-cols';
import Editable from '../scripts/example04-editable';
import CustomFormatters from '../scripts/example05-custom-formatters';
import BuiltInEditors from '../scripts/example06-built-in-editors';
import SortableCols from '../scripts/example08-sortable-cols';
import FilterableGrid from '../scripts/example09-filterable-grid';
import OneMillionRows from '../scripts/example10-one-million-rows';
import ImmutableData from '../scripts/example11-immutable-data';
import CustomRowRenderer from '../scripts/example12-customRowRenderer';
import AllFeatures from '../scripts/example13-all-features';
import AllFeaturesImmutable from '../scripts/example14-all-features-immutable';
import EmptyRows from '../scripts/example15-empty-rows';
import CellDragDown from '../scripts/example16-cell-drag-down';
import FilterableSortableGrid from '../scripts/example16-filterable-sortable-grid';
import RowSelect from '../scripts/example16-row-select';
import GridEvents from '../scripts/example17-grid-events';
import ContextMenu from '../scripts/example18-context-menu';
import ColumnEvents from '../scripts/example19-column-events';
import CellNavigation from '../scripts/example20-cell-navigation';
import CellSelectionEvents from '../scripts/example21-cell-selection-events';
import Grouping from '../scripts/example21-grouping';
import CustomFilters from '../scripts/example22-custom-filters';
import ImmutableDataGrouping from '../scripts/example23-immutable-data-grouping';
import RowOrdering from '../scripts/example23-row-reordering';
import DraggableHeader from '../scripts/example24-draggable-header';
import TreeView from '../scripts/example25-tree-view';
import TreeViewNoAddDelete from '../scripts/example26-tree-view-no-add-delete';
import CellActions from '../scripts/example27-cell-actions';
import ScrollToRowIndex from '../scripts/example28-scroll-to-row-index';
import DescendingFirstSortable from '../scripts/example29-descendingFirstSortable';
import SelectionRangeEvents from '../scripts/example30-selection-range-events';
import IsScrolling from '../scripts/example31-isScrolling';

export default function Examples({ match }) {
  return (
    <div className="container-fluid top-space">
      <div className="row">
        <div className="col-md-2 top-space" role="complementary">
          <nav id="sidebar" className="bs-docs-sidebar hidden-print hidden-xs hidden-sm" data-spy="affix" data-offset-top="0" data-offset-bottom="200">
            <div id="grid-examples-div">
              <ExampleList className="nav bs-docs-sidenav" />
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <div>
            <h1 className="page-header">React Data Grid Examples</h1>
            <Switch>
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
              <Route path="/examples/row-reordering" component={RowOrdering} />
              <Route path="/examples/draggable-header" component={DraggableHeader} />
              <Route path="/examples/tree-view" component={TreeView} />
              <Route path="/examples/tree-view-no-add-delete" component={TreeViewNoAddDelete} />
              <Route path="/examples/cell-actions" component={CellActions} />
              <Route path="/examples/scroll-to-row-index" component={ScrollToRowIndex} />
              <Route path="/examples/descendingFirstSortable" component={DescendingFirstSortable} />
              <Route path="/examples/selection-range-events" component={SelectionRangeEvents} />
              <Route path="/examples/isScrolling" component={IsScrolling} />
              <Redirect from={`${match.url}`} to={`${match.url}/all-features`} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

Examples.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};
