import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';

export const DEFAULT_CONTEXT_MENU_ID = 'rgdContextMenu';

class RowsContainer extends React.Component {
  static propTypes = {
    contextMenu: PropTypes.element,
    window: PropTypes.object,
    rows: PropTypes.array
  };

  plugins = this.props.window ? this.props.window.ReactDataGridPlugins : window.ReactDataGridPlugins

  validatePlugin() {
    if (!this.plugins) {
      throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
    }
  }

  render() {
    const { contextMenu, rows } = this.props;
    if (isValidElement(contextMenu)) {
      this.validatePlugin();
      const { ContextMenuTrigger } = this.plugins.Menu;
      return (
        <ContextMenuTrigger id={contextMenu.props.id || DEFAULT_CONTEXT_MENU_ID}>
          <div>{rows}</div>
        </ContextMenuTrigger>
      );
    }

    return <div>{rows}</div>;
  }
}

export default RowsContainer;
