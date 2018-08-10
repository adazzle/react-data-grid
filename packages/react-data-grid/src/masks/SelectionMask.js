import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';
import * as columnUtils from '../ColumnUtils';

const isLockedColumn = (columns, {idx}) => columnUtils.getColumn(columns, idx).locked;

const getLeftPosition = (isGroupedRow, isFrozenColumn, scrollLeft, cellLeft) => {
  if (isGroupedRow) {
    return scrollLeft;
  } else if (isFrozenColumn) {
    return scrollLeft + cellLeft;
  }
  return cellLeft;
};

function SelectionMask({ selectedPosition, columns, rowHeight, children, isGroupedRow, scrollLeft, top }) {
  const dimensions = getSelectedDimensions({ selectedPosition, columns, rowHeight });
  const width = isGroupedRow ? '100%' : dimensions.width;
  const locked = isLockedColumn(columns, selectedPosition);
  const left = getLeftPosition(isGroupedRow, locked, scrollLeft, dimensions.left);
  const d = {...dimensions, ...{width, left} };
  return (
    <CellMask
      {...d}
      top={top || dimensions.top}
      className="rdg-selected rdg-cell-mask"
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
