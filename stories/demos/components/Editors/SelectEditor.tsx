import Select from 'react-select';
import type { OptionTypeBase, OptionsType } from 'react-select';

interface SelectEditorProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionsType<OptionTypeBase>;
  rowHeight: number;
  menuPortalTarget: Element;
}

export function SelectEditor({ value, onChange, options, rowHeight, menuPortalTarget }: SelectEditorProps) {
  return (
    <Select
      autoFocus
      defaultMenuIsOpen
      value={options.find(o => o.value === value)}
      onChange={o => onChange(o.value)}
      options={options}
      menuPortalTarget={menuPortalTarget as HTMLElement}
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
    />
  );
}
