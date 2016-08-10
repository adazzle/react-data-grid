import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  cursor: '-webkit-grabbing',
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer {

  render() {
    const { isDragging, item } = this.props;
    let cells = [];
    if (item != null) {
      for (let c in item.data) {
        if (item.data.hasOwnProperty(c)) {
          cells.push(<td className="react-grid-Cell">{item.data[c]}</td>);
        }
      }
    }

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles} className="rdg-dragging">
        <div style={getItemStyles(this.props)} className="rdg-dragging">
          <table><tbody><tr>{cells}</tr></tbody></table>
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
