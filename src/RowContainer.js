import React, {PropTypes} from 'react';
import {ContextMenuLayer} from 'react-contextmenu';

class RowContainer extends React.Component {
  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    let newProps = {rowIdx: this.props.rowIdx, idx: this.props.idx};
    let contextMenu = React.cloneElement(this.props.contextMenu, newProps);
    return (<div><ContextMenuRowContainer {...this.props} />{contextMenu}</div>);
  }

  render() {
    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : <SimpleRowContainer {...this.props} />;
  }
}

RowContainer.propTypes = {
  contextMenu: PropTypes.element,
  rowIdx: PropTypes.number,
  idx: PropTypes.number
};

class SimpleRowContainer extends React.Component {
  render() {
    return (
      <div style={{width: this.props.width, overflow: 'hidden'}}>
        {this.props.rows}
      </div>
    );
  }
}

SimpleRowContainer.propTypes = {
  width: PropTypes.number,
  rows: PropTypes.array
};

let ContextMenuRowContainer = ContextMenuLayer('canvasContextMenu')(SimpleRowContainer);

export default RowContainer;
