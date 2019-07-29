import React from 'react';
import { CalculatedColumn } from '../types';

export interface CheckboxEditorProps<R> {
  value?: boolean;
  rowIdx: number;
  column: CalculatedColumn<R>;
  dependentValues: unknown;
}

export default function CheckboxEditor<R>({ value, rowIdx, column, dependentValues }: CheckboxEditorProps<R>) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (column.onCellChange) {
      column.onCellChange(rowIdx, column.key, dependentValues, event);
    }
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
