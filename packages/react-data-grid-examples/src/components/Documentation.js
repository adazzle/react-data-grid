import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

import GettingStarted from '../scripts/documentation01-gettingstarted';
import ApiReference from '../scripts/documentation02-apireference';
import ComponentsDocs from '../scripts/documentation03-components';

function Documentation() {
  return (
    <div className="container-fluid top-space">
      <div className="row">
        <div className="col-md-2 top-space" role="complementary">
          <nav id="sidebar" className="bs-docs-sidebar hidden-print hidden-xs hidden-sm" data-spy="affix" data-offset-top="0" data-offset-bottom="200">
            <ul className="nav bs-docs-sidenav">
              <li><Link to="/documentation/gettingstarted">Getting Started</Link></li>
              <li><Link to="/documentation/apireference">API Reference</Link></li>
              <li><Link to="/documentation/componentsdocs">Component Docs</Link></li>
            </ul>
          </nav>
        </div>
        <div className="col-md-10">
          <Route path="/documentation/gettingstarted" component={GettingStarted} />
          <Route path="/documentation/apireference" component={ApiReference} />
          <Route path="/documentation/componentsDocs" component={ComponentsDocs} />
          <Route exact path="/documentation" render={() => <Redirect to="/documentation/gettingstarted" />} />
        </div>
      </div>
    </div>
  );
}

export default Documentation;
