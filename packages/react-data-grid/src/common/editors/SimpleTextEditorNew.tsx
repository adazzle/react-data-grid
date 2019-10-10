import React, { useEffect } from 'react';
import { EditorProps } from '../types';

type Props = Pick<EditorProps<string>, 'value' | 'onBlur' | 'onChange' | 'inputRef'>;

export default function SimpleTextEditorNew({
  inputRef,
  value,
  onChange,
  onBlur
}: Props) {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [inputRef]);

  return (
    <input
      ref={inputRef}
      className="form-control editor-main"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
