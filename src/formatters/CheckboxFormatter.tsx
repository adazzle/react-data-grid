import { forwardRef } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import type { CheckboxFormatterProps } from '../types';

const checkboxLabel = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  margin-right: 1px; /* align checkbox in row group cell */
`;

const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;

const checkboxInput = css`
  all: unset;
`;

const checkboxInputClassname = `rdg-checkbox-input ${checkboxInput}`;

const checkbox = css`
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid var(--rdg-border-color);
  background-color: var(--rdg-background-color);
  .${checkboxInput}:checked + & {
    background-color: var(--rdg-checkbox-color);
    box-shadow: inset 0px 0px 0px 4px var(--rdg-background-color);
  }
  .${checkboxInput}:focus + & {
    border-color: var(--rdg-checkbox-focus-color);
  }
`;

const checkboxClassname = `rdg-checkbox ${checkbox}`;

const checkboxLabelDisabled = css`
  cursor: default;
  .${checkbox} {
    border-color: var(--rdg-checkbox-disabled-border-color);
    background-color: var(--rdg-checkbox-disabled-background-color);
  }
`;

const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;

export const CheckboxFormatter = forwardRef<HTMLInputElement, CheckboxFormatterProps>(
  function CheckboxFormatter({ onChange, ...props }: CheckboxFormatterProps, ref) {
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
);
