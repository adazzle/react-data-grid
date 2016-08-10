import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';

const DraggableContainer = ({children}) => {
  let Grid = React.Children.map(children, (child) => {
    return React.cloneElement(child, { draggableHeaderCell: DraggableHeaderCell });
  });

  return (<div>
    {Grid}
    <RowDragLayer/>
  </div>);
};

export default DragDropContext(HTML5Backend)(DraggableContainer);
