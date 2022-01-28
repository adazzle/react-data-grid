import { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import type { DragOverflowHide } from './types';

export const useDragHandlePopper = ({
  dragOverflowHide
}: {
  dragOverflowHide?: DragOverflowHide;
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const hooker = '[aria-selected=true]';

    const cellElement = document.querySelector(hooker);

    if (cellElement) {
      setReferenceElement(cellElement as HTMLDivElement);
    } else {
      setReferenceElement(null);
    }
  }, []);

  const popperRef = useRef<HTMLDivElement>(null);

  const { styles, attributes, state } = usePopper(referenceElement, popperRef.current, {
    placement: 'right-end',
    modifiers: [
      {
        name: 'flip',
        enabled: false
      },
      {
        name: 'offset',
        options: {
          offset: [2, -6]
        }
      }
    ]
  });

  const isReferenceHidden = state?.modifiersData.hide?.hasPopperEscaped ?? true;
  const referenceClippingOffsets = state?.modifiersData.hide?.referenceClippingOffsets ?? {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const isOverflowTop = referenceClippingOffsets.top > (dragOverflowHide?.top ?? 0);
  const isOverflowLeft = referenceClippingOffsets.left > (dragOverflowHide?.left ?? 0);
  const isOverflowRight = referenceClippingOffsets.right > (dragOverflowHide?.right ?? 0);
  const isOverflowBottom = referenceClippingOffsets.bottom > (dragOverflowHide?.bottom ?? 0);

  const isHide =
    isReferenceHidden || isOverflowTop || isOverflowLeft || isOverflowRight || isOverflowBottom;

  return { popperRef, styles, attributes, isHide };
};
