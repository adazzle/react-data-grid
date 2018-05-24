import React from 'react';
import PropTypes from 'prop-types';

function DragHandle({ onDragStart, onDragEnd, onDoubleClick }) {
  return (
    <div
      className="drag-handle"
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDoubleClick={onDoubleClick}
    />
  );
}

DragHandle.propTypes = {
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired
};

export default DragHandle;
