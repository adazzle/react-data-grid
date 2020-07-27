import React, { useRef, useLayoutEffect } from 'react';
import { Editor2Props } from '../../../../src/types';

export function TextEditor<R>({ value, onChange, rowHeight }: Editor2Props<string, R>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current!.focus();
    inputRef.current!.select();
  }, []);

  return (
    <input
      ref={inputRef}
      style={{ height: rowHeight - 1, width: '100%', paddingLeft: 6, fontSize: 14 }}
      value={value}
      onChange={event => onChange(event.target.value)}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.stopPropagation();
        }
      }}
    />
  );
}
