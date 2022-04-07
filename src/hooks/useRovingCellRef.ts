import { useCallback, useState } from 'react';
import { scrollIntoView } from '../utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
export function useRovingCellRef(isSelected: boolean) {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#gridNav_focus
  const [isChildFocused, setIsChildFocused] = useState(false);

  if (isChildFocused && !isSelected) {
    setIsChildFocused(false);
  }

  const ref = useCallback((cell: HTMLDivElement | null) => {
    if (cell === null) return;

    scrollIntoView(cell);
    const { activeElement, body } = document;

    // Don't focus if the cell or a descendant is focused.
    if (cell.contains(activeElement)) return;

    // Don't focus if we've focused on a specific element outside the grid,
    // for example focusing an external input outside the grid will close the open editor,
    // and the cell should not steal back focus.
    // If the body is the active element then it's fair to assume that "nothing" is focused,
    // i.e. after clicking in an empty area to close an editor, the grid can steal back the focus.
    if (activeElement !== body && !cell.closest('.rdg')!.contains(activeElement)) return;

    cell.focus({ preventScroll: true });
  }, []);

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      setIsChildFocused(true);
    }
  }

  const isFocused = isSelected && !isChildFocused;

  return {
    ref: isSelected ? ref : undefined,
    tabIndex: isFocused ? 0 : -1,
    onFocus: isSelected ? onFocus : undefined
  };
}
