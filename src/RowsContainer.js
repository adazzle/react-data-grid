import React, {PropTypes} from 'react';

const SimpleRowsContainer = (props) => {
  return (
    <div style={{width: props.width, overflow: 'hidden'}}>
      {props.rows}
    </div>
  );
};

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
    this.getContextMenuContainer = this.getContextMenuContainer.bind(this);
    this.state = {ContextMenuContainer: this.getContextMenuContainer(props)};
  }

  getContextMenuContainer() {
    if (this.hasContextMenu()) {
      if (!this.plugins) {
        throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
      }
      return this.plugins.Menu.ContextMenuLayer('reactDataGridContextMenu')(SimpleRowsContainer);
    }
  }

  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    let ContextMenuRowsContainer = this.state.ContextMenuContainer;
    let newProps = {rowIdx: this.props.rowIdx, idx: this.props.idx};
    let contextMenu = React.cloneElement(this.props.contextMenu, newProps);
    // Initialise the context menu if it is available
    return (<div><ContextMenuRowsContainer {...this.props} />{contextMenu}</div>);
  }

  render() {
    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : <SimpleRowsContainer {...this.props} />;
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
