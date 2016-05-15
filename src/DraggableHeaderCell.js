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
    const { connectDragSource} = this.props;
    return connectDragSource(<HeaderCell {...this.props}/>);
  }
}

DraggableHeaderCell.propTypes = {
  connectDragSource: PropTypes.func
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const headerCellSource = {
  beginDrag() {
    return {};
  }
};

export default DragSource(DragItemTypes.Column, headerCellSource, collect)(DraggableHeaderCell);
