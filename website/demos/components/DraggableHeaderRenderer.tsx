import { useState } from 'react';

import { renderHeaderCell, type RenderHeaderCellProps } from '../../../src';

interface DraggableHeaderRendererProps<R> extends RenderHeaderCellProps<R> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export function DraggableHeaderRenderer<R>({
  onColumnsReorder,
  column,
  ...props
}: DraggableHeaderRendererProps<R>) {
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('text/plain', column.key);
    event.dataTransfer.setDragImage(event.currentTarget.closest('.rdg-cell')!, 0, 0);
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleDragEnter() {
    setIsOver(true);
  }

  function handleDragLeave() {
    setIsOver(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    // prevent default to allow drop
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    setIsOver(false);
    const sourceKey = event.dataTransfer.getData('text/plain');
    if (sourceKey !== column.key) {
      event.preventDefault();
      onColumnsReorder(sourceKey, column.key);
    }
  }

  return (
    <div
      draggable
      /* events fired on the draggable target */
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      /* events fired on the drop targets */
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : undefined,
        cursor: 'move'
      }}
    >
      {renderHeaderCell({ column, ...props })}
    </div>
  );
}
