import React from 'react';
import PropTypes from 'prop-types';
import DraggableHeaderCell from './DraggableHeaderCell';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class DraggableContainer extends React.Component {
  renderGrid() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        draggableHeaderCell: DraggableHeaderCell
      });
    })[0];
  }

  render() {
    let grid = this.renderGrid();
    // Test if a react-dnd context already exists
    // higher up the component tree. If not, insert
    // a react-dnd DragDropContextProvider to serve as context
    const addContextIfNeeded = component =>
      this.context.dragDropManager
        ? component
        : <DragDropContextProvider backend={HTML5Backend}>
          {component}
        </DragDropContextProvider>;
    return addContextIfNeeded(
      <div>
        {React.cloneElement(grid, this.props)}
      </div>
    );
  }
}

DraggableContainer.propTypes = {
  children: PropTypes.element
};

DraggableContainer.contextTypes = {
  dragDropManager: PropTypes.object
};
