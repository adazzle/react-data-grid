import { page } from '@vitest/browser/context';
import { css } from '@linaria/core';

import { DataGrid } from '../../src';
import type { DataGridProps } from '../../src';

export function setup<R, SR, K extends React.Key = React.Key>(props: DataGridProps<R, SR, K>) {
  page.render(
    <DataGrid
      {...props}
      className={css`
        block-size: 1080px;
        scrollbar-width: none;
      `}
    />
  );
}

export function getGrid() {
  return page.getByRole('grid');
}

export function getTreeGrid() {
  return page.getByRole('treegrid');
}

export function getRows() {
  return page.getByRole('row').elements().slice(1);
}

export function getCellsAtRowIndex(rowIdx: number) {
  return Array.from(
    document.querySelectorAll<HTMLDivElement>(`[aria-rowindex="${rowIdx + 2}"] > .rdg-cell`)
  );
}

export function getCells() {
  return page.getByRole('gridcell').elements();
}

export function getHeaderCells() {
  return page.getByRole('columnheader').elements();
}

export function getSelectedCell() {
  return page
    .getByRole('gridcell', { selected: true })
    .or(page.getByRole('columnheader', { selected: true }))
    .first();
}

export function validateCellPosition(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCell().element();
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 1}`);
}

export async function scrollGrid({
  scrollLeft,
  scrollTop
}: {
  scrollLeft?: number;
  scrollTop?: number;
}) {
  const grid = getGrid().element();

  if (scrollLeft !== undefined) {
    grid.scrollLeft = scrollLeft;
  }
  if (scrollTop !== undefined) {
    grid.scrollTop = scrollTop;
  }

  if (scrollLeft !== undefined || scrollTop !== undefined) {
    // let the browser fire the 'scroll' event
    await new Promise(requestAnimationFrame);
  }
}
