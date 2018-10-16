import React from 'react';
import PropTypes from 'prop-types';
import html5DragDropContext from '../shared/html5DragDropContext';
import DraggableHeaderCell from './DraggableHeaderCell';

class DraggableContainer extends React.Component {
  render() {
    return React.cloneElement(
      React.Children.only(this.props.children), {
        ...this.props,
        draggableHeaderCell: DraggableHeaderCell
      }
    );
  }
}

DraggableContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default html5DragDropContext(DraggableContainer);
