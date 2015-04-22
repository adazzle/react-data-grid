var React = require('react');
var ReactRouter = require('react-router');

var basicExample = require('./scripts/example01-basic');
var resizableExample = require('./scripts/example02-resizable-cols');
var fixedColsExample = require('./scripts/example03-fixed-cols');
var editableExample = require('./scripts/example04-editable');
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
      <Route name="all-the-features" handler={fullExample}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
