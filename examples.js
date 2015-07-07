var React = require('react');
var ReactRouter = require('react-router');

var basicExample     = require('./scripts/example01-basic');
var resizableExample = require('./scripts/example02-resizable-cols');
var fixedColsExample = require('./scripts/example03-fixed-cols');
var editableExample  = require('./scripts/example04-editable');
var formatterExample = require('./scripts/example05-custom-formatters');
var editorsExample   = require('./scripts/example06-built-in-editors');
var sortableExample  = require('./scripts/example08-sortable-cols');
var filterableExample  = require('./scripts/example09-filterable-grid');
var millionRowsExample = require('./scripts/example10-one-million-rows');
var immutableDataExample = require('./scripts/example11-immutable-data');
var customRowRenderer = require('./scripts/example12-customRowRenderer');
var fullExample = require('./scripts/example-full');

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
      <Route name="million-rows" handler={millionRowsExample}/>
      <Route name="all-the-features" handler={fullExample}/>
      <Route name="immutable-data" handler={immutableDataExample}/>
      <Route name="custom-row-renderer" handler={customRowRenderer}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
