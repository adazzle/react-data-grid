import React, { useState } from 'react';
import Select, { OptionTypeBase, OptionsType } from 'react-select';

interface SelectEditorProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionsType<OptionTypeBase>;
  rowHeight: number;
  menuPortalTarget: Element;
}

export function SelectEditor<R>({ value, onChange, options, rowHeight, menuPortalTarget }: SelectEditorProps) {
  const [isMenuOpen, setMenuOpen] = useState(true);
  return (
    <Select
      autoFocus
      defaultMenuIsOpen
      value={options.find(o => o.value === value)}
      onChange={o => onChange(o.value)}
      options={options}
      menuPortalTarget={menuPortalTarget as HTMLElement}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
      styles={{
        control: (provided) => ({
          ...provided,
          height: rowHeight - 1,
          minHeight: 30,
          lineHeight: 'normal'
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          height: rowHeight - 1
        })
      }}
      onKeyDown={event => {
        if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key) && isMenuOpen) {
          event.stopPropagation();
        }

        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.stopPropagation();
        }
      }}
    />
  );
}
