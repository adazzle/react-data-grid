import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

import GettingStarted from '../scripts/documentation01-gettingstarted';
import ApiReference from '../scripts/documentation02-apireference';
import ComponentsDocs from '../scripts/documentation03-components';

function Documentation({ match: { url } }) {
  return (
    <div className="container-fluid top-space">
      <div className="row">
        <div className="col-md-2 top-space" role="complementary">
          <nav id="sidebar" className="bs-docs-sidebar hidden-print hidden-xs hidden-sm" data-spy="affix" data-offset-top="0" data-offset-bottom="200">
            <ul className="nav bs-docs-sidenav">
              <li><Link to={`${url}/gettingstarted`}>Getting Started</Link></li>
              <li><Link to={`${url}/apireference`}>API Reference</Link></li>
              <li><Link to={`${url}/componentsDocs`}>Component Docs</Link></li>
            </ul>
          </nav>
        </div>
        <div className="col-md-10">
          <Switch>
            <Route path={`${url}/gettingstarted`} component={GettingStarted} />
            <Route path={`${url}/apireference`} component={ApiReference} />
            <Route path={`${url}/componentsDocs`} component={ComponentsDocs} />
            <Redirect from={`${url}`} to={`${url}/gettingstarted`} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

Documentation.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

export default Documentation;
