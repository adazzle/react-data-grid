import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

const setMaskStyle = (left, top, width, height) => {
  return {
    position: 'absolute',
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
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    onHitBottomBoundary: PropTypes.func,
    onHitTopBoundary: PropTypes.func,
    selectedPosition: PropTypes.object
  }

  componentDidUpdate() {
    const {
      selectedPosition: { rowIdx },
      visibleEnd,
      onHitBottomBoundary
    } = this.props;
    if (rowIdx === visibleEnd - 1) {
      onHitBottomBoundary();
    }
  }

  render() {
    const {width, height, top, left} = this.props;
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
          <div tabIndex="0" style={setMaskStyle(x, y, w, h)} className="rdg-selected moving-element" />
        )}
      </Motion>
    );
  }
}

export default SelectionMask;
