import React from 'react';
import PropTypes from 'prop-types';

import CellMask from './CellMask';

function DragMask({ draggedPosition, getSelectedDimensions }) {
  const { overRowIdx, idx, rowIdx } = draggedPosition;
  if (overRowIdx != null && rowIdx !== overRowIdx) {
    const isDraggedOverDown = rowIdx < overRowIdx;
    const startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
    const endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
    const className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';

    const dimensions = getSelectedDimensions({ idx, rowIdx: startRowIdx });
    for (let currentRowIdx = startRowIdx + 1; currentRowIdx <= endRowIdx; currentRowIdx++) {
      const { height } = getSelectedDimensions({ idx, rowIdx: currentRowIdx });
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
  getSelectedDimensions: PropTypes.func.isRequired
};

export default DragMask;
