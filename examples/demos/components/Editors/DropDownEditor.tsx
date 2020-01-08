import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor, EditorProps } from '../../../../src';

interface Option {
  id: string;
  title: string;
  value: string;
  text: string;
}

interface DropDownEditorProps<TRow> extends EditorProps<string, TRow> {
  options: Array<Option | string>;
}

type DropDownEditorHandle = Editor<string>;

function DropDownEditor<TRow>({ value, onCommit, options }: DropDownEditorProps<TRow>, ref: React.Ref<DropDownEditorHandle>) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    getInputNode() {
      return selectRef.current;
    },
    getValue() {
      return selectRef.current!.value;
    }
  }));

  return (
    <select
      ref={selectRef}
      className="rdg-select-editor"
      defaultValue={value}
      onBlur={onCommit}
      size={options.length}
      style={{ maxHeight: 200, height: 'auto', overflowY: 'auto' }}
    >
      {options.map(name => typeof name === 'string' ? (
        <option
          key={name}
          value={name}
          onClick={onCommit}
        >
          {name}
        </option>
      ) : (
        <option
          key={name.id}
          value={name.value}
          title={name.title}
          onClick={onCommit}
        >
          {name.text || name.value}
        </option>
      ))}
    </select>
  );
}

export default forwardRef(
  DropDownEditor as React.RefForwardingComponent<DropDownEditorHandle, DropDownEditorProps<{ [key: string]: unknown }>>
) as <R>(props: DropDownEditorProps<R> & { ref?: React.Ref<DropDownEditorHandle> }) => JSX.Element;
