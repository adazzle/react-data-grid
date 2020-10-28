import React from 'react';
import { EditorProps } from '../types';

export default function SimpleTextEditor<TRow>({
  row,
  column,
  onRowChange,
  onClose
}: EditorProps<TRow>) {
  return (
    <input
      autoFocus
      className="rdg-text-editor"
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={event => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
    />
  );
}
