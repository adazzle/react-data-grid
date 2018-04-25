import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function DragMask({ draggedPosition, columns, rowHeight }) {
  const { overRowIdx, idx, rowIdx } = draggedPosition;
  if (overRowIdx != null && rowIdx !== overRowIdx) {
    const isDraggedOverDown = rowIdx < overRowIdx;
    const startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
    const endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
    const className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';

    const dimensions = getSelectedDimensions({ selectedPosition: { idx, rowIdx: startRowIdx }, columns, rowHeight });
    for (let currentRowIdx = startRowIdx + 1; currentRowIdx <= endRowIdx; currentRowIdx++) {
      const { height } = getSelectedDimensions({ selectedPosition: { idx, rowIdx: currentRowIdx }, columns, rowHeight });
      dimensions.height += height;
    }

    return (
      <CellMask
        {...dimensions}
        className={className}
      />
    );
  }
  return null;
}

DragMask.propTypes = {
  draggedPosition: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default DragMask;
