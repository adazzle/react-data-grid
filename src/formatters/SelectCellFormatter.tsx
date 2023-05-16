import { useFocusRef } from '../hooks/useFocusRef';
import type { CheckboxFormatterProps } from '../types';
import { useDefaultRenderers } from '../DataGridDefaultRenderersProvider';

type SharedInputProps = Pick<CheckboxFormatterProps, 'disabled' | 'aria-label' | 'aria-labelledby'>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellFocused: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  isCellFocused,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellFocused);
  const checkboxFormatter = useDefaultRenderers()!.checkboxFormatter!;

  return (
    <>
      {checkboxFormatter(
        {
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          tabIndex,
          disabled,
          checked: value,
          onChange
        },
        ref
      )}
    </>
  );
}
