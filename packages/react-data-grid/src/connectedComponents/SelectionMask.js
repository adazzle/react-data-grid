import React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from '../stateManagement/state/RxState';
import initialState from '../stateManagement/state/initialState';

/* MapStateToProps */

const Mask = ({ selectedPosition }) => {
  const { idx, rowIdx } = selectedPosition;
  const [width, height] = [150, 35];
  const setStyle = (x, y) => {
    return {
      position: 'absolute',
      height,
      width,
      zIndex: 1000,
      transform: `translate(${x}px, ${y}px)`
    };
  };
  return (
    <Motion style={{ x: spring(idx * width), y: spring(rowIdx * height) }}>
      {({ x, y }) => <div style={setStyle(x, y)} className="rdg-selected" />}
    </Motion>
  );
};

const mapStateToProps = ({ cell } = initialState) => {
  const { selectedPosition } = cell;
  return {
    selectedPosition
  };
};

module.exports = connect(mapStateToProps)(Mask);
