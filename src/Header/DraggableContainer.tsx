import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableHeaderCell from './DraggableHeaderCell';

export function withDragDropContext<TProps extends {}>(Comp: React.ComponentType<TProps>) {
  function DragDropContext(props: TProps): JSX.Element {
    return (
      <DndProvider backend={HTML5Backend}>
        <Comp {...props} />
      </DndProvider>
    );
  }

  (DragDropContext as React.FC).displayName = `DragDropContext_${Comp.displayName}`;
  return DragDropContext;
}

interface Props {
  children: React.ReactElement;
  onHeaderDrop(source: number, target: number): void;
}

export default withDragDropContext(function DraggableContainer(props: Props): JSX.Element {
  return React.cloneElement(
    React.Children.only(props.children), {
      ...props,
      draggableHeaderCell: DraggableHeaderCell
    }
  );
});
