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

const CellMask = ({ width, height, top, left, children, ...rest }) => (
  <div
    style={setMaskStyle({ left, top, width, height })}
    {...rest}
  >
    {children}
  </div>
);

CellMask.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired
};

export default CellMask;
