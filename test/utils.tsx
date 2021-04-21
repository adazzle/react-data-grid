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
  return document.querySelector<HTMLDivElement>('.rdg-cell-selected');
}
