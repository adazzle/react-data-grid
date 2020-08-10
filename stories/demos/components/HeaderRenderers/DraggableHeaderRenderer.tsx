import React from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import { HeaderRendererProps } from '../../../../src';
import { useCombinedRefs } from '../../../../src/hooks';

interface ColumnDragObject extends DragObjectWithType {
  key: string;
}

export function DraggableHeaderRenderer<R>({ onColumnsReorder, ...props }: HeaderRendererProps<R> & { onColumnsReorder: (sourceKey: string, targetKey: string) => void }) {
  const [{ isDragging }, drag] = useDrag({
    item: { key: props.column.key, type: 'COLUMN_DRAG' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key, type }: ColumnDragObject) {
      if (type === 'COLUMN_DRAG') {
        onColumnsReorder(key, props.column.key);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  return (
    <div
      ref={useCombinedRefs(drag, drop)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : 'inherit',
        cursor: 'move'
      }}
    >
      {props.column.name}
    </div>
  );
}
