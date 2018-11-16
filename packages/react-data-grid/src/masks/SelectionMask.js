import React from 'react';
import PropTypes from 'prop-types';
import CellMask from './CellMask';
import columnUtils from '../ColumnUtils';
import zIndexes from 'common/constants/zIndexes';

const isFrozenColumn = (columns, { idx }) => columnUtils.isFrozen(columnUtils.getColumn(columns, idx));

const isScrollingHorizontallyWithoutCellChange = ({ scrollTop, prevScrollTop, scrollLeft, prevScrollLeft, selectedPosition, prevSelectedPosition }) => {
  return scrollLeft !== prevScrollLeft && (scrollTop === prevScrollTop) && selectedPosition.idx === prevSelectedPosition.idx;
};

const getLeftPosition = (isFrozen, cellLeft, props) => {
  if (isFrozen && !isScrollingHorizontallyWithoutCellChange(props)) {
    return props.scrollLeft + cellLeft;
  }
  return cellLeft;
};


export const getCellMaskDimensions = (props) => {
  const { selectedPosition, columns, getSelectedRowHeight, getSelectedRowTop } = props;
  const column = columnUtils.getColumn(columns, selectedPosition.idx);
  const height = getSelectedRowHeight(selectedPosition.rowIdx);
  const top = getSelectedRowTop(selectedPosition.rowIdx);
  const frozen = isFrozenColumn(columns, selectedPosition);
  const zIndex = frozen ? zIndexes.FROZEN_CELL_MASK : zIndexes.CELL_MASK;
  const left = getLeftPosition(frozen, column.left, props);
  return { height, top, width: column.width, left, zIndex };
};

function SelectionMask({ children, innerRef, ...rest }) {
  const dimensions = getCellMaskDimensions(rest);
  const frozen = isFrozenColumn(rest.columns, rest.selectedPosition);
  const position = frozen && isScrollingHorizontallyWithoutCellChange(rest) ? 'fixed' : 'absolute';
  return (
    <CellMask
      {...dimensions}
      className="rdg-selected"
      position={position}
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
  innerRef: PropTypes.func
};

export default SelectionMask;
