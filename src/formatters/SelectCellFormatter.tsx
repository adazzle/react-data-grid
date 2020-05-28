import React from 'react';
import clsx from 'clsx';

export interface SelectCellFormatterProps {
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({ value, disabled = false, onChange }: SelectCellFormatterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className={clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled })}>
      <input
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
