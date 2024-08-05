import { css } from '@linaria/core';

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
    accent-color: var(--rdg-accent-color);

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

export function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <div className={checkboxContainer}>
      <input type="checkbox" {...props} className={checkboxClassname} onChange={handleChange} />
    </div>
  );
}
