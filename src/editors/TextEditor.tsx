import React from 'react';
import { EditorProps } from '../types';

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

export default function TextEditor<TRow>({
  row,
  column,
  onRowChange,
  onClose
}: EditorProps<TRow>) {
  return (
    <input
      className="rdg-text-editor"
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={event => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
      onKeyDown={event => {
        if (/^(Arrow(Left|Right)|Home|End)$/.test(event.key)) {
          event.stopPropagation();
        }
      }}
    />
  );
}
