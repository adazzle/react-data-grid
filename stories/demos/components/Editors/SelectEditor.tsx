import React, { useRef } from 'react';
import Select, { OptionTypeBase, OptionsType } from 'react-select';
import { Editor2Props } from '../../../../src/types';

export function SelectEditor<R>({ value, onChange, options, rowHeight }: Editor2Props<string, R> & { options: OptionsType<OptionTypeBase> }) {
  const selectRef = useRef<Select<OptionTypeBase>>(null);
  return (
    <Select
      autoFocus
      defaultMenuIsOpen
      ref={selectRef}
      value={options.find(o => o.value === value)}
      onChange={o => onChange(o.value)}
      options={options}
      menuPortalTarget={document.body}
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
        if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key) && selectRef.current!.getProp('menuIsOpen')) {
          event.stopPropagation();
        }

        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.stopPropagation();
        }
      }}
    />
  );
}
