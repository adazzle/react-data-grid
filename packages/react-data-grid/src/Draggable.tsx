import React from 'react';
import { Omit } from './common/types';

type DragHandler = (x: number, y: number) => void;

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd'> {
  onDrag: DragHandler;
  onDragEnd: DragHandler;
}

export default function Draggable({ onDrag, onDragEnd, ...props }: Props) {
  function onMouseDown(event: React.MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    function onMouseMove(event: MouseEvent) {
      onDrag(event.clientX, event.clientY);
    }

    function onMouseUp(event: MouseEvent) {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onDragEnd(event.clientX, event.clientY);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    onDrag(event.clientX, event.clientY);
  }

  function onTouchStart(event: React.TouchEvent) {
    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      onDrag(touch.clientX, touch.clientY);
    }

    function onTouchEnd(event: TouchEvent) {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      const touch = event.touches[0];
      onDragEnd(touch.clientX, touch.clientY);
    }

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    const touch = event.touches[0];
    onDrag(touch.clientX, touch.clientY);
  }

  return (
    <div
      {...props}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
}
