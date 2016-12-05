var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var gettingStarted = require('./scripts/documentation01-gettingstarted');
var apiReference = require('./scripts/documentation02-apireference');
var componentsDocs = require('./scripts/documentation03-components');

var { Route, RouteHandler, Link } = ReactRouter;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1 className="page-header">Documentation</h1>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
      <Route name="gettingstarted" handler={gettingStarted} />
      <Route name="apireference" handler={apiReference} />
      <Route name="componentsDocs" handler={componentsDocs} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('documentation'));
});
