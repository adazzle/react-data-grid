import React from 'react';
import { Link } from 'react-router-dom';

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
