import React from 'react';
import PropTypes from 'prop-types';
import html5DragDropContext from '../shared/html5DragDropContext';
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

export default html5DragDropContext(DraggableContainer);
