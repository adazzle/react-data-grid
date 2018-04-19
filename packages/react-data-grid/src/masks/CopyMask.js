import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function CopyMask({ copiedPosition, columns, rowHeight }) {
  if (copiedPosition != null) {
    const dimensions = getSelectedDimensions({ selectedPosition: copiedPosition, columns, rowHeight });
    return (
      <CellMask
        {...dimensions}
        className="react-grid-cell-copied"
      />
    );
  }
  return null;
}

CopyMask.propTypes = {
  copiedPosition: PropTypes.object,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default CopyMask;
