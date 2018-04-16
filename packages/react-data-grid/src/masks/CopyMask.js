import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function CopyMask({ copiedPosition, columns, rowHeight }) {
  const dimensions = copiedPosition ? getSelectedDimensions({ selectedPosition: copiedPosition, columns, rowHeight }) : null;
  return (
    dimensions &&
    <CellMask
      {...dimensions}
      className="react-grid-cell-copied"
    />
  );
}

CopyMask.propTypes = {
  copiedPosition: PropTypes.object,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default CopyMask;
