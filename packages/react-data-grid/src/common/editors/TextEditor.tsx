import React, { useRef, useEffect } from 'react';

import { EditorProps } from '../types';

type TextEditorProps = Pick<EditorProps<string>, 'value' | 'onChange' | 'onCommit'>;

export default function TextEditor({
  value,
  onChange,
  onCommit
}: TextEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.stopPropagation();
    }
  }

  return (
    <input
      ref={inputRef}
      className="rdg-text-editor"
      value={value}
      onKeyDown={onKeyDown}
      onChange={e => onChange(e.target.value)}
      onBlur={() => onCommit()}
    />
  );
}
