import React from 'react';
import PropTypes from 'prop-types';

const setMaskStyle = ({ left, top, width, height }) => {
  return {
    height,
    width,
    position: 'absolute',
    zIndex: 1000,
    pointerEvents: 'none',
    transform: `translate(${left}px, ${top}px)`
  };
};

const SelectionMask = ({ width, height, top, left, children }) => (
  <div
    style={setMaskStyle({ left, top, width, height })}
    className="rdg-selected"
  >
    {children}
  </div>
);

SelectionMask.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired
};

export default SelectionMask;
