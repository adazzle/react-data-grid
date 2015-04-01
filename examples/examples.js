var React = require('react');
var ReactRouter = require('react-router');

var basicExample = require('./scripts/exampleBasic');
var editableExample = require('./scripts/exampleEditable');

var { Route, RouteHandler, Link } = ReactRouter;

var App = React.createClass({
  render: function () {
    return (
      <div>
      <h1 className="page-header">React Grid Examples</h1>
      <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
      <Route name="basic" handler={basicExample}/>
      <Route name="editable" handler={editableExample}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
