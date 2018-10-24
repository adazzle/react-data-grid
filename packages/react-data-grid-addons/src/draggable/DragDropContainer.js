import React, {Component} from 'react';
import html5DragDropContext from '../shared/html5DragDropContext';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';
import { utils } from 'react-data-grid';
const { isColumnsImmutable } = utils;
import PropTypes from 'prop-types';

class DraggableContainer extends Component {

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

DraggableContainer.propTypes = {
  children: PropTypes.element.isRequired,
  getDragPreviewRow: PropTypes.func
};

export default html5DragDropContext(DraggableContainer);
