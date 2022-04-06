import { useCallback, useState } from 'react';

// https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
export function useRovingCellRef(isSelected: boolean) {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#gridNav_focus
  const [isChildFocused, setIsChildFocused] = useState(false);

  if (isChildFocused && !isSelected) {
    setIsChildFocused(false);
  }

  const refCallback = useCallback(
    (cell: HTMLDivElement | null) => {
      if (cell === null || !isSelected || cell.contains(document.activeElement)) return;

      cell.focus({ preventScroll: true });
    },
    [isSelected]
  );

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      setIsChildFocused(true);
    }
  }

  const isFocused = isSelected && !isChildFocused;

  return {
    ref: refCallback,
    tabIndex: isFocused ? 0 : -1,
    onFocus
  };
}
