import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';

const DraggableContainer = ({children}) => {
  let grid = React.Children.map(children, (child) => {
    return React.cloneElement(child, { draggableHeaderCell: DraggableHeaderCell });
  })[0];
  return (<div>
    {grid}
    <RowDragLayer rowSelection={grid.props.rowSelection} rowsCount={grid.props.rowsCount} rowGetter={grid.props.rowGetter}/>
  </div>);
};

export default DragDropContext(HTML5Backend)(DraggableContainer);
