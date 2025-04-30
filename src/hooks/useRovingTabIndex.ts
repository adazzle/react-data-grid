import { useState } from 'react';

import { scrollIntoView } from '../utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
export function useRovingTabIndex(isSelected: boolean) {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#gridNav_focus
  const [isChildFocused, setIsChildFocused] = useState(false);

  if (isChildFocused && !isSelected) {
    setIsChildFocused(false);
  }

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      setIsChildFocused(true);
    }

    scrollIntoView(event.currentTarget);

    // Focus cell content when available instead of the cell itself
    event.currentTarget
      .querySelector<Element & HTMLOrSVGElement>('[tabindex="-1"]')
      ?.focus({ preventScroll: true });
  }

  const isFocusable = isSelected && !isChildFocused;

  return {
    tabIndex: isFocusable ? 0 : -1,
    childTabIndex: isSelected ? 0 : -1,
    onFocus
  };
}
