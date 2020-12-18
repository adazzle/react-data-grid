import { css } from '@linaria/core';
import { rowSelected } from './row';
import { cell, cellFrozenLast } from './cell';

const groupRow = css`
  &:not(.${rowSelected}) {
    background-color: var(--header-background-color);
  }

  > .${cell}:not(:last-child):not(.${cellFrozenLast}) {
    border-right: none;
  }
`;

export const groupRowClassname = `rdg-group-row ${groupRow}`;


const groupRowSelected = css`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0 0 0 2px var(--selection-color);
    pointer-events: none;
    z-index: 2;
  }

  > .${cell}:first-child {
    // preserve left border on the first frozen cell after scrolling to the right
    box-shadow: inset 2px 0 0 0 var(--selection-color);
  }
`;

// TODO: rename class
export const groupRowSelectedClassname = `rdg-group-row-selected ${groupRowSelected}`;

const groupCellContent = css`
  outline: none;
`;
export const groupCellContentClassname = `rdg-group-cell-content ${groupCellContent}`;

const caret = css`
  margin-left: 4px;
  stroke: currentColor;
  stroke-width: 1.5px;
  fill: transparent;
  vertical-align: middle;

  > path {
    transition: d .1s;
  }
`;

export const caretClassname = `rdg-caret ${caret}`;
