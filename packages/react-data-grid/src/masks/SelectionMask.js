import React from 'react';
import { Motion, spring } from 'react-motion';

const setMaskStyle = (left, top, width, height, isFixed) => {
  return {
    position: isFixed === true ? 'fixed' : 'absolute',
    height,
    width,
    zIndex: 1000,
    transform: `translate(${left}px, ${top}px)`
  };
};

const AnimatedMask = ({ width, height, top, left, isFixed }) => {
  return (
    <Motion
      style={{
        x: spring(left),
        y: spring(top),
        w: spring(width),
        h: spring(height)
      }}
    >
      {({ x, y, w, h }) => (
        <div
          style={setMaskStyle(x, y, w, h, isFixed)}
          className="rdg-selected moving-element"
        />
      )}
    </Motion>
  );
};

const SelectionMask = (props) => {
  const { width, height, top, left, isFixed, isAnimating } = props;
  return isAnimating
    ? <AnimatedMask {...props} />
    : (
      <div
        style={setMaskStyle(left, top, width, height, isFixed)}
        className="rdg-selected"
      />
    );
};

export default SelectionMask;
