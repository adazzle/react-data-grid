import React from 'react';
import { Column } from '../types';

interface Props<T> {
  value?: boolean;
  rowIdx: number;
  column: Column<T>;
  dependentValues: T;
}

export default function CheckboxEditor<T>({ value, rowIdx, column, dependentValues }: Props<T>) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    column.onCellChange(rowIdx, column.key, dependentValues, event);
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
