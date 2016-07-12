import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import DraggableHeaderCell from './DraggableHeaderCell';

const DraggableContainer = ({children}) => {
  let Grid = children;
  return <Grid draggableHeaderCell={DraggableHeaderCell} />;
};

export default DragDropContext(HTML5Backend)(DraggableContainer);
