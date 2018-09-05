import React from 'react';
import PropTypes from 'prop-types';
import CellMask from './CellMask';
import * as columnUtils from '../ColumnUtils';
import zIndexes from '../constants/zIndexes';

const isFrozenColumn = (columns, {idx}) => columnUtils.isFrozen(columnUtils.getColumn(columns, idx));

const getLeftPosition = (isFrozen, scrollLeft, cellLeft) => {
  if (isFrozen) {
    return scrollLeft + cellLeft;
  }
  return cellLeft;
};

export const getCellMaskDimensions = ({ selectedPosition, columns, scrollLeft, getSelectedRowHeight, getSelectedRowTop}) => {
  const column = columnUtils.getColumn(columns, selectedPosition.idx);
  const height = getSelectedRowHeight(selectedPosition.rowIdx);
  const top = getSelectedRowTop(selectedPosition.rowIdx);
  const frozen = isFrozenColumn(columns, selectedPosition);
  const zIndex = frozen ? zIndexes.FROZEN_CELL_MASK :  zIndexes.CELL_MASK;
  const left = getLeftPosition(frozen, scrollLeft, column.left);
  return {height, top, width: column.width, left, zIndex};
};

function SelectionMask({children, ...rest}) {
  const dimensions = getCellMaskDimensions(rest);
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
