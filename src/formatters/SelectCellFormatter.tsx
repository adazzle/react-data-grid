import React from 'react';
import clsx from 'clsx';

type SharedInputProps = Pick<React.InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'aria-label'
  | 'aria-labelledby'
>;

export interface SelectCellFormatterProps extends SharedInputProps {
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className={clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled })}>
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        type="checkbox"
        className="rdg-checkbox-input"
        disabled={disabled}
        onChange={handleChange}
        checked={value}
      />
      <div className="rdg-checkbox" />
    </label>
  );
}
