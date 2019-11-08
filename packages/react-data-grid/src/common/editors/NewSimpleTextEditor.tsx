import React, { useRef } from 'react';
import { EditorProps } from '../types';
import { useDataGridEditor } from './useDataGridEditor';

type Props = Pick<EditorProps<string>, 'value' | 'onChange' | 'onCommit'>;

export default function SimpleTextEditor({ value, onChange, onCommit }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [onKeyDown] = useDataGridEditor(inputRef);

  return (
    <input
      ref={inputRef}
      className="rdg-text-editor"
      value={value as string}
      onChange={e => onChange(e.target.value as never)}
      onKeyDown={onKeyDown}
      onBlur={() => onCommit()}
    />
  );
}
