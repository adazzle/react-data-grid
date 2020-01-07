import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Column, Editor } from '../../../../src';

interface Option {
  id: string;
  title: string;
  value: string;
  text: string;
}

interface DropDownEditorProps<TRow> {
  column: Column<TRow>;
  options: Array<Option | string>;
  value?: string;
  onCommit(): void;
}

type DropDownEditorHandle = Pick<Editor<{[key: string]: string | undefined}>, 'getInputNode' | 'getValue'>;

function DropDownEditorWithRef<TRow>({ column, value, onCommit, options }: DropDownEditorProps<TRow>, ref: React.Ref<DropDownEditorHandle>): JSX.Element {
  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    getInputNode() {
      return selectRef.current;
    },
    getValue() {
      return {
        [column.key]: selectRef.current?.value
      };
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
  DropDownEditorWithRef as React.RefForwardingComponent<DropDownEditorHandle, DropDownEditorProps<{ [key: string]: unknown }>>
) as <R>(props: DropDownEditorProps<R> & { ref?: React.Ref<DropDownEditorHandle> }) => JSX.Element;
