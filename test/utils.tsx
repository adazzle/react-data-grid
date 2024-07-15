import { act, fireEvent, render, screen } from '@testing-library/react';
import { css } from '@linaria/core';

import DataGrid from '../src/';
import type { DataGridProps } from '../src/';

export function setup<R, SR, K extends React.Key = React.Key>(props: DataGridProps<R, SR, K>) {
  render(
    <DataGrid
      {...props}
      className={css`
        width: 1920px;
        height: 1080px;
        scrollbar-width: none;
      `}
    />
  );
}

export function getGrid() {
  return screen.getByRole('grid');
}

export function getTreeGrid() {
  return screen.getByRole('treegrid');
}

export function getRows() {
  return screen.getAllByRole('row').slice(1);
}

export function queryRows() {
  return screen.queryAllByRole('row').slice(1);
}

export function getCellsAtRowIndex(rowIdx: number) {
  return Array.from(
    document.querySelectorAll<HTMLDivElement>(`[aria-rowindex="${rowIdx + 2}"] > .rdg-cell`)
  );
}

export function getCells() {
  return screen.getAllByRole('gridcell');
}

export function queryCells() {
  return screen.queryAllByRole('gridcell');
}

export function getHeaderCells() {
  return screen.getAllByRole('columnheader');
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

export function copySelectedCell() {
  // eslint-disable-next-line testing-library/prefer-user-event
  fireEvent.keyDown(document.activeElement!, {
    keyCode: '67',
    ctrlKey: true
  });
}

export function pasteSelectedCell() {
  // eslint-disable-next-line testing-library/prefer-user-event
  fireEvent.keyDown(document.activeElement!, {
    keyCode: '86',
    ctrlKey: true
  });
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
