import React, { Component } from 'react';
import PropTypes from 'prop-types';

import html5DragDropContext from '../shared/html5DragDropContext';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';
import { isColumnsImmutable } from 'common/utils';

class DraggableContainer extends Component {
  getRows(rowsCount, rowGetter) {
    const rows = [];
    for (let j = 0; j < rowsCount; j++) {
      rows.push(rowGetter(j));
    }
    return rows;
  }

  renderGrid() {
    return React.cloneElement(
      React.Children.only(this.props.children), {
        draggableHeaderCell: DraggableHeaderCell
      }
    );
  }

  render() {
    const grid = this.renderGrid();
    const rowGetter = this.props.getDragPreviewRow || grid.props.rowGetter;
    const rowsCount = grid.props.rowsCount;
    const columns = grid.props.columns;
    const rows = this.getRows(rowsCount, rowGetter);
    return (
      <div>
        {grid}
        <RowDragLayer
          rowSelection={grid.props.rowSelection}
          rows={rows}
          columns={isColumnsImmutable(columns) ? columns.toArray() : columns}
        />
      </div>
    );
  }
}

DraggableContainer.propTypes = {
  children: PropTypes.element.isRequired,
  getDragPreviewRow: PropTypes.func
};

export default html5DragDropContext(DraggableContainer);
