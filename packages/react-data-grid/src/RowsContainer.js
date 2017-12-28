import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_CONTEXT_MENU_ID = 'rgdContextMenu';

const SimpleRowsContainer = (props) => (<div key="rows-container">{props.rows}</div>);

SimpleRowsContainer.propTypes = {
  width: PropTypes.number,
  rows: PropTypes.array
};

class RowsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.plugins = props.window ? props.window.ReactDataGridPlugins : window.ReactDataGridPlugins;
    this.hasContextMenu = this.hasContextMenu.bind(this);
    this.renderRowsWithContextMenu = this.renderRowsWithContextMenu.bind(this);
    this.validateContextMenu = this.validateContextMenu.bind(this);

    this.validateContextMenu(props);
  }

  validateContextMenu() {
    if (this.hasContextMenu()) {
      if (!this.plugins) {
        throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
      }
    }
  }

  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    const { ContextMenuTrigger } = this.plugins.Menu;
    const { contextMenuId, rowIdx, idx } = this.props;
    const id = `${contextMenuId || DEFAULT_CONTEXT_MENU_ID}_${rowIdx}`;
    const newProps = {rowIdx, idx, id};
    const contextMenu = React.cloneElement(this.props.contextMenu, newProps);
    // Initialise the context menu if it is available
    return (
      <div>
        <ContextMenuTrigger id={id}>
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
