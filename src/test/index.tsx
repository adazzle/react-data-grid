import React, { StrictMode } from 'react';
import { render } from '@testing-library/react';
import DataGrid, { DataGridProps } from '../';

interface RowType {
  id: number;
  col1: string;
  col2: string;
}

export function getProps(extraProps?: Partial<DataGridProps<RowType, 'id'>>): DataGridProps<RowType, 'id'> {
  const rows: RowType[] = [];

  return {
    columns: [{
      key: 'col1',
      name: 'Column 1'
    }, {
      key: 'col2',
      name: 'Column 2'
    }],
    rows,
    ...extraProps
  };
}

export function setup(props: DataGridProps<RowType, 'id'> = getProps()) {
  return {
    props,
    ...render(
      <StrictMode>
        <DataGrid {...props} />
      </StrictMode>
    )
  };
}
