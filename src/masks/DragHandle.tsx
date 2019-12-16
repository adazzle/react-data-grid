import React from 'react';

interface Props {
  onDragStart: React.DragEventHandler<HTMLDivElement>;
  onDragEnd: React.DragEventHandler<HTMLDivElement>;
  onDoubleClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function DragHandle({ onDragStart, onDragEnd, onDoubleClick }: Props) {
  return (
    <div
      className="drag-handle"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDoubleClick={onDoubleClick}
    />
  );
}
