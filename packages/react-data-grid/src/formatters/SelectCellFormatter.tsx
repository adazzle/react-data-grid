import React from 'react';

interface SelectCellFormatterProps {
  value: boolean;
  onChange(value: boolean): void;
}

export default function SelectCellFormatter({ value, onChange }: SelectCellFormatterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  }

  return (
    <label className="react-grid-checkbox-container checkbox-align">
      <input
        type="checkbox"
        className="react-grid-checkbox"
        onChange={handleChange}
        checked={value === true}
      />
      <span className="react-grid-checkbox-label" />
    </label>
  );
}
