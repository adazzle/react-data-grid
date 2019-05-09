import React from 'react';
import PropTypes from 'prop-types';

import { ContextMenu } from 'react-contextmenu';

export default class ReactDataGridContextMenu extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <ContextMenu identifier="reactDataGridContextMenu">
        {this.props.children}
      </ContextMenu>
    );
  }
}
