import { css } from '@linaria/core';

const headerRowAndFilterRow = css`
  contain: strict;
  contain: size layout style paint;
  display: flex;
  width: var(--row-width);
  position: sticky;
  background-color: var(--header-background-color);
  font-weight: bold;
  z-index: 3;
`;

const headerRow = css`
  height: var(--header-row-height);
  line-height: var(--header-row-height);
  top: 0;
  touch-action: none;
`;

export const headerRowClassname = `rdg-header-row ${headerRowAndFilterRow} ${headerRow}`;

const filterRow = css`
  height: var(--filter-row-height);
  line-height: var(--filter-row-height);
  top: var(--header-row-height);
`;

export const filterRowClassname = `rdg-filter-row ${headerRowAndFilterRow} ${filterRow}`;

const cellResizable = css`
  &::after {
    content: "";
    cursor: col-resize;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 10px;
  }
`;

export const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;

const headerSortCell = css`
  cursor: pointer;
  display: flex;
`;

export const headerSortCellClassname = `rdg-header-sort-cell ${headerSortCell}`;

const headerSortName = css`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`;
