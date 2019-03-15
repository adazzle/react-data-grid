import React from 'react';
import PropTypes from 'prop-types';

const setMaskStyle = ({ left, top, width, height, zIndex }) => {
  return {
    height,
    width,
    zIndex,
    position: 'absolute',
    pointerEvents: 'none',
    transform: `translate(${left}px, ${top}px)`,
    outline: 0
  };
};

export default function CellMask({ width, height, top, left, zIndex, children, innerRef, ...rest }) {
  return (
    <div
      style={setMaskStyle({ left, top, width, height, zIndex })}
      data-test="cell-mask"
      ref={innerRef}
      {...rest}
    >
      {children}
    </div>
  );
}

CellMask.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  children: PropTypes.node,
  innerRef: PropTypes.func
};
