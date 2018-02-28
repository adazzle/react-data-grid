import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

const setMaskStyle = (left, top, width, height, isFixed) => {
  return {
    position: isFixed != null ? 'fixed' : 'absolute',
    height,
    width,
    zIndex: 1000,
    transform: `translate(${left}px, ${top}px)`
  };
};

class SelectionMask extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    selectedPosition: PropTypes.object,
    isFixed: PropTypes.bool
  }

  render() {
    const {width, height, top, left, isFixed} = this.props;
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
          <div tabIndex="0" style={setMaskStyle(x, y, w, h, isFixed)} className="rdg-selected moving-element" />
        )}
      </Motion>
    );
  }
}

export default SelectionMask;
