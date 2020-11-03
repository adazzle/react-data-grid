import React, { StrictMode } from 'react';
import { render } from '@testing-library/react';
import DataGrid, { DataGridProps } from '../src/';

export function setup<R, SR>(props: DataGridProps<R, SR>) {
  return render(
    <StrictMode>
      <DataGrid {...props} />
    </StrictMode>
  );
}
