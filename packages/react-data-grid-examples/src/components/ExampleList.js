import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ExampleList extends React.Component {
  render() {
    const links = this.props.links.map(s => <li key={`/examples/${s.hashLocation}`}><Link to={`/examples/${s.hashLocation}`}>{s.name}</Link></li>);
    return (
      <ul {...this.props}>
        {links}
      </ul>
    );
  }
}

ExampleList.propTypes = {
  links: PropTypes.array.isRequired
};

export default ExampleList;
