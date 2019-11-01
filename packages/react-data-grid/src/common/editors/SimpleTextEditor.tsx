import React, { forwardRef, useEffect, useImperativeHandle, useRef, Ref } from 'react';
import { Editor, EditorProps } from '../types';

type ValueType<R> = R[keyof R];

type Props<R> = Pick<EditorProps<ValueType<R> | string, unknown, R>, 'value' | 'onChange' | 'onCommit' | 'column'>;

export type EditorHandle = Pick<Editor, 'getInputNode'|'getValue'>;

export default forwardRef(function SimpleTextEditor<R>({
  value,
  onChange,
  onCommit,
  column
}: Props<R>, editorRef: Ref<EditorHandle>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [inputRef]);

  useImperativeHandle(editorRef, () => ({
    getInputNode() {
      return inputRef.current as Element | Text | null | undefined;
    },
    getValue() {
      return {
        [column.key]: inputRef.current!.value
      } as never;
    }
  }), [column.key]);

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
      className="rdg-text-editor"
      value={value as string}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onBlur={() => onCommit()}
    />
  );
});
