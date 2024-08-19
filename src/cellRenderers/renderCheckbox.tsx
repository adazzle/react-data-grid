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

function Checkbox({ onChange, indeterminate, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(indeterminate || e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <div className={checkboxContainer}>
      <input
        ref={(el) => {
          if (el) {
            el.indeterminate = indeterminate === true;
          }
        }}
        type="checkbox"
        className={checkboxClassname}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export function renderCheckbox(props: RenderCheckboxProps) {
  return <Checkbox {...props} />;
}
