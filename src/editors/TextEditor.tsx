import React, { useRef, useEffect } from 'react';
import { EditorProps2 } from '../common/types';

export default function TextEditor<R>({
  column,
  row,
  onChange
}: EditorProps2<R>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      className="rdg-text-editor"
      value={row[column.key] as unknown as string} // TODO: fix type?
      onChange={event => onChange({ [column.key]: event.target.value } as {})} // TODO: fix type?
    />
  );
}
