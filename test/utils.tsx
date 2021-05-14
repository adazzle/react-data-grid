import { StrictMode } from 'react';
import type { ByRoleOptions } from '@testing-library/react';
import { render, screen, within } from '@testing-library/react';
import DataGrid from '../src/';
import type { DataGridProps } from '../src/';

type Name = ByRoleOptions['name'];

export function setup<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
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

export function getColumnIndex(cell: HTMLElement) {
  return Number(cell.getAttribute('aria-colindex')) - 1;
}

export function getCellsAtColumn({ grid, name }: { grid: HTMLElement; name: Name }) {
  const headerCell = within(grid).getByRole('columnheader', { name }, { hidden: true });
  const index = getColumnIndex(headerCell);
  const rows = getRows();
  return rows.map((row) => {
    const cells = within(row).getAllByRole('gridcell', { hidden: true });
    return cells.find((c) => getColumnIndex(c) === index);
  });
}
