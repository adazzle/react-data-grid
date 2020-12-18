import clsx from 'clsx';

import { useFocusRef } from '../hooks/useFocusRef';
import { checkboxClassname, checkboxInputClassname, checkboxLabelClassname, checkboxLabelDisabledClassname } from '../style';

type SharedInputProps = Pick<React.InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'tabIndex'
  | 'onClick'
  | 'aria-label'
  | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected?: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  tabIndex,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const inputRef = useFocusRef<HTMLInputElement>(isCellSelected);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className={clsx(checkboxLabelClassname, { [checkboxLabelDisabledClassname]: disabled })}>
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={tabIndex}
        ref={inputRef}
        type="checkbox"
        className={checkboxInputClassname}
        disabled={disabled}
        checked={value}
        onChange={handleChange}
        onClick={onClick}
      />
      <div className={checkboxClassname} />
    </label>
  );
}
