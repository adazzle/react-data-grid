import { css } from '@linaria/core';

import type { RenderCheckboxProps } from '../types';

const checkbox = css`
  @layer rdg.CheckboxInput {
    display: block;
    margin: auto;
    inline-size: 20px;
    block-size: 20px;

    &:focus-visible {
      outline: 2px solid var(--rdg-checkbox-focus-color);
      outline-offset: -3px;
    }

    &:enabled {
      cursor: pointer;
    }
  }
`;

const checkboxClassname = `rdg-checkbox-input ${checkbox}`;

export function renderCheckbox({
  onChange,
  indeterminate,
  checked,
  ...props
}: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // https://github.com/facebook/react/issues/31358
    // onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
    onChange(!checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <input
      ref={(el) => {
        if (el) {
          el.indeterminate = indeterminate === true;
        }
      }}
      type="checkbox"
      className={checkboxClassname}
      checked={checked}
      onChange={handleChange}
      {...props}
    />
  );
}
