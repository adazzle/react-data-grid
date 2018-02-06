import React from 'react';
import PropTypes from 'prop-types';

export const DEFAULT_CONTEXT_MENU_ID = 'rgdContextMenu';

const SimpleRowsContainer = (props) => <div key="rows-container">{props.rows}</div>;

SimpleRowsContainer.propTypes = {
  width: PropTypes.number,
  rows: PropTypes.array
};

export const getNewContextMenuProps = ({ contextMenu, rowIdx, idx }) => ({
  rowIdx, idx, id: contextMenu.props.id || DEFAULT_CONTEXT_MENU_ID
});

class RowsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.plugins = props.window ? props.window.ReactDataGridPlugins : window.ReactDataGridPlugins;
  }

  validatePlugin() {
    if (!this.plugins) {
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
    if (this.hasContextMenu()) {
      this.validatePlugin();
      return this.renderRowsWithContextMenu();
    }

    return <SimpleRowsContainer {...this.props} />;
  }
}

RowsContainer.propTypes = {
  contextMenu: PropTypes.element,
  rowIdx: PropTypes.number,
  idx: PropTypes.number,
  window: PropTypes.object
};

export default RowsContainer;
export {SimpleRowsContainer};
