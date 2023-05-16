import { useRef } from 'react';

import { useLayoutEffect } from './useLayoutEffect';

export function useFocusRef<T extends HTMLOrSVGElement>(isSelected: boolean, isFocused: boolean) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!isFocused) return;
    ref.current?.focus({ preventScroll: true });
  }, [isFocused]);

  return {
    ref,
    tabIndex: isSelected ? 0 : -1
  };
}
