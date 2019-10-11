import React, { Component } from 'react';
import PropTypes from 'prop-types';

import html5DragDropContext from '../shared/html5DragDropContext';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';

class DraggableContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    getDragPreviewRow: PropTypes.func
  };

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
    const { rowsCount, columns } = grid.props;
    const rows = this.getRows(rowsCount, rowGetter);
    return (
      <div>
        {grid}
        <RowDragLayer
          selectedRows={grid.props.selectedRows}
          rows={rows}
          columns={columns}
        />
      </div>
    );
  }
}

export default html5DragDropContext(DraggableContainer);
