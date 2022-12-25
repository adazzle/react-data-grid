import { useEffect } from 'react';
import { useFocusRef } from '../hooks/useFocusRef';
import { useDefaultComponents } from '../DataGridDefaultComponentsProvider';
import type { CheckboxFormatterProps } from '../types';

type SharedInputProps = Pick<CheckboxFormatterProps, 'disabled' | 'aria-label' | 'aria-labelledby'>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected: boolean;
  isIndeterminate?: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  isCellSelected,
  isIndeterminate = false,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellSelected);
  const checkboxFormatter = useDefaultComponents()!.checkboxFormatter!;

  useEffect(() => {
    if (typeof ref.current?.indeterminate === 'boolean') {
      ref.current.indeterminate = isIndeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndeterminate]);

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
