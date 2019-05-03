import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AdvancedToolbar extends Component {
  static defaultProps = {
    children: PropTypes.array
  };

  static propTypes = {
    enableAddRow: true
  };

  render() {
    return (
      <div className="react-grid-Toolbar">
        {this.props.children}
        <div className="tools" />
      </div>
    );
  }
}
