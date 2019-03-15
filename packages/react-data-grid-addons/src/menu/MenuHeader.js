import React from 'react';
import PropTypes from 'prop-types';

export default class MenuHeader extends React.Component {
  render() {
    return (
      <div className="react-context-menu-header">
        {this.props.children}
      </div>
    );
  }
}

MenuHeader.propTypes = {
  children: PropTypes.any
};
