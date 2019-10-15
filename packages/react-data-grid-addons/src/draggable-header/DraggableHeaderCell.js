import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';

class DraggableHeaderCell extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    children: PropTypes.element.isRequired
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      canDrop
    } = this.props;

    // set drag source and drop target on header cell
    // width: 0 - otherwise drag clone was wrongly positioned
    return connectDragSource(
      connectDropTarget(
        <div
          className={classNames('rdg-draggable-header-cell', { 'rdg-can-drop': isOver && canDrop })}
          style={{ opacity: isDragging ? 0.2 : 1 }}
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
      const { source, target } = monitor.getDropResult();
      return props.onHeaderDrop(source, target);
    }
  }
};

// drop target
const target = {
  drop(props, monitor) {
    const source = monitor.getItem().key;
    const targetKey = props.column.key;
    return {
      source,
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

export default DragSource('Column', headerCellSource, collect)(
  DropTarget('Column', target, targetCollect)(
    DraggableHeaderCell
  )
);
