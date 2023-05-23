import type { CheckboxFormatterProps } from '../types';
import { useDefaultRenderers } from '../DataGridDefaultRenderersProvider';

type SharedInputProps = Pick<
  CheckboxFormatterProps,
  'disabled' | 'tabIndex' | 'aria-label' | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  tabIndex,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const checkboxFormatter = useDefaultRenderers()!.checkboxFormatter!;

  return (
    <>
      {checkboxFormatter({
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        tabIndex,
        disabled,
        checked: value,
        onChange
      })}
    </>
  );
}
