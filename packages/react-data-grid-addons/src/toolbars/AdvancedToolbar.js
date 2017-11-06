import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../../../themes/react-data-grid-toolbar.css';

const propTypes = {
  children: PropTypes.array
};

const defaultProps = {
  enableAddRow: true
};

class AdvancedToolbar extends Component {
  render() {
    return (
      <div className="react-grid-Toolbar">
        {this.props.children}
        <div className="tools">

        </div>
      </div>);
  }
}

AdvancedToolbar.defaultProps = defaultProps;
AdvancedToolbar.propTypes = propTypes;

export default AdvancedToolbar;
