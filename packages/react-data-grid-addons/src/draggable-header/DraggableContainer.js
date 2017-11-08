import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableHeaderCell from './DraggableHeaderCell';

class DraggableContainer extends React.Component {
  renderGrid() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        draggableHeaderCell: DraggableHeaderCell
      });
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

DraggableContainer.propTypes = {
  children: PropTypes.element
};

export default DragDropContext(HTML5Backend)(DraggableContainer);
