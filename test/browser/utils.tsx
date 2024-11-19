import { act, render, screen } from '@testing-library/react';
import { page, userEvent } from '@vitest/browser/context';
import { css } from '@linaria/core';

import DataGrid from '../../src';
import type { DataGridProps } from '../../src';

export function setup<R, SR, K extends React.Key = React.Key>(props: DataGridProps<R, SR, K>) {
  render(
    <DataGrid
      {...props}
      className={css`
        block-size: 1080px;
        scrollbar-width: none;
      `}
    />
  );
}

export function setupNew<R, SR, K extends React.Key = React.Key>(props: DataGridProps<R, SR, K>) {
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

export function getGridOld() {
  return screen.getByRole('grid');
}

export function getGrid() {
  return page.getByRole('grid');
}

export function getTreeGridOld() {
  return screen.getByRole('treegrid');
}

export function getRowsOld() {
  return screen.getAllByRole('row').slice(1);
}

export function getRows() {
  return page.getByRole('row').all().slice(1);
}

export function queryRowsOld() {
  return screen.queryAllByRole('row').slice(1);
}

export function getCellsAtRowIndexOld(rowIdx: number) {
  return Array.from(
    document.querySelectorAll<HTMLDivElement>(`[aria-rowindex="${rowIdx + 2}"] > .rdg-cell`)
  );
}

export function getCellsAtRowIndex(rowIdx: number) {
  return page.getByRole('row').all()[rowIdx + 1].getByRole('gridcell').all();
}

export function getCellsOld() {
  return screen.getAllByRole('gridcell');
}

export function getCells() {
  return page.getByRole('gridcell').all();
}

export function queryCellsOld() {
  return screen.queryAllByRole('gridcell');
}

export function getHeaderCellsOld() {
  return screen.getAllByRole('columnheader');
}

export function getHeaderCells() {
  return page.getByRole('columnheader').all();
}

export function queryHeaderCellsOld() {
  return screen.queryAllByRole('columnheader');
}

export function getSelectedCellOld() {
  return (
    screen.queryByRole('gridcell', { selected: true }) ??
    screen.queryByRole('columnheader', { selected: true })
  );
}

export function validateCellPositionOld(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCellOld();
  if (cell === null) {
    throw new Error('Selected cell not found');
  }
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 1}`);
}

export function getSelectedCell() {
  const selectedGridCell = page.getByRole('gridcell', { selected: true });
  if (selectedGridCell.all().length > 0) {
    return selectedGridCell;
  }

  return page.getByRole('columnheader', { selected: true });
}

export function validateCellPosition(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCell().element();
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 1}`);
}

export async function copySelectedCellOld() {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.keyboard('{Control>}c');
  });
}

export function copySelectedCell() {
  return userEvent.keyboard('{Control>}c{/Control}');
}

export async function pasteSelectedCellOld() {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.keyboard('{Control>}v');
  });
}

export function pasteSelectedCell() {
  return userEvent.keyboard('{Control>}v{/Control}');
}

export async function scrollGrid({
  scrollLeft,
  scrollTop
}: {
  scrollLeft?: number;
  scrollTop?: number;
}) {
  const grid = getGridOld();

  await act(async () => {
    if (scrollLeft !== undefined) {
      grid.scrollLeft = scrollLeft;
    }
    if (scrollTop !== undefined) {
      grid.scrollTop = scrollTop;
    }

    // let the browser fire the 'scroll' event
    await new Promise(requestAnimationFrame);
  });
}
