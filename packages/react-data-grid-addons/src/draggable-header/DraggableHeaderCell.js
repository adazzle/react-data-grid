import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

class DraggableHeaderCell extends React.Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      canDrop
    } = this.props;

    let opacity = 1;
    if (isDragging) {
      opacity = 0.2;
    }

    // set drag source and drop target on header cell
    // width: 0 - otherwise drag clone was wrongly positioned
    return connectDragSource(
      connectDropTarget(
        <div
          style={{ width: 0, cursor: 'move', opacity }}
          className={isOver && canDrop ? 'rdg-can-drop' : ''}
        >
          {this.props.children}
        </div>
      )
    );
  }
}

// drop source
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const headerCellSource = {
  beginDrag(props) {
    return {
      // source column
      key: props.column.key
    };
  },
  endDrag(props, monitor) {
    // check if drop was made in droppable zone
    if (monitor.didDrop()) {
      const source = monitor.getDropResult().source;
      const target = monitor.getDropResult().target;
      return props.onHeaderDrop(source, target);
    }
  }
};

// drop target
const target = {
  drop(props, monitor) {
    let source = monitor.getItem().key;
    let targetKey = props.column.key;
    return {
      source: source,
      target: targetKey
    };
  }
};

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggedHeader: monitor.getItem()
  };
}

DraggableHeaderCell.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  children: PropTypes.element.isRequired
};

DraggableHeaderCell = DropTarget('Column', target, targetCollect)(
  DraggableHeaderCell
);
DraggableHeaderCell = DragSource('Column', headerCellSource, collect)(
  DraggableHeaderCell
);

export default DraggableHeaderCell;
