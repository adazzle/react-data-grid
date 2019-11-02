import React, { forwardRef } from 'react';

import { EditorProps } from '../types';

type SimpleTextEditorProps = Pick<EditorProps<string>, 'value' | 'onChange' | 'onCommit'>;

export default forwardRef<HTMLInputElement, SimpleTextEditorProps>(function TextEditor({
  value,
  onChange,
  onCommit
}, ref) {
  return (
    <input
      ref={ref}
      className="rdg-text-editor"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={() => onCommit()}
    />
  );
});
