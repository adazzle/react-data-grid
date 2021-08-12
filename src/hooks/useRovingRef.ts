import { useRef, useLayoutEffect } from 'react';

export function useRovingRef(isSelected: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const isChildFocusable = useRef(false);

  useLayoutEffect(() => {
    if (!isSelected || isChildFocusable.current) return;
    ref.current?.focus({ preventScroll: true });
  }, [isSelected]);

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== ref.current) {
      isChildFocusable.current = true;
    }
  }

  return {
    ref,
    tabIndex: isSelected && !isChildFocusable.current ? 0 : -1,
    onFocus
  };
}
