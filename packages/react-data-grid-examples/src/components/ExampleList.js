import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import exampleScripts from '../scripts';

class ExampleList extends React.Component {
  render() {
    const links = exampleScripts.map(s => (
      <li key={`/examples/${s.hashLocation}`}>
        <Link to={`/examples/${s.hashLocation}`}>{s.name}</Link>
      </li>
    ));
    return (
      <ul {...this.props}>
        {links}
      </ul>
    );
  }
}

export default ExampleList;
