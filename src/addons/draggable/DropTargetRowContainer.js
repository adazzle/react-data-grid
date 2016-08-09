import React from 'react';
import { DropTarget } from 'react-dnd';

let rowDropTarget = (Row) => class extends React.Component {

  render() {
    let { connectDropTarget} = this.props;
    return connectDropTarget(<div><Row {...this.props}/></div>);
  }
};

const target = {
  drop(props, monitor) {
    // Obtain the dragged item
    let rowSource = monitor.getItem();
    let rowTarget = {idx: props.idx, data: props.row};
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

export default (Row) => DropTarget('Row', target, collect)(rowDropTarget(Row));
