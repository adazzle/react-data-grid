import { css } from '@linaria/core';

import { cell } from '../style';
import { useFocusRef } from './useFocusRef';

const rowSelected = css`
  outline: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 2px var(--rdg-selection-color);
    pointer-events: none;
    z-index: 2;
  }

  > .${cell}:first-child {
    /* preserve left border on the first frozen cell after scrolling to the right */
    box-shadow: inset 2px 0 0 0 var(--rdg-selection-color);
  }
`;

export const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;

export function useRovingRowRef(selectedCellIdx: number | undefined) {
  const isSelected = selectedCellIdx === -1;
  const { ref, tabIndex } = useFocusRef<HTMLDivElement>(isSelected);

  return {
    ref,
    tabIndex,
    className: isSelected ? rowSelectedClassname : undefined
  };
}
