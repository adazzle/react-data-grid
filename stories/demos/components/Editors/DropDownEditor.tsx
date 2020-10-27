import React, { useRef } from 'react';

interface DropDownEditorProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

export default function DropDownEditor({
  value,
  onChange,
  options
}: DropDownEditorProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      ref={selectRef}
      className="rdg-text-editor"
      defaultValue={value}
      // onBlur={onCommit}
      size={options.length}
      style={{ maxHeight: 200, height: 'auto', overflowY: 'auto' }}
    >
      {options.map(name => (
        <option
          key={name}
          value={name}
          onClick={() => onChange(name)}
        />
      ))}
    </select>
  );
}
