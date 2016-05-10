import React, {PropTypes} from 'react';
import {ContextMenuLayer} from 'react-contextmenu';

class RowsContainer extends React.Component {
  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    let newProps = {rowIdx: this.props.rowIdx, idx: this.props.idx};
    let contextMenu = React.cloneElement(this.props.contextMenu, newProps);
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

class SimpleRowsContainer extends React.Component {
  render() {
    return (
      <div style={{width: this.props.width, overflow: 'hidden'}}>
        {this.props.rows}
      </div>
    );
  }
}

SimpleRowsContainer.propTypes = {
  width: PropTypes.number,
  rows: PropTypes.array
};

let ContextMenuRowsContainer = ContextMenuLayer('reactDataGridContextMenu')(SimpleRowsContainer);

export default RowsContainer;
export {SimpleRowsContainer, ContextMenuRowsContainer};
