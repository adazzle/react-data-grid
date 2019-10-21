import React, { useEffect, useRef } from 'react';
import { EditorProps } from '../types';

type Props = Pick<EditorProps<string>, 'value' | 'onChange' | 'onCommit'>;

export default function SimpleTextEditor({
  value,
  onChange,
  onCommit
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [inputRef]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (
      (e.key === 'ArrowLeft' && e.currentTarget.selectionEnd !== 0)
      || (e.key === 'ArrowRight' && e.currentTarget.selectionStart !== e.currentTarget.value.length)
    ) {
      e.stopPropagation();
    }
  }

  return (
    <input
      ref={inputRef}
      className="form-control editor-main"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onBlur={() => onCommit()}
    />
  );
}
