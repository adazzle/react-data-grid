import React, {Component} from 'react';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';
import isColumnsImmutable from '../../isColumnsImmutable';
import getDndContext from './dnd-context';

class DraggableContainer extends Component {

  getChildContext() {
    return {
      dragDropManager: getDndContext(this.context)
    };
  }

  getRows(rowsCount, rowGetter) {
    let rows = [];
    for (let j = 0; j < rowsCount; j++) {
      rows.push(rowGetter(j));
    }
    return rows;
  }

  renderGrid() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { draggableHeaderCell: DraggableHeaderCell });
    })[0];
  }

  render() {
    let grid = this.renderGrid();
    let rowGetter = this.props.getDragPreviewRow || grid.props.rowGetter;
    let rowsCount = grid.props.rowsCount;
    let columns = grid.props.columns;
    let rows = this.getRows(rowsCount, rowGetter);
    return (<div>
      {grid}
      <RowDragLayer rowSelection={grid.props.rowSelection} rows={rows} columns={isColumnsImmutable(columns) ? columns.toArray() : columns} />
    </div>);
  }
}

DraggableContainer.childContextTypes = {
  dragDropManager: React.PropTypes.object.isRequired
};

DraggableContainer.contextTypes = {
  dragDropManager: React.PropTypes.object
};

DraggableContainer.propTypes = {
  children: React.PropTypes.element.isRequired,
  getDragPreviewRow: React.PropTypes.func
};

export default DraggableContainer;
