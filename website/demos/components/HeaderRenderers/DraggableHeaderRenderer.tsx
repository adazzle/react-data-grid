import { useDrag, useDrop } from 'react-dnd';

import { headerRenderer } from '../../../../src';
import type { HeaderRendererProps } from '../../../../src';

interface DraggableHeaderRendererProps<R> extends HeaderRendererProps<R> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export function DraggableHeaderRenderer<R>({
  onColumnsReorder,
  column,
  ...props
}: DraggableHeaderRendererProps<R>) {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN_DRAG',
    item: { key: column.key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key }: { key: string }) {
      onColumnsReorder(key, column.key);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div
      ref={(ref) => {
        drag(ref);
        drop(ref);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : undefined,
        cursor: 'move'
      }}
    >
      {headerRenderer({ column, ...props })}
    </div>
  );
}
