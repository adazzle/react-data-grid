import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
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
  onBlur(): void;
}

type DropDownEditorHandle = Pick<Editor<{[key: string]: string | undefined}>, 'getInputNode' | 'getValue'>;

function DropDownEditorWithRef<TRow>({ column, value, onBlur, options }: DropDownEditorProps<TRow>, ref: React.Ref<DropDownEditorHandle>): JSX.Element {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [optionsHeight, setOptionsHeight] = useState<number | undefined>();

  function onFocus() {
    if (selectRef.current === null) {
      return;
    }

    selectRef.current.size = options.length;

    const option = selectRef.current.querySelector('option');
    if (option) {
      const optionsHeight = option.clientHeight * options.length + 8;
      setOptionsHeight(Math.min(200, optionsHeight));
    }
  }

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
      onBlur={onBlur}
      onFocus={onFocus}
      style={{ height: optionsHeight && optionsHeight > 0 ? optionsHeight : 'initial', overflowY: 'auto' }}
    >
      {options.map(name => typeof name === 'string' ? (
        <option
          key={name}
          value={name}
        >
          {name}
        </option>
      ) : (
        <option
          key={name.id}
          value={name.value}
          title={name.title}
        >
          {name.text || name.value}
        </option>
      ))}
    </select>
  );
}

const DropDownEditor = forwardRef(
  DropDownEditorWithRef as React.RefForwardingComponent<DropDownEditorHandle, DropDownEditorProps<{ [key: string]: unknown }>>
) as <R>(props: DropDownEditorProps<R> & { ref?: React.Ref<DropDownEditorHandle> }) => JSX.Element;

(DropDownEditor as React.ComponentType).propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string
    })
  ])).isRequired,
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired
};

export default DropDownEditor;
