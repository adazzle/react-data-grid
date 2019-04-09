import React from 'react';
import PropTypes from 'prop-types';

import CellMask from './CellMask';

export default function CopyMask({ copiedPosition, innerRef, getSelectedDimensions }) {
  const dimensions = getSelectedDimensions(copiedPosition);
  return (
    <CellMask
      {...dimensions}
      className="react-grid-cell-copied"
      ref={innerRef}
    />
  );
}

CopyMask.propTypes = {
  copiedPosition: PropTypes.object.isRequired,
  getSelectedDimensions: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired
};
