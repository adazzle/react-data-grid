import React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from '../stateManagement/state/RxState';
import initialState from '../stateManagement/state/initialState';

const getRowTop = (rowIdx, rowHeight) => rowIdx * rowHeight;

const setMaskStyle = (left, top, width, height) => {
  return {
    position: 'absolute',
    height,
    width,
    zIndex: 1000,
    transform: `translate(${left}px, ${top}px)`
  };
};

class Mask extends React.Component {
  componentDidUpdate() {
    const { selectedPosition: {rowIdx}, visibleStart, visibleEnd, onHitBottomBoundary, onHitTopBoundary} = this.props;
    if (rowIdx === visibleEnd - 1) {
      onHitBottomBoundary();
    }
  }
  render() {
    const { selectedPosition: {idx, rowIdx}, columns, height, visibleEnd} = this.props;
    const width = columns[idx].width;
    const left = columns[idx].left;
    const top = getRowTop(rowIdx, height);
    return (
      <Motion style={{ x: spring(left), y: spring(top), w: spring(width), h: spring(height) }}>
        {({ x, y, w, h }) => <div style={setMaskStyle(x, y, w, h)} className="rdg-selected" />}
      </Motion>
    );
  }
}

/* MapStateToProps */
const mapStateToProps = ({ cell } = initialState) => {
  const { selectedPosition } = cell;
  return {
    selectedPosition
  };
};

module.exports = connect(mapStateToProps)(Mask);
