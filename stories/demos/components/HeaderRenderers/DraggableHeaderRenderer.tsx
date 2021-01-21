import { useDrag, useDrop } from 'react-dnd';
import type { DragObjectWithType } from 'react-dnd';

import { SortableHeaderCell } from '../../../../src';
import type { HeaderRendererProps } from '../../../../src';
import { useCombinedRefs } from '../../../useCombinedRefs';

interface ColumnDragObject extends DragObjectWithType {
  key: string;
}

interface DraggableHeaderRendererProps<R> extends HeaderRendererProps<R> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export function DraggableHeaderRenderer<R>({ onColumnsReorder, column, sortColumn, sortDirection, onSort }: DraggableHeaderRendererProps<R>) {
  const [{ isDragging }, drag] = useDrag({
    item: { key: column.key, type: 'COLUMN_DRAG' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key, type }: ColumnDragObject) {
      if (type === 'COLUMN_DRAG') {
        onColumnsReorder(key, column.key);
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
      <SortableHeaderCell
        column={column}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      >
        {column.name}
      </SortableHeaderCell>
    </div>
  );
}
