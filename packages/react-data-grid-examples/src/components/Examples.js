import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import exampleScripts from '../scripts';
import ExampleList from './ExampleList';

function Examples({ match }) {
  const routes = exampleScripts.map((s, index) => (
    <Route
      key={index}
      path={`${match.path}/${s.hashLocation}`}
      component={s.module}
    />
  ));

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
              {routes}
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

export default Examples;
