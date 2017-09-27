import React from 'react';
import PropTypes from 'prop-types';

import {ContextMenu} from 'react-contextmenu';

class ReactDataGridContextMenu extends React.Component {
  render() {
    return (
      <ContextMenu identifier="reactDataGridContextMenu">
        {this.props.children}
      </ContextMenu>
    );
  }
}

ReactDataGridContextMenu.propTypes = {
  children: PropTypes.node
};

export default ReactDataGridContextMenu;
