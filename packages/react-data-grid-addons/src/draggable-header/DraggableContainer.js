import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableHeaderCell from './DraggableHeaderCell';

class DraggableContainer extends React.Component {
  getRows(rowsCount, rowGetter) {
    // zkopírování řádků
    let rows = [];
    for (let j = 0; j < rowsCount; j++) {
      rows.push(rowGetter(j));
    }
    return rows;
  }

  renderGrid() {
    return React.Children.map(this.props.children, (child) => {
        // klonování columns, draggable === true => možnost předání jiné komponenty pomocí draggableHeaderCell
      return React.cloneElement(child, { draggableHeaderCell: DraggableHeaderCell });
    })[0];
  }

  render() {
    let grid = this.renderGrid();
    return (
        <div>
            {React.cloneElement(grid, this.props)}
        </div>
    );
  }
}

// Obalovač, který slouží jako drag and drop target
export default DragDropContext(HTML5Backend)(DraggableContainer);