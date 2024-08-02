import { css } from '@linaria/core';
import clsx from 'clsx';

import type { RenderCheckboxProps } from '../types';

const checkbox = css`
  @layer rdg.CheckboxInput {
    position: absolute;
    inset-block-start: 4px;
    inset-inline-start: 3px;

    inline-size: 20px;
    block-size: 20px;
    cursor: pointer;
    accent-color: var(--rdg-checkbox-color);

    &:focus-visible {
      outline: 2px solid var(--rdg-checkbox-focus-color);
      outline-offset: -3px;
    }
  }
`;

const checkboxClassname = `rdg-checkbox-input ${checkbox}`;
const checkboxLabelDisabled = css`
  @layer rdg.CheckboxLabel {
    cursor: default;
    accent-color: var(--rdg-checkbox-disabled-background-color);
  }
`;

const checkboxDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;

export function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <input
      type="checkbox"
      {...props}
      className={clsx(checkboxClassname, {
        [checkboxDisabledClassname]: props.disabled
      })}
      onChange={handleChange}
    />
  );
}
