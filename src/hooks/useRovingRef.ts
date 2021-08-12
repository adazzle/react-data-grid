import { useRef, useLayoutEffect, useState } from 'react';

export function useRovingRef(isSelected: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  // TODO: profile to check if this can cause performance issues
  const [isFocused, setFocus] = useState(false);

  useLayoutEffect(() => {
    if (!isSelected) return;
    ref.current?.focus({ preventScroll: true });
  }, [isSelected]);

  function onFocus() {
    setFocus(true);
  }

  function onBlur() {
    setFocus(false);
  }

  return {
    ref,
    tabIndex: isSelected ? 0 : -1,
    isFocused,
    onFocus,
    onBlur
  };
}
