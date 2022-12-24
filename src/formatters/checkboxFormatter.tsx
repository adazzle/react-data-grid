import clsx from 'clsx';
import { css } from '@linaria/core';

import type { CheckboxFormatterProps } from '../types';

const checkboxLabel = css`
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
`;

const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;

const checkboxInput = css`
  @layer rdg.CheckboxInput {
    all: unset;
  }
`;

const checkboxInputClassname = `rdg-checkbox-input ${checkboxInput}`;

const checkbox = css`
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .${checkboxInput}:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .${checkboxInput}:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
`;

const checkboxClassname = `rdg-checkbox ${checkbox}`;

const checkboxLabelDisabled = css`
  @layer rdg.CheckboxLabel {
    cursor: default;

    .${checkbox} {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
`;

const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;

export function checkboxFormatter(
  { onChange, ...props }: CheckboxFormatterProps,
  ref: React.RefObject<HTMLInputElement>
) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label
      className={clsx(checkboxLabelClassname, {
        [checkboxLabelDisabledClassname]: props.disabled
      })}
    >
      <input
        type="checkbox"
        ref={ref}
        {...props}
        className={checkboxInputClassname}
        onChange={handleChange}
      />
      <div className={checkboxClassname} />
    </label>
  );
}
