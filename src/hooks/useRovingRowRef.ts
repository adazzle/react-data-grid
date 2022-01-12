import { css } from '@linaria/core';

import { cell } from '../style';
import { useFocusRef } from './useFocusRef';

const rowSelected = css`
  outline: none;

  > .${cell} {
    box-shadow: inset 0 2px 0 0 var(--rdg-selection-color),
      inset 0 -2px 0 0 var(--rdg-selection-color);
    &:first-child {
      box-shadow: inset 0 2px 0 0 var(--rdg-selection-color),
        inset 0 -2px 0 0 var(--rdg-selection-color), inset 2px 0 0 0 var(--rdg-selection-color);
    }
    &:last-child {
      box-shadow: inset 0 2px 0 0 var(--rdg-selection-color),
        inset 0 -2px 0 0 var(--rdg-selection-color), inset -2px 0 0 0 var(--rdg-selection-color);
    }
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
