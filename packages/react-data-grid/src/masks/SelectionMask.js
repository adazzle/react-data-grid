import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function SelectionMask({ selectedPosition, columns, rowHeight, children }) {
  const dimensions = getSelectedDimensions({ selectedPosition, columns, rowHeight });
  return (
    <CellMask
      {...dimensions}
      className="rdg-selected"
    >
      {children}
    </CellMask>
  );
}

SelectionMask.propTypes = {
  selectedPosition: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default SelectionMask;
