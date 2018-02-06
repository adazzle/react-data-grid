import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ExampleScripts from '../scripts';
import ExampleList from './ExampleList';

function Examples() {
  const routes = ExampleScripts.map(s => <Route path={`/examples/${s.hashLocation}`} component={s.module} />);
  routes.push(<Route exact path="/examples" render={() => <Redirect to="/examples/all-features" />} />);

  return (
    <div className="container-fluid top-space">
      <div className="row">
        <div className="col-md-2 top-space" role="complementary">
          <nav id="sidebar" className="bs-docs-sidebar hidden-print hidden-xs hidden-sm" data-spy="affix" data-offset-top="0" data-offset-bottom="200">
            <div id="grid-examples-div">
              <ExampleList className="nav bs-docs-sidenav" links={ExampleScripts} />
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <div>
            <h1 className="page-header">React Data Grid Examples</h1>
            {routes}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examples;
