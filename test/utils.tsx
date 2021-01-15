import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import DataGrid from '../src/';
import type { DataGridProps } from '../src/';

export function setup<R, SR, FR>(props: DataGridProps<R, SR, FR>) {
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
