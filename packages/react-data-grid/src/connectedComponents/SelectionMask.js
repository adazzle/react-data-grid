import React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from '../stateManagement/state/RxState';
import initialState from '../stateManagement/state/initialState';


const setMaskStyle = (left, top, width, height) => {
  return {
    position: 'absolute',
    height,
    width,
    zIndex: 1000,
    transform: `translate(${left}px, ${top}px)`
  };
};

const Mask = ({ left, top, width, height }) => {
  return (
    <Motion style={{ x: spring(left), y: spring(top), w: spring(width), h: spring(height) }}>
      {({ x, y, w, h }) => <div style={setMaskStyle(x, y, w, h)} className="rdg-selected" />}
    </Motion>
  );
};

/* MapStateToProps */
const getRowTop = (rowIdx, rowHeight) => rowIdx * rowHeight;

const mapStateToProps = ({ cell } = initialState, {columns, height}) => {
  const { selectedPosition: {idx, rowIdx} } = cell;
  return {
    width: columns[idx].width,
    left: columns[idx].left,
    top: getRowTop(rowIdx, height)
  };
};

module.exports = connect(mapStateToProps)(Mask);
