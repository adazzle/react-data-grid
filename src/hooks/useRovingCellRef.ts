import { useCallback, useState, type MutableRefObject } from 'react';

import { scrollIntoView } from '../utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
export function useRovingCellRef(
  isSelected: boolean,
  shouldFocusCellRef?: MutableRefObject<boolean>
) {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#gridNav_focus
  const [isChildFocused, setIsChildFocused] = useState(false);

  if (isChildFocused && !isSelected) {
    setIsChildFocused(false);
  }

  const ref = useCallback(
    (cell: HTMLDivElement | null) => {
      if (cell === null) return;
      if (!shouldFocusCellRef?.current) {
        return;
      }
      scrollIntoView(cell);
      if (cell.contains(document.activeElement)) return;
      shouldFocusCellRef.current = false;
      cell.focus({ preventScroll: true });
    },
    [shouldFocusCellRef]
  );

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      setIsChildFocused(true);
    }
  }

  const isFocusable = isSelected && !isChildFocused;

  return {
    ref: isSelected ? ref : undefined,
    tabIndex: isFocusable ? 0 : -1,
    onFocus: isSelected ? onFocus : undefined
  };
}
