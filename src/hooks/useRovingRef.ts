import { useRef, useLayoutEffect, useState } from 'react';

export function useRovingRef(isSelected: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const isChildFocused = useRef(false);
  const [, forceRender] = useState({});

  useLayoutEffect(() => {
    if (!isSelected) {
      isChildFocused.current = false;
      return;
    }

    if (isChildFocused.current) {
      // When the child is focused, we need to rerender
      // the cell again so tabIndex is updated to -1
      forceRender({});
      return;
    }
    ref.current?.focus();
  }, [isSelected]);

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== ref.current) {
      isChildFocused.current = true;
    }
  }

  const isFocused = isSelected && !isChildFocused.current;

  return {
    ref,
    tabIndex: isFocused ? 0 : -1,
    onFocus
  };
}
