import clsx from 'clsx';
import { css } from '@linaria/core';
import { useFocusRef } from '../hooks/useFocusRef';

const checkboxLabel = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin-right: 1px; // align checkbox in row group cell
`;

const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;

const checkboxInput = css`
  all: unset;
  width: 0;
  margin: 0;
`;

const checkboxInputClassname = `rdg-checkbox-input ${checkboxInput}`;

const checkbox = css`
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  background-color: var(--background-color);

  .${checkboxInput}:checked + & {
    background-color: var(--checkbox-color);
    box-shadow: inset 0px 0px 0px 4px var(--background-color);
  }

  .${checkboxInput}:focus + & {
    border-color: var(--checkbox-focus-color);
  }
`;

const checkboxClassname = `rdg-checkbox ${checkbox}`;

const checkboxLabelDisabled = css`
  cursor: default;

  .${checkbox} {
    border-color: var(--checkbox-disabled-border-color);
    background-color: var(--checkbox-disabled-background-color);
  }
`;

const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;

type SharedInputProps = Pick<React.InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'tabIndex'
  | 'onClick'
  | 'aria-label'
  | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected?: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  tabIndex,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const inputRef = useFocusRef<HTMLInputElement>(isCellSelected);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label className={clsx(checkboxLabelClassname, { [checkboxLabelDisabledClassname]: disabled })}>
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={tabIndex}
        ref={inputRef}
        type="checkbox"
        className={checkboxInputClassname}
        disabled={disabled}
        checked={value}
        onChange={handleChange}
        onClick={onClick}
      />
      <div className={checkboxClassname} />
    </label>
  );
}
