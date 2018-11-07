import React from 'react';
import PropTypes from 'prop-types';

import CellMask from './CellMask';
import { getSelectedDimensions } from '../utils/SelectedCellUtils';

function SelectionMask({ children, innerRef, ...rest }) {
  const dimensions = getSelectedDimensions(rest);
  return (
    <CellMask
      {...dimensions}
      className="rdg-selected"
      innerRef={innerRef}
      tabIndex="0"
    >
      {children}
    </CellMask>
  );
}

SelectionMask.propTypes = {
  selectedPosition: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  innerRef: PropTypes.func.isRequired
};

export default SelectionMask;
