import { StrictMode } from 'react';
import { render, screen, within } from '@testing-library/react';
import DataGrid from '../src/';
import type { DataGridProps } from '../src/';

export function setup<R, SR>(props: DataGridProps<R, SR>) {
  return render(
    <StrictMode>
      <DataGrid {...props} />
    </StrictMode>
  );
}

export function getRows() {
  return screen.getAllByRole('row').slice(1);
}

export function getCellsAtRowIndex(rowIdx: number) {
  return within(getRows()[rowIdx]).getAllByRole('gridcell');
}

export function getCells() {
  return screen.getAllByRole('gridcell');
}

export function getHeaderCells() {
  return screen.getAllByRole('columnheader');
}

export function getSelectedCell() {
  return screen.queryByRole('gridcell', { selected: true });
}

export function validateCellPosition(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCell();
  if (cell === null) {
    throw new Error('Selected cell not found');
  }
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 2}`);
}
