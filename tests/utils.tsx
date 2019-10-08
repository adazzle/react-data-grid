import React, { StrictMode } from 'react';
import { render } from '@testing-library/react';
import ReactDataGrid, { ReactDataGridProps } from '../packages/react-data-grid/src';

interface RowType {
  col1: string;
  col2: string;
}

export function getProps(extraProps?: Partial<ReactDataGridProps<RowType>>): ReactDataGridProps<RowType> {
  const rows: RowType[] = [];

  return {
    columns: [{
      key: 'col1',
      name: 'Column 1'
    }, {
      key: 'col2',
      name: 'Column 2'
    }],
    rowGetter(idx: number) {
      return rows[idx];
    },
    rowsCount: rows.length,
    ...extraProps
  };
}

export function setup(props: ReactDataGridProps<RowType> = getProps()) {
  return {
    props,
    ...render(
      <StrictMode>
        <ReactDataGrid {...props} />
      </StrictMode>
    )
  };
}
