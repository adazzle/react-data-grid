import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';
import { css } from '@linaria/core';

import { Row } from '../../../../src';
import type { RowRendererProps } from '../../../../src';
import { useCombinedRefs } from '../../../useCombinedRefs';

const rowDraggingClassname = css`
  opacity: 0.5;
`;

const rowOverClassname = css`
  background-color: #ececec;
`;

interface DraggableRowRenderProps<R, SR, FR> extends RowRendererProps<R, SR, FR> {
  onRowReorder: (sourceIndex: number, targetIndex: number) => void;
}

export function DraggableRowRenderer<R, SR, FR>({
  rowIdx,
  isRowSelected,
  className,
  onRowReorder,
  ...props
}: DraggableRowRenderProps<R, SR, FR>) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ROW_DRAG',
    item: { index: rowIdx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ROW_DRAG',
    drop({ index }: { index: number }) {
      onRowReorder(index, rowIdx);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  className = clsx(className, {
    [rowDraggingClassname]: isDragging,
    [rowOverClassname]: isOver
  });

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
