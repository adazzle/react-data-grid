import Select from 'react-select';
import type { OptionTypeBase, OptionsType } from 'react-select';

interface SelectEditorProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionsType<OptionTypeBase>;
  menuPortalTarget: Element;
}

export function SelectEditor({ value, onChange, options, menuPortalTarget }: SelectEditorProps) {
  return (
    <Select
      autoFocus
      defaultMenuIsOpen
      value={options.find((o) => o.value === value)}
      onChange={(o) => onChange(o.value)}
      options={options}
      menuPortalTarget={menuPortalTarget as HTMLElement}
      styles={{
        control: (provided) => ({
          ...provided,
          height: 'calc(var(--row-height) - 1px)',
          minHeight: 30,
          lineHeight: 'normal'
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          height: 'var(--row-height)'
        })
      }}
    />
  );
}
