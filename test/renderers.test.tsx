import { StrictMode, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid, { DataGridDefaultRenderersProvider, SelectColumn, sortIcon } from '../src';
import type {
  Column,
  DataGridProps,
  CheckboxFormatterProps,
  SortColumn,
  SortStatusProps
} from '../src';
import { getHeaderCells, getRows, setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'col1',
    name: 'Column1',
    sortable: true
  },
  {
    key: 'col2',
    name: 'Column2',
    sortable: true
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
  ref: React.RefObject<HTMLInputElement>
) {
  return <div ref={ref}>Local checkbox</div>;
}

function globalCheckboxFormatter(
  props: CheckboxFormatterProps,
  ref: React.RefObject<HTMLInputElement>
) {
  return <div ref={ref}>Global checkbox</div>;
}

function globalSortStatus({ sortDirection, priority }: SortStatusProps) {
  return (
    <>
      {sortIcon({ sortDirection })}
      <span data-testid="global-sort-priority">{priority}</span>
    </>
  );
}

function sortStatus({ sortDirection, priority }: SortStatusProps) {
  return (
    <>
      {sortIcon({ sortDirection })}
      <span data-testid="local-sort-priority">{priority}</span>
    </>
  );
}

function TestGrid<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  return <DataGrid {...props} sortColumns={sortColumns} onSortColumnsChange={setSortColumns} />;
}

function setupProvider<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return render(
    <StrictMode>
      <DataGridDefaultRenderersProvider
        value={{
          noRowsFallback: <GlobalNoRowsFallback />,
          checkboxFormatter: globalCheckboxFormatter,
          sortStatus: globalSortStatus
        }}
      >
        <TestGrid {...props} />
      </DataGridDefaultRenderersProvider>
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

test('sortPriority defined using both providers', async () => {
  setupProvider({ columns, rows: [] });

  const [, headerCell2, headerCell3] = getHeaderCells();
  const user = userEvent.setup();
  await user.click(headerCell2.firstElementChild!);
  await user.keyboard('{Control>}');
  await user.click(headerCell3.firstElementChild!);

  const p = screen.getAllByTestId('global-sort-priority');
  expect(p[0]).toHaveTextContent('1');
  expect(p[1]).toHaveTextContent('2');

  expect(screen.queryByTestId('local-sort-priority')).not.toBeInTheDocument();
});

test('sortPriority defined using both providers and renderers', async () => {
  setupProvider({ columns, rows: [], renderers: { sortStatus } });

  const [, headerCell2, headerCell3] = getHeaderCells();
  const user = userEvent.setup();
  await user.click(headerCell3.firstElementChild!);
  await user.keyboard('{Control>}');
  await user.click(headerCell2.firstElementChild!);

  const p = screen.getAllByTestId('local-sort-priority');
  expect(p[0]).toHaveTextContent('2');
  expect(p[1]).toHaveTextContent('1');

  expect(screen.queryByTestId('global-sort-priority')).not.toBeInTheDocument();
});
