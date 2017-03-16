import React, {PropTypes} from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { _constants, HeaderCell } from 'react-data-grid';
const { DragItemTypes } = _constants;

class DraggableHeaderCell extends React.Component {
  componentDidMount() {
    // zobrazení náhledu při tažení sloupce 
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
    console.log(isOver, canDrop);
    // pokud při klonování bylo zjištěno, že je možné táhnout sloupec, přidám obalovač s kurzorem a předám klasickou HeaderCell
    return connectDragSource(connectDropTarget(
        <div style={{cursor: 'move'}} className={isOver && canDrop ? 'rdg-can-drop' : ''}>
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
    return { id: props.column.id };
  },
  endDrag(props) {
    return { id: props.column.id };
  }
};

// drop target
const target = {
  drop(props, monitor, component) {
    // get info about source and target
    let rowSource = monitor.getItem().id;
    let headerTarget = props.column.id;

    console.log("rowSource ", rowSource);
    console.log("target", headerTarget);

    //callback function - how to sort columns
    props.onHeaderDrop(rowSource, headerTarget);
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