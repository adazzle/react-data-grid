import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { HeaderCell } from 'react-data-grid';

class DraggableHeaderCell extends React.Component {
  componentDidMount() {
    // set image as a preview of column when dragging
    let connectDragPreview = this.props.connectDragPreview;
    let img = new Image();
    img.src = './assets/images/drag_column_full.png';
    img.onload = function() {
      connectDragPreview(img);
    };
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      canDrop
    } = this.props;

    // set opacity when dragging
    let opacity = 1;
    if (isDragging) {
      opacity = 0.2;
    }

    // set drag source and drop target on header cell
    return connectDragSource(
      connectDropTarget(
        <div
          style={{ cursor: 'move', opacity }}
          className={isOver && canDrop ? 'rdg-can-drop' : ''}
        >
          <HeaderCell {...this.props} />
        </div>
      )
    );
  }
}

// drop source
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

const headerCellSource = {
  beginDrag(props) {
    return {
      // source column
      id: props.column.id
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
    // get info about source (get from monitor - came from beginDrag) and target - id of column (set in state)
    let source = monitor.getItem().id;
    let target = props.column.id;
    //callback function - how to sort columns
    return {
      source: source,
      target: target
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

// proptypes
DraggableHeaderCell.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

DraggableHeaderCell = DropTarget("Column", target, targetCollect)(
  DraggableHeaderCell
);
DraggableHeaderCell = DragSource("Column", headerCellSource, collect)(
  DraggableHeaderCell
);

export default DraggableHeaderCell;
