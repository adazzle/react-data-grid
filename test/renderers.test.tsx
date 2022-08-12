import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';

import DataGrid, { DataGridDefaultComponentsProvider, SelectColumn } from '../src';
import type { Column, DataGridProps, CheckboxFormatterProps } from '../src';
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

function localCheckboxFormatter(
  props: CheckboxFormatterProps,
  ref: React.RefObject<HTMLOrSVGElement>
) {
  return <div ref={ref as React.RefObject<HTMLDivElement>}>Local checkbox</div>;
}

function globalCheckboxFormatter(
  props: CheckboxFormatterProps,
  ref: React.RefObject<HTMLOrSVGElement>
) {
  return <div ref={ref as React.RefObject<HTMLDivElement>}>Global checkbox</div>;
}

function setupProvider<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return render(
    <StrictMode>
      <DataGridDefaultComponentsProvider
        value={{
          noRowsFallback: <GlobalNoRowsFallback />,
          checkboxFormatter: globalCheckboxFormatter
        }}
      >
        <DataGrid {...props} />
      </DataGridDefaultComponentsProvider>
    </StrictMode>
  );
}

test('fallback defined using renderers prop with no rows', () => {
  setup({ columns, rows: [], renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using provider with no rows', () => {
  setupProvider({ columns, rows: [] });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Global no rows fallback')).toBeInTheDocument();
});

test('fallback defined using both provider and renderers with no rows', () => {
  setupProvider({ columns, rows: [], renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using renderers prop with a row', () => {
  setup({ columns, rows: [{ id: 1 }], renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using provider with a row', () => {
  setupProvider({ columns, rows: [{ id: 1 }] });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Global no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using both provider and renderers with a row', () => {
  setupProvider({ columns, rows: [{ id: 1 }], renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Global no rows fallback')).not.toBeInTheDocument();
  expect(screen.queryByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('checkbox defined using renderers prop', () => {
  setup({ columns, rows: [], renderers: { checkboxFormatter: localCheckboxFormatter } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local checkbox')).toBeInTheDocument();
});

test('checkbox defined using provider', () => {
  setupProvider({ columns, rows: [] });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Global checkbox')).toBeInTheDocument();
});

test('checkbox defined using both provider and renderers', () => {
  setupProvider({ columns, rows: [], renderers: { checkboxFormatter: localCheckboxFormatter } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local checkbox')).toBeInTheDocument();
  expect(screen.queryByText('Global checkbox')).not.toBeInTheDocument();
});
