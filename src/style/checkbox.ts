import { css } from '@linaria/core';

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

export const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;

const checkboxInput = css`
  all: unset;
  width: 0;
  margin: 0;
`;

export const checkboxInputClassname = `rdg-checkbox-input ${checkboxInput}`;

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

export const checkboxClassname = `rdg-checkbox ${checkbox}`;

const checkboxLabelDisabled = css`
  cursor: default;

  .${checkbox} {
    border-color: var(--checkbox-disabled-border-color);
    background-color: var(--checkbox-disabled-background-color);
  }
`;

export const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;
