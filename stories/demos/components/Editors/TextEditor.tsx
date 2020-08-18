import React, { useRef, useLayoutEffect } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  rowHeight: number;
}

export function TextEditor<R>({ value, onChange, rowHeight }: TextEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current!.focus({ preventScroll: true });
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
