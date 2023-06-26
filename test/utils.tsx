import { StrictMode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { act, fireEvent, render as rtlRender, screen } from '@testing-library/react';

import DataGrid from '../src/';
import type { DataGridProps } from '../src/';

export function render(child: React.ReactElement) {
  return rtlRender(<StrictMode>{child}</StrictMode>);
}

export function setup<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return render(<DataGrid {...props} />);
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
