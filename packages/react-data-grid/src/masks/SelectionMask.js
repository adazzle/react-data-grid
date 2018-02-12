import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

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

class SelectionMask extends React.Component {

  static propTypes = {
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    columns: PropTypes.array,
    rowHeight: PropTypes.number,
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
    const {
      selectedPosition: { idx, rowIdx },
      columns,
      rowHeight
    } = this.props;
    const width = columns[idx].width;
    const left = columns[idx].left;
    const top = getRowTop(rowIdx, rowHeight);
    return (
      <Motion
        style={{
          x: spring(left),
          y: spring(top),
          w: spring(width),
          h: spring(rowHeight)
        }}
      >
        {({ x, y, w, h }) => (
          <div tabIndex="0" style={setMaskStyle(x, y, w, h)} className='rdg-selected moving-element' />
        )}
      </Motion>
    );
  }
}

export default SelectionMask;
