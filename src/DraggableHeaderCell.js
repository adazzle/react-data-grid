import {DragItemTypes} from './Constants';
import { DragSource } from 'react-dnd';
import HeaderCell from './HeaderCell';
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

class DraggableHeaderCell extends Component {
  setScrollLeft(scrollLeft) {
    let node = ReactDOM.findDOMNode(this);
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  }

  render() {
    const { connectDragSource, connectDragPreview} = this.props;
    connectDragPreview(<span>dsfdsfds</span>);
    return connectDragSource(<div style={{cursor: 'move'}}><HeaderCell {...this.props}/></div>);
  }
}

DraggableHeaderCell.propTypes = {
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

const headerCellSource = {
  beginDrag(props) {
    return props.column;
  },
  endDrag(props) {
    return props.column;
  }
};

export default DragSource(DragItemTypes.Column, headerCellSource, collect)(DraggableHeaderCell);
