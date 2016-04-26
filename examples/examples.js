import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Route, RouteHandler} from 'react-router';
import ExampleList from './components/ExampleList';
import ExamplesData from './examplesData';
import ExampleScripts from './scripts';

window.React = React;

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">React Data Grid Examples</h1>
        <RouteHandler />
      </div>
    );
  }
}

let allRoutes = ExamplesData.map(e => {
  let routeHandler = ExampleScripts[e.scriptFileName];
  return <Route name={e.hashLocation} handler={routeHandler} />;
});

let routes = (
  <Route handler={App}>
    {allRoutes}
  </Route>
);

ReactRouter.run(routes, function(Handler) {
  ReactDOM.render(<Handler />, document.getElementById('example'));
});
ReactDOM.render(<ExampleList links={ExamplesData} className="nav bs-docs-sidenav" />, document.getElementById('grid-examples-div'));
