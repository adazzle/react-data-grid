import { StrictMode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataGrid from '../src/';
import type { DataGridProps } from '../src/';

export function setup<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return render(
    <StrictMode>
      <DataGrid {...props} />
    </StrictMode>
  );
}

export function getGrid() {
  return screen.getByRole('grid');
}

export function queryGrid() {
  return screen.queryByRole('grid');
}

export function getTreeGrid() {
  return screen.getByRole('treegrid');
}

export function queryTreeGrid() {
  return screen.queryByRole('treegrid');
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
  fireEvent.keyDown(document.activeElement!, {
    keyCode: '67',
    ctrlKey: true
  });
}

export function pasteSelectedCell() {
  fireEvent.keyDown(document.activeElement!, {
    keyCode: '86',
    ctrlKey: true
  });
}
