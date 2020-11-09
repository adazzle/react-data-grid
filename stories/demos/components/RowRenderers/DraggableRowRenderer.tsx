import { useDrag, useDrop } from 'react-dnd';
import type { DragObjectWithType } from 'react-dnd';
import clsx from 'clsx';

import { Row } from '../../../../src';
import type { RowRendererProps } from '../../../../src';
import { useCombinedRefs } from '../../../../src/hooks';

import './DraggableRowRenderer.less';

interface RowDragObject extends DragObjectWithType {
  index: number;
}

interface DraggableRowRenderProps<R, SR> extends RowRendererProps<R, SR> {
  onRowReorder: (sourceIndex: number, targetIndex: number) => void;
}

export function DraggableRowRenderer<R, SR = unknown>({
  rowIdx,
  isRowSelected,
  className,
  onRowReorder,
  ...props
}: DraggableRowRenderProps<R, SR>) {
  const [{ isDragging }, drag] = useDrag({
    item: { index: rowIdx, type: 'ROW_DRAG' },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ROW_DRAG',
    drop({ index, type }: RowDragObject) {
      if (type === 'ROW_DRAG') {
        onRowReorder(index, rowIdx);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  className = clsx(
    className,
    {
      'rdg-row-dragging': isDragging,
      'rdg-row-over': isOver
    }
  );

  return (
    <Row
      ref={useCombinedRefs(drag, drop)}
      rowIdx={rowIdx}
      isRowSelected={isRowSelected}
      className={className}
      {...props}
    />
  );
}
