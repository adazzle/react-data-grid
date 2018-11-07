import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function CopyMask({ copiedPosition, innerRef, ...rest }) {
  const dimensions = getSelectedDimensions({ selectedPosition: copiedPosition, ...rest });
  return (
    <CellMask
      {...dimensions}
      className="react-grid-cell-copied"
      innerRef={innerRef}
    />
  );
}

CopyMask.propTypes = {
  copiedPosition: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number.isRequired,
  innerRef: PropTypes.func.isRequired
};

export default CopyMask;
