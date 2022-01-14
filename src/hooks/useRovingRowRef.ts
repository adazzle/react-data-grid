import { css } from '@linaria/core';

import { cell, cellFrozenLast } from '../style';
import { useFocusRef } from './useFocusRef';

const topBoxShadow = 'inset 0 2px 0 0 var(--rdg-selection-color)';
const rightBoxShadow = 'inset -2px 0 0 0 var(--rdg-selection-color)';
const bottomBoxShadow = 'inset 0 -2px 0 0 var(--rdg-selection-color)';
const leftBoxShadow = 'inset 2px 0 0 0 var(--rdg-selection-color)';

const rowSelected = css`
  outline: none;

  > .${cell} {
    box-shadow: ${topBoxShadow}, ${bottomBoxShadow};
    &:first-child {
      box-shadow: ${topBoxShadow}, ${bottomBoxShadow}, ${leftBoxShadow};
    }
    &:last-child {
      box-shadow: ${topBoxShadow}, ${bottomBoxShadow}, ${rightBoxShadow};
    }
  }

  > .${cellFrozenLast} {
    box-shadow: ${topBoxShadow}, ${bottomBoxShadow}, var(--rdg-frozen-cell-box-shadow);
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
