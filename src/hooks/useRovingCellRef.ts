import { useState } from 'react';
import { useLayoutEffect } from './useLayoutEffect';
import { scrollIntoView } from '../utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
export function useRovingCellRef(isSelected: boolean) {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#gridNav_focus
  const [isChildFocused, setIsChildFocused] = useState(false);
  const [cell, setRef] = useState<HTMLDivElement | null>(null);

  if (isChildFocused && !isSelected) {
    setIsChildFocused(false);
  }

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      setIsChildFocused(true);
    }
  }
  useLayoutEffect(() => {
    if (isSelected && cell) {
      scrollIntoView(cell);
      if (cell.contains(document.activeElement)) return;
      cell.focus({ preventScroll: true });
    }
  }, [isSelected, cell]);

  const isFocused = isSelected && !isChildFocused;

  return {
    ref: setRef,
    tabIndex: isFocused ? 0 : -1,
    onFocus: isSelected ? onFocus : undefined
  };
}
