import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

type SharedInputProps = Pick<React.InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'tabIndex'
  | 'aria-label'
  | 'aria-labelledby'
>;

export interface SelectCellFormatterProps extends SharedInputProps {
  isCellActive?: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  tabIndex,
  isCellActive,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isCellActive) {
      inputRef.current?.focus();
    }
  }, [isCellActive]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className={clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled })}>
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={tabIndex}
        ref={inputRef}
        type="checkbox"
        className="rdg-checkbox-input"
        disabled={disabled}
        onChange={handleChange}
        checked={value}
        onClick={e => e.stopPropagation()}
      />
      <div className="rdg-checkbox" />
    </label>
  );
}
