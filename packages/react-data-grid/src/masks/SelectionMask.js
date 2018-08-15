import React from 'react';
import PropTypes from 'prop-types';
import CellMask from './CellMask';
import * as columnUtils from '../ColumnUtils';
import zIndexes from '../constants/zIndexes';

const isLockedColumn = (columns, {idx}) => columnUtils.getColumn(columns, idx).locked;

const getLeftPosition = (isGroupedRow, isFrozenColumn, scrollLeft, cellLeft) => {
  if (isGroupedRow) {
    return scrollLeft;
  } else if (isFrozenColumn) {
    return scrollLeft + cellLeft;
  }
  return cellLeft;
};

export const getCellMaskDimensions = ({ selectedPosition, columns, isGroupedRow, scrollLeft, getSelectedRowHeight, getSelectedRowTop}) => {
  const column = columnUtils.getColumn(columns, selectedPosition.idx);
  const height = getSelectedRowHeight(selectedPosition.rowIdx);
  const top = getSelectedRowTop(selectedPosition.rowIdx);
  const width = isGroupedRow ? '100%' : column.width;
  const locked = isLockedColumn(columns, selectedPosition);
  const zIndex = locked ? zIndexes.LOCKED_CELL_MASK :  zIndexes.CELL_MASK;
  const left = getLeftPosition(isGroupedRow, locked, scrollLeft, column.left);
  return {height, top, width, left, zIndex};
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
