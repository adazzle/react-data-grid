import { useDrag, useDrop } from 'react-dnd';
import { useRefComposer } from 'react-ref-composer';
import React from 'react';

import { SortableHeaderCell } from '../../../../src';
import type { HeaderRendererProps } from '../../../../src';

export interface DraggableHeaderRendererProps<R> extends HeaderRendererProps<R> {
  headerRenderer?: React.ComponentType<HeaderRendererProps<R>> | null;
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export function DraggableHeaderRenderer<R>(props: DraggableHeaderRendererProps<R>) {
  const { headerRenderer, ...rest } = props;
  const { onColumnsReorder, column, sortDirection, onSort, priority } = rest;

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

  const composeRefs = useRefComposer();

  return (
    <div
      ref={composeRefs(drag, drop)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : 'inherit',
        cursor: 'move'
      }}
    >
      <SortableHeaderCell sortDirection={sortDirection} onSort={onSort} priority={priority}>
        {headerRenderer ? React.createElement(headerRenderer, rest) : column.name}
      </SortableHeaderCell>
    </div>
  );
}
