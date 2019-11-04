import React from 'react';

import { EditorProps } from '../types';

type TextEditorProps = Pick<EditorProps<string>, 'value' | 'onChange' | 'onCommit' | 'inputRef'>;

export default function TextEditor({
  value,
  onChange,
  onCommit,
  inputRef
}: TextEditorProps) {
  return (
    <input
      ref={inputRef}
      className="rdg-text-editor"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={() => onCommit()}
    />
  );
}
