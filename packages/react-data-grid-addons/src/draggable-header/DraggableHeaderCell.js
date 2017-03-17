import React, {PropTypes} from 'react';
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
    // isDragging je v monitoru (React DnD)
    const { connectDragSource, connectDropTarget, isDragging, isOver, canDrop} = this.props;

    console.log("isDragging ", isDragging);
    // set opacity when dragging
    let opacity = 1;
    if (isDragging) {
      opacity = 0.2;
    }

    // set drag source and drop target on header cell
    return connectDragSource(connectDropTarget(
        <div style={{cursor: 'move', opacity}} className={isOver && canDrop ? 'rdg-can-drop' : ''}>
            <HeaderCell {...this.props}/>
        </div>
    ));
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
    return { order: props.column.order };
  },
  endDrag(props, monitor) {
    console.log("Did drop ",monitor.didDrop());
    return { order: props.column.order };
  }
};

// drop target
const target = {
  drop(props, monitor, component) {
    // get info about source and target - id of column (set in state)
    let source = monitor.getItem().order;
    let target = props.column.order;
    //callback function how to sort columns
    return props.onHeaderDrop(source, target);
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

DraggableHeaderCell = DropTarget('Column', target, targetCollect)(DraggableHeaderCell);
DraggableHeaderCell = DragSource('Column', headerCellSource, collect)(DraggableHeaderCell);

export default DraggableHeaderCell;