import React, { useRef, useEffect } from 'react';
import { EditorProps2 } from '../common/types';

export default function TextEditor<R>({
  column,
  row,
  onChange,
  onClose
}: EditorProps2<R>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'Escape':
      case 'Enter':
        onClose();
        break;
      default:
        break;
    }
  }

  return (
    <input
      ref={inputRef}
      className="rdg-text-editor"
      value={row[column.key] as unknown as string} // TODO: fix type?
      onChange={event => onChange({ [column.key]: event.target.value } as {})} // TODO: fix type?
      onKeyDown={onKeyDown}
    />
  );
}
