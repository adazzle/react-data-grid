import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';

function SelectionMask({ selectedPosition, columns, rowHeight, children, isGroupedRow, scrollLeft }) {
  const dimensions = getSelectedDimensions({ selectedPosition, columns, rowHeight });
  const width = isGroupedRow ? '100%' : dimensions.width;
  const left = isGroupedRow ? scrollLeft : dimensions.left;
  const d = {...dimensions, ...{width, left} };
  return (
    <CellMask
      {...d}
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
