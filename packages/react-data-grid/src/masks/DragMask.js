import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function DragMask({ draggedPosition, columns, rowHeight }) {
  if (draggedPosition != null) {
    const { overRowIdx, idx, rowIdx } = draggedPosition;
    const isDraggedOverDown = rowIdx <= overRowIdx;
    const startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
    const endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
    const className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';

    const draggedCellMasks = [];
    for (let currentRowIdx = startRowIdx; currentRowIdx <= endRowIdx; currentRowIdx++) {
      const draggedMaskDimension = getSelectedDimensions({ selectedPosition: { idx, rowIdx: currentRowIdx }, columns, rowHeight });
      draggedCellMasks.push(
        <CellMask
          key={currentRowIdx}
          {...draggedMaskDimension}
          className={className}
        />
      );
    }
    return draggedCellMasks;
  }
  return null;
}

DragMask.propTypes = {
  selectedPosition: PropTypes.object.isRequired,
  draggedPosition: PropTypes.object,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default DragMask;
