import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.array
};

const defaultProps = {
  enableAddRow: true
};

export default class AdvancedToolbar extends Component {
  render() {
    return (
      <div className="react-grid-Toolbar">
        {this.props.children}
        <div className="tools" />
      </div>
    );
  }
}

AdvancedToolbar.defaultProps = defaultProps;
AdvancedToolbar.propTypes = propTypes;
