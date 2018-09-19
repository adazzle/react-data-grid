import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedRangeDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function SelectionRangeMask({ selectedRange, columns, rowHeight, children}) {
  const dimensions = getSelectedRangeDimensions({ selectedRange, columns, rowHeight });
  return (
    <CellMask
      {...dimensions}
      className="rdg-selected-range"
    >
      {children}
    </CellMask>
  );
}

SelectionRangeMask.propTypes = {
  selectedRange: PropTypes.shape({
    topLeft: PropTypes.shape({ idx: PropTypes.number.isRequired, rowIdx: PropTypes.number.isRequired }).isRequired,
    bottomRight: PropTypes.shape({ idx: PropTypes.number.isRequired, rowIdx: PropTypes.number.isRequired }).isRequired,
    startCell: PropTypes.shape({ idx: PropTypes.number.isRequired, rowIdx: PropTypes.number.isRequired }).isRequired,
    cursorCell: PropTypes.shape({ idx: PropTypes.number.isRequired, rowIdx: PropTypes.number.isRequired }).isRequired
  }).isRequired,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default SelectionRangeMask;
