import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
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

export function getCells() {
  return screen.getAllByRole('gridcell');
}
