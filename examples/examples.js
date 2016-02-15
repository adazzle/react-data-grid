var React = require('react');
window.React = React;
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var basicExample     = require('./scripts/example01-basic');
var resizableExample = require('./scripts/example02-resizable-cols');
var fixedColsExample = require('./scripts/example03-fixed-cols');
var editableExample  = require('./scripts/example04-editable');
var formatterExample = require('./scripts/example05-custom-formatters');
var editorsExample   = require('./scripts/example06-built-in-editors');
var sortableExample  = require('./scripts/example08-sortable-cols');
var filterableExample  = require('./scripts/example09-filterable-grid');
var filterableSortablExample = require('./scripts/example16-filterable-sortable-grid');
var millionRowsExample = require('./scripts/example10-one-million-rows');
var immutableDataExample = require('./scripts/example11-immutable-data');
var customRowRenderer = require('./scripts/example12-customRowRenderer');
var fullExample = require('./scripts/example13-all-features');
var fullExampleImmutable = require('./scripts/example14-all-features-immutable');
var emptyRowsExample = require('./scripts/example15-empty-rows');
var cellDragDownExample  = require('./scripts/example16-cell-drag-down');

var rowSelectExample = require('./scripts/example16-row-select');
var singleRowSelectExample = require('./scripts/example17-single-row-select');

var { Route, RouteHandler, Link } = ReactRouter;

var App = React.createClass({
  render: function () {
    return (
      <div>
      <h1 className="page-header">React Data Grid Examples</h1>
      <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
      <Route name="basic" handler={basicExample}/>
      <Route name="resizable" handler={resizableExample}/>
      <Route name="fixed" handler={fixedColsExample}/>
      <Route name="editable" handler={editableExample}/>
      <Route name="formatters" handler={formatterExample}/>
      <Route name="editors" handler={editorsExample}/>
      <Route name="sortable" handler={sortableExample}/>
      <Route name="filterable" handler={filterableExample}/>
      <Route name="filterable-sortable" handler={filterableSortablExample} />
      <Route name="million-rows" handler={millionRowsExample}/>
      <Route name="all-the-features" handler={fullExample}/>
      <Route name="all-features-immutable" handler={fullExampleImmutable}/>
      <Route name="immutable-data" handler={immutableDataExample}/>
      <Route name="custom-row-renderer" handler={customRowRenderer}/>
      <Route name="empty-rows" handler={emptyRowsExample}/>
      <Route name="cell-drag" handler={cellDragDownExample}/>
      <Route name="multi-row-select" handler={rowSelectExample}/>
      <Route name="single-row-select" handler={singleRowSelectExample}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('example'));
});
