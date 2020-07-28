import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface SelectCellFormatterProps {
  value: boolean;
  tabIndex?: number;
  isCellSelected?: boolean;
  disabled?: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({ value, tabIndex, isCellSelected, disabled, onChange }: SelectCellFormatterProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isCellSelected) {
      inputRef.current?.focus();
    }
  }, [isCellSelected]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className={clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled })}>
      <input
        tabIndex={tabIndex}
        ref={inputRef}
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
