import React, { forwardRef } from 'react';

export interface SelectAllProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const SelectAll = forwardRef<HTMLInputElement, SelectAllProps>(function SelectAll({ onChange }, ref) {
  return (
    <label className="react-grid-checkbox-container checkbox-align">
      <input
        type="checkbox"
        className="react-grid-checkbox"
        ref={ref}
        onChange={onChange}
      />
      <span className="react-grid-checkbox-label" />
    </label>
  );
});
