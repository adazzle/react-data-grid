import '../../../../themes/react-data-grid-drop-target.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import { RowComparer as shouldRowUpdate } from 'react-data-grid';

let rowDropTarget = (Row) => class extends React.Component {

  shouldComponentUpdate(nextProps) {
    return shouldRowUpdate(nextProps, this.props);
  }

  moveRow() {
    ReactDOM.findDOMNode(this).classList.add('slideUp');
  }

  render() {
    const { connectDropTarget, isOver, canDrop} = this.props;
    let overlayTop = this.props.idx * this.props.height;
    return connectDropTarget(<div>
      <Row ref={(node) => this.row = node} {...this.props}/>
      {isOver && canDrop && <div style={{
        position: 'absolute',
        top: overlayTop,
        left: 0,
        height: this.props.height,
        width: '100%',
        zIndex: 1,
        borderBottom: '1px solid black'
      }} /> }
    </div>);
  }
};

const target = {
  drop(props, monitor, component) {
    // Obtain the dragged item
    component.moveRow();
    let rowSource = monitor.getItem();
    let rowTarget = { idx: props.idx, data: props.row };
    props.onRowDrop({ rowSource, rowTarget });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggedRow: monitor.getItem()
  };
}

export default (Row) => DropTarget('Row', target, collect, {arePropsEqual: (nextProps, currentProps) => !shouldRowUpdate(nextProps, currentProps)})(rowDropTarget(Row));
