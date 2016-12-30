import React, {PropTypes} from 'react';
import {ContextMenu} from 'react-contextmenu';

class ReactDataGridContextMenu extends React.Component {
  render() {
    // docoder--change: identifier ("reactDataGridContextMenu" -> {this.props.identifier})
    return (
      <ContextMenu identifier={this.props.identifier}>
        {this.props.children}
      </ContextMenu>
    );
  }
}

ReactDataGridContextMenu.propTypes = {
  children: PropTypes.node,
  identifier: PropTypes.string // docoder--add
};

export default ReactDataGridContextMenu;
