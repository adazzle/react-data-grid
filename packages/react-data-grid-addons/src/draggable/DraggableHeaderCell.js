import { DragSource } from 'react-dnd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragItemTypes } from 'common/constants';

class DraggableHeaderCell extends Component {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    img.src = './assets/images/drag_column_full.png';
    img.onload = () => connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    if (isDragging) {
      return null;
    }
    return connectDragSource(<div style={{ cursor: 'move' }}>{this.props.children}</div>);
  }
}

DraggableHeaderCell.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
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
