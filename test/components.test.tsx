import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';

import DataGrid, { DataGridDefaultComponentsProvider, SelectColumn } from '../src';
import type { Column, DataGridProps } from '../src';
import { getRows, setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'col',
    name: 'Column'
  }
];

function NoRowsFallback() {
  return <div>Local no rows fallback</div>;
}

function GlobalNoRowsFallback() {
  return <div>Global no rows fallback</div>;
}

function Checkbox() {
  return <div>Local checkbox</div>;
}

function GlobalCheckbox() {
  return <div>Global checkbox</div>;
}

function setupProvider<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return render(
    <StrictMode>
      <DataGridDefaultComponentsProvider
        value={{ noRowsFallback: <GlobalNoRowsFallback />, checkboxFormatter: GlobalCheckbox }}
      >
        <DataGrid {...props} />
      </DataGridDefaultComponentsProvider>
    </StrictMode>
  );
}

test('fallback defined using components prop with no rows', () => {
  setup({ columns, rows: [], components: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using provider with no rows', () => {
  setupProvider({ columns, rows: [] });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Global no rows fallback')).toBeInTheDocument();
});

test('fallback defined using both provider and components with no rows', () => {
  setupProvider({ columns, rows: [], components: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using components prop with a row', () => {
  setup({ columns, rows: [{ id: 1 }], components: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using provider with a row', () => {
  setupProvider({ columns, rows: [{ id: 1 }] });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Global no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using both provider and components with a row', () => {
  setupProvider({ columns, rows: [{ id: 1 }], components: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Global no rows fallback')).not.toBeInTheDocument();
  expect(screen.queryByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('checkbox defined using components prop', () => {
  setup({ columns, rows: [], components: { checkboxFormatter: Checkbox } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local checkbox')).toBeInTheDocument();
});

test('checkbox defined using provider', () => {
  setupProvider({ columns, rows: [] });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Global checkbox')).toBeInTheDocument();
});

test('checkbox defined using both provider and components', () => {
  setupProvider({ columns, rows: [], components: { checkboxFormatter: Checkbox } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local checkbox')).toBeInTheDocument();
  expect(screen.queryByText('Global checkbox')).not.toBeInTheDocument();
});
