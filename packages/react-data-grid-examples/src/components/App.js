import React from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './Navbar';
import Home from './Home';
import Examples from './Examples';
import Documentation from './Documentation';

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/examples" component={Examples} />
        <Route path="/documentation" component={Documentation} />
      </div >
    );
  }
}

export default App;
