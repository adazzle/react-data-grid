import React from 'react';

import { EditorProps } from '../types';

type TextEditorProps = Pick<EditorProps<string>, 'value' | 'onChange' | 'onCommit' | 'editorRef'>;

export default function TextEditor({
  value,
  onChange,
  onCommit,
  editorRef
}: TextEditorProps) {
  return (
    <input
      ref={editorRef}
      className="rdg-text-editor"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={() => onCommit()}
    />
  );
}
