import { useState } from 'react';

// https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_general_within
export function useRovingTabIndex(isSelected: boolean) {
  // https://www.w3.org/WAI/ARIA/apg/patterns/grid/#keyboardinteraction-settingfocusandnavigatinginsidecells
  const [isChildFocused, setIsChildFocused] = useState(false);

  if (isChildFocused && !isSelected) {
    setIsChildFocused(false);
  }

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    const elementToFocus = event.currentTarget.querySelector<Element & HTMLOrSVGElement>(
      '[tabindex="0"]'
    );

    // Focus cell content when available instead of the cell itself
    if (elementToFocus !== null) {
      elementToFocus.focus({ preventScroll: true });
      setIsChildFocused(true);
    } else {
      setIsChildFocused(false);
    }
  }

  const isFocusable = isSelected && !isChildFocused;

  return {
    tabIndex: isFocusable ? 0 : -1,
    childTabIndex: isSelected ? 0 : -1,
    onFocus: isSelected ? onFocus : undefined
  };
}
