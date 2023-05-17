import { useCallback } from 'react';

export function useFocusRef<T extends HTMLOrSVGElement>(isSelected: boolean, isFocused: boolean) {
  const ref = useCallback(
    (el: T | null) => {
      if (isFocused) {
        el?.focus({ preventScroll: true });
      }
    },
    [isFocused]
  );

  return {
    ref,
    tabIndex: isSelected ? 0 : -1
  };
}
