import React from 'react';
import PropTypes from 'prop-types';

export const DEFAULT_CONTEXT_MENU_ID = 'rgdContextMenu';

const SimpleRowsContainer = (props) => <div key="rows-container">{props.rows}</div>;

SimpleRowsContainer.propTypes = {
  width: PropTypes.number,
  rows: PropTypes.array
};

export const getNewContextMenuProps = ({ contextMenuId, rowIdx, idx }) => ({
  rowIdx, idx, id: contextMenuId || DEFAULT_CONTEXT_MENU_ID
});

class RowsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.plugins = props.window ? props.window.ReactDataGridPlugins : window.ReactDataGridPlugins;
    this.hasContextMenu = this.hasContextMenu.bind(this);
    this.renderRowsWithContextMenu = this.renderRowsWithContextMenu.bind(this);
    this.validateContextMenu = this.validateContextMenu.bind(this);

    this.validateContextMenu();
  }

  validateContextMenu() {
    if (this.hasContextMenu() && !this.plugins) {
      throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
    }
  }

  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    const { ContextMenuTrigger } = this.plugins.Menu;
    const newProps = getNewContextMenuProps(this.props);
    const contextMenu = React.cloneElement(this.props.contextMenu, newProps);
    // Initialise the context menu if it is available
    return (
      <div>
        <ContextMenuTrigger id={newProps.id}>
          <SimpleRowsContainer {...this.props} />
        </ContextMenuTrigger>
        {contextMenu}
      </div>
    );
  }

  render() {
    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : <SimpleRowsContainer {...this.props} />;
  }
}

RowsContainer.propTypes = {
  contextMenu: PropTypes.element,
  contextMenuId: PropTypes.string,
  rowIdx: PropTypes.number,
  idx: PropTypes.number,
  window: PropTypes.object
};

export default RowsContainer;
export {SimpleRowsContainer};
