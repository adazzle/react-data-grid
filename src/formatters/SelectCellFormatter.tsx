import { useFocusRef } from '../hooks/useFocusRef';
import { useDefaultComponents } from '../DataGridDefaultComponentsProvider';
import type { CheckboxFormatterProps } from '../types';

type SharedInputProps = Pick<CheckboxFormatterProps, 'disabled' | 'aria-label' | 'aria-labelledby'>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  isCellSelected,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellSelected);
  const Formatter = useDefaultComponents()!.checkboxFormatter!;

  return (
    <Formatter
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      tabIndex={tabIndex}
      disabled={disabled}
      checked={value}
      onChange={onChange}
    />
  );
}
