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

export function getGrid() {
  return screen.getByRole('grid');
}

export function getGridNew() {
  return page.getByRole('grid');
}

export function getTreeGrid() {
  return screen.getByRole('treegrid');
}

export function getRows() {
  return screen.getAllByRole('row').slice(1);
}

export function getRowsNew() {
  return page.getByRole('row').all().slice(1);
}

export function queryRows() {
  return screen.queryAllByRole('row').slice(1);
}

export function getCellsAtRowIndex(rowIdx: number) {
  return Array.from(
    document.querySelectorAll<HTMLDivElement>(`[aria-rowindex="${rowIdx + 2}"] > .rdg-cell`)
  );
}

export function getCellsAtRowIndexNew(rowIdx: number) {
  return page.getByRole('row').all()[rowIdx + 1].getByRole('gridcell').all();
}

export function getCells() {
  return screen.getAllByRole('gridcell');
}

export function getCellsNew() {
  return page.getByRole('gridcell').all();
}

export function queryCells() {
  return screen.queryAllByRole('gridcell');
}

export function getHeaderCells() {
  return screen.getAllByRole('columnheader');
}

export function getHeaderCellsNew() {
  return page.getByRole('columnheader').all();
}

export function queryHeaderCells() {
  return screen.queryAllByRole('columnheader');
}

export function getSelectedCell() {
  return (
    screen.queryByRole('gridcell', { selected: true }) ??
    screen.queryByRole('columnheader', { selected: true })
  );
}

export function validateCellPosition(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCell();
  if (cell === null) {
    throw new Error('Selected cell not found');
  }
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 1}`);
}

export function getSelectedCellNew() {
  const selectedGridCell = page.getByRole('gridcell', { selected: true });
  if (selectedGridCell.all().length > 0) {
    return selectedGridCell;
  }

  return page.getByRole('columnheader', { selected: true });
}

export function validateCellPositionNew(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCellNew().element();
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 1}`);
}

export async function copySelectedCell() {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.keyboard('{Control>}c');
  });
}

export function copySelectedCellNew() {
  return userEvent.keyboard('{Control>}c');
}

export async function pasteSelectedCell() {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.keyboard('{Control>}v');
  });
}

export function pasteSelectedCellNew() {
  return userEvent.keyboard('{Control>}v');
}

export async function scrollGrid({
  scrollLeft,
  scrollTop
}: {
  scrollLeft?: number;
  scrollTop?: number;
}) {
  const grid = getGrid();

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
