import React from 'react';
import PropTypes from 'prop-types';

export class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.isRequired
  };
  static childContextTypes = {
    cellEvents: PropTypes.object.isRequired
  };
  render() {
    return this.props.children;
  }
}

export default Provider;
