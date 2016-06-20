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
  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    let newProps = {rowIdx: this.props.rowIdx, idx: this.props.idx};
    let contextMenu = React.cloneElement(this.props.contextMenu, newProps);
    // Initialise the context menu if it is available
    let ContextMenuRowsContainer;
    if (window.ReactDataGridPlugins && window.ReactDataGridPlugins) {
      ContextMenuRowsContainer = ReactDataGridPlugins.Menu.ContextMenuLayer('reactDataGridContextMenu')(SimpleRowsContainer);
    } else {
      throw new ('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
    }
    return (<div><ContextMenuRowsContainer {...this.props} />{contextMenu}</div>);
  }

  render() {
    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : <SimpleRowsContainer {...this.props} />;
  }
}

RowsContainer.propTypes = {
  contextMenu: PropTypes.element,
  rowIdx: PropTypes.number,
  idx: PropTypes.number
};

export default RowsContainer;
export {SimpleRowsContainer};
