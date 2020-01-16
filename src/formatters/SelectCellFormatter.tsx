import React from 'react';

export interface SelectCellFormatterProps {
  value: boolean;
  onChange(value: boolean, isShiftClick: boolean): void;
}

export function SelectCellFormatter({ value, onChange }: SelectCellFormatterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className="rdg-checkbox-label">
      <input
        type="checkbox"
        className="rdg-checkbox-input"
        onChange={handleChange}
        checked={value}
      />
      <div className="rdg-checkbox" />
    </label>
  );
}
