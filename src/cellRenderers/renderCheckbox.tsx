import { css } from '@linaria/core';
import clsx from 'clsx';

import type { RenderCheckboxProps } from '../types';

const checkboxContainer = css`
  @layer rdg.checkboxContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
  }
`;

const checkbox = css`
  @layer rdg.CheckboxInput {
    inline-size: 20px;
    block-size: 20px;
    cursor: pointer;
    accent-color: var(--rdg-checkbox-color);

    &:focus-visible {
      outline: 2px solid var(--rdg-checkbox-focus-color);
      outline-offset: 1px;
    }
  }
`;

const checkboxClassname = `rdg-checkbox-input ${checkbox}`;
const checkboxLabelDisabled = css`
  @layer rdg.CheckboxLabel {
    cursor: default;
    accent-color: var(--rdg-checkbox-disabled-color);
  }
`;

const checkboxDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;

export function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <div className={checkboxContainer}>
      <input
        type="checkbox"
        {...props}
        className={clsx(checkboxClassname, {
          [checkboxDisabledClassname]: props.disabled
        })}
        onChange={handleChange}
      />
    </div>
  );
}
