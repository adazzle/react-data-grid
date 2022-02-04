import { useFocusRef } from '../hooks/useFocusRef';
import { useDefaultComponents } from '../DataGridDefaultComponentsProvider';
import type { CheckboxFormatterProps } from '../types';

type SharedInputProps = Pick<
  CheckboxFormatterProps,
  'disabled' | 'onClick' | 'aria-label' | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellSelected);
  const Formatter = useDefaultComponents()!.checkboxFormatter!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <Formatter
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      tabIndex={tabIndex}
      disabled={disabled}
      checked={value}
      onChange={handleChange}
      onClick={onClick}
    />
  );
}
