import { css } from '@linaria/core';

import { cell, cellFrozen } from './cell';

const headerRowAndFilterRow = css`
  display: contents;
  background-color: var(--header-background-color);
  font-weight: bold;

  > .${cell} {
    z-index: 3;
    position: sticky;
  }

  > .${cellFrozen} {
    z-index: 4;
  }
`;

const headerRow = css`
  line-height: var(--header-row-height);
  touch-action: none;

  > .${cell} {
    top: 0;
  }
`;

export const headerRowClassname = `rdg-header-row ${headerRowAndFilterRow} ${headerRow}`;

const filterRow = css`
  line-height: var(--filter-row-height);

  > .${cell} {
    top: var(--header-row-height);
  }
`;

export const filterRowClassname = `rdg-filter-row ${headerRowAndFilterRow} ${filterRow}`;
