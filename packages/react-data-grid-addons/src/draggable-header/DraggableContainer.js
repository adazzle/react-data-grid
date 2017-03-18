import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableHeaderCell from './DraggableHeaderCell';

class DraggableContainer extends React.Component {
  renderGrid() {
    return React.Children.map(this.props.children, child => {
      // clone header cell and change them to be draggable
      return React.cloneElement(child, {
        draggableHeaderCell: DraggableHeaderCell
      });
    })[0];
  }

  render() {
    let grid = this.renderGrid();
    return (
      <div>
        {/* clone grid and pass onHeaderDrop prop */}
        {React.cloneElement(grid, this.props)}
      </div>
    );
  }
}

// wrapper as drag and drop target
export default DragDropContext(HTML5Backend)(DraggableContainer);
