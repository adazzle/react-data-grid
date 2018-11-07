import React from 'react';
import PropTypes from 'prop-types';
import CellMask from './CellMask';
import * as columnUtils from '../ColumnUtils';
import zIndexes from 'common/constants/zIndexes';

const isFrozenColumn = (columns, { idx }) => columnUtils.isFrozen(columnUtils.getColumn(columns, idx));

export const getCellMaskDimensions = (props) => {
  const { selectedPosition, columns, getSelectedRowHeight, getSelectedRowTop } = props;
  const column = columnUtils.getColumn(columns, selectedPosition.idx);
  const height = getSelectedRowHeight(selectedPosition.rowIdx);
  const top = getSelectedRowTop(selectedPosition.rowIdx);
  const frozen = isFrozenColumn(columns, selectedPosition);
  const zIndex = frozen ? zIndexes.FROZEN_CELL_MASK : zIndexes.CELL_MASK;
  const left = frozen ? column.left + props.scrollLeft : column.left;
  return { height, top, width: column.width, left, zIndex };
};

function SelectionMask({ children, innerRef, ...rest }) {
  const dimensions = getCellMaskDimensions(rest);
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
