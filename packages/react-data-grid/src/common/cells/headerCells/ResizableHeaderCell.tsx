import React, { useRef, cloneElement } from 'react';
import { CalculatedColumn } from '../../../common/types';

export interface ResizableHeaderCellProps<R> {
  children: React.ReactElement<React.ComponentProps<'div'>>;
  column: CalculatedColumn<R>;
  onResize(column: CalculatedColumn<R>, width: number): void;
}

export default function ResizableHeaderCell<R>({
  children,
  column,
  ...props
}: ResizableHeaderCellProps<R>) {
  const cellRef = useRef<HTMLDivElement>(null);

  function onMouseDown(event: React.MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    const { right } = event.currentTarget.getBoundingClientRect();
    const offset = right - event.clientX;

    if (offset > 11) { // +1px to account for the border size
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      onResize(event.clientX + offset);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    event.preventDefault();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onTouchStart(event: React.TouchEvent) {
    const touch = event.changedTouches[0];
    const { identifier } = touch;
    const { right } = event.currentTarget.getBoundingClientRect();
    const offset = right - touch.clientX;

    if (offset > 11) { // +1px to account for the border size
      return;
    }

    function getTouch(event: TouchEvent) {
      for (const touch of event.changedTouches) {
        if (touch.identifier === identifier) return touch;
      }
      return null;
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = getTouch(event);
      if (touch) {
        onResize(touch.clientX + offset);
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = getTouch(event);
      if (!touch) return;
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  }

  function onResize(x: number) {
    const width = getWidthFromMouseEvent(x);
    if (width > 0) {
      props.onResize(column, width);
    }
  }

  function getWidthFromMouseEvent(x: number): number {
    return x - cellRef.current!.getBoundingClientRect().left;
  }

  return cloneElement(children, {
    ref: cellRef,
    onMouseDown,
    onTouchStart,
    children: (
      <>
        {children.props.children}
        <div className="rdg-header-cell-resizer" />
      </>
    )
  });
}
