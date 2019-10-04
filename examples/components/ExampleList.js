import React from 'react';
import { Link } from 'react-router-dom';

export default class ExampleList extends React.Component {
  render() {
    return (
      <ul {...this.props}>
        <li><Link to="/examples/basic">Basic Example</Link></li>
        <li><Link to="/examples/resizable-cols">Resizable Cols Example</Link></li>
        <li><Link to="/examples/frozen-cols">Frozen Cols Example</Link></li>
        <li><Link to="/examples/editable">Editable Example</Link></li>
        <li><Link to="/examples/custom-formatters">Custom Formatters Example</Link></li>
        <li><Link to="/examples/built-in-editors">Built In Editors Example</Link></li>
        <li><Link to="/examples/sortable-cols">Sortable Cols Example</Link></li>
        <li><Link to="/examples/filterable-grid">Filterable Grid Example</Link></li>
        <li><Link to="/examples/immutable-data">Immutable Data Example</Link></li>
        <li><Link to="/examples/customRowRenderer">Custom Row Renderer Example</Link></li>
        <li><Link to="/examples/all-features">All Features Example</Link></li>
        <li><Link to="/examples/all-features-immutable">All Features Immutable Example</Link></li>
        <li><Link to="/examples/empty-rows">Empty Rows Example</Link></li>
        <li><Link to="/examples/cell-drag-down">Cell Drag Down Example</Link></li>
        <li><Link to="/examples/filterable-sortable-grid">Filterable Sortable Grid Example</Link></li>
        <li><Link to="/examples/row-select">Row Select Example</Link></li>
        <li><Link to="/examples/grid-events">Grid Events Example</Link></li>
        <li><Link to="/examples/context-menu">Context Menu Example</Link></li>
        <li><Link to="/examples/column-events">Column Events Example</Link></li>
        <li><Link to="/examples/cell-navigation">Cell Navigation Example</Link></li>
        <li><Link to="/examples/cell-selection-events">Cell Selection Events</Link></li>
        <li><Link to="/examples/grouping">Grouping Example</Link></li>
        <li><Link to="/examples/custom-filters">Custom Filters Example</Link></li>
        <li><Link to="/examples/immutable-data-grouping">Immutable Data Grouping Example</Link></li>
        <li><Link to="/examples/draggable-header">Draggable Header Example</Link></li>
        <li><Link to="/examples/tree-view">Tree View Example</Link></li>
        <li><Link to="/examples/tree-view-no-add-delete">Tree View No Add Delete Example</Link></li>
        <li><Link to="/examples/cell-actions">Cell Actions Example</Link></li>
        <li><Link to="/examples/scroll-to-row-index">Scroll To Row Index Example</Link></li>
        <li><Link to="/examples/descendingFirstSortable">Descending First Sortable Example</Link></li>
        <li><Link to="/examples/selection-range-events">Selection Range Events Example</Link></li>
        <li><Link to="/examples/isScrolling">IsScrolling Example</Link></li>
      </ul>
    );
  }
}
