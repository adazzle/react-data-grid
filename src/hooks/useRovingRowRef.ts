import { groupRowSelectedClassname } from '../style';
import { useFocusRef } from './useFocusRef';

export function useRovingRowRef(selectedCellIdx: number | undefined) {
  const isFocused = selectedCellIdx === -1;
  const { ref, tabIndex } = useFocusRef<HTMLDivElement>(isFocused);

  return {
    ref,
    tabIndex,
    className: isFocused ? groupRowSelectedClassname : undefined
  };
}
