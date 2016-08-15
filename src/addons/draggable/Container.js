import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';

class DraggableContainer extends Component {

  renderGrid() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { draggableHeaderCell: DraggableHeaderCell });
    })[0];
  }

  render() {
    let grid = this.renderGrid();
    return (<div>
      {grid}
      <RowDragLayer rowSelection={grid.props.rowSelection} rowsCount={grid.props.rowsCount} rowGetter={this.props.getDragPreviewRow || grid.props.rowGetter}/>
    </div>);
  }
}

DraggableContainer.propTypes = {
  children: React.PropTypes.element.isRequired,
  getDragPreviewRow: React.PropTypes.func
};

export default DragDropContext(HTML5Backend)(DraggableContainer);
