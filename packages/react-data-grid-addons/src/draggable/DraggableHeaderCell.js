import { DragSource } from 'react-dnd';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DragItemTypes } from 'common/constants';

class DraggableHeaderCell extends Component {

  componentDidMount() {
    let connectDragPreview = this.props.connectDragPreview;
    let img = new Image();
    img.src = './assets/images/drag_column_full.png';
    img.onload = function() {
      connectDragPreview(img);
    };
  }

  setScrollLeft(scrollLeft) {
    if (this.node) {
      node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    }
  }

  render() {
    const { connectDragSource, isDragging} = this.props;
    if (isDragging) {
      return null;
    }
    return connectDragSource(<div ref={node => this.node = node} style={{cursor: 'move'}}>{this.props.renderHeaderCell(this.props)}</div>);
  }
}

DraggableHeaderCell.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  renderHeaderCell: PropTypes.func.isRequired
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
