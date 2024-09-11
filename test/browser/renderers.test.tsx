import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid, { DataGridDefaultRenderersContext, renderSortIcon, SelectColumn } from '../../src';
import type { Column, DataGridProps, RenderSortStatusProps, SortColumn } from '../../src';
import { getHeaderCells, getRows, setup } from './utils';

interface Row {
  id: number;
}

const noRows: readonly Row[] = [];

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

function localRenderCheckbox() {
  return <div>Local checkbox</div>;
}

function globalRenderCheckbox() {
  return <div>Global checkbox</div>;
}

function globalSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
  return (
    <>
      {renderSortIcon({ sortDirection })}
      <span data-testid="global-sort-priority">{priority}</span>
    </>
  );
}

function renderSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
  return (
    <>
      {renderSortIcon({ sortDirection })}
      <span data-testid="local-sort-priority">{priority}</span>
    </>
  );
}

function TestGrid<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  return <DataGrid {...props} sortColumns={sortColumns} onSortColumnsChange={setSortColumns} />;
}

function setupContext<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return render(
    <DataGridDefaultRenderersContext
      value={{
        noRowsFallback: <GlobalNoRowsFallback />,
        renderCheckbox: globalRenderCheckbox,
        renderSortStatus: globalSortStatus
      }}
    >
      <TestGrid {...props} />
    </DataGridDefaultRenderersContext>
  );
}

test('fallback defined using renderers prop with no rows', () => {
  setup({ columns, rows: noRows, renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using context with no rows', () => {
  setupContext({ columns, rows: noRows });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Global no rows fallback')).toBeInTheDocument();
});

test('fallback defined using both context and renderers with no rows', () => {
  setupContext({ columns, rows: noRows, renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using renderers prop with a row', () => {
  setup({ columns, rows: [{ id: 1 }], renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using context with a row', () => {
  setupContext({ columns, rows: [{ id: 1 }] });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Global no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using both context and renderers with a row', () => {
  setupContext({ columns, rows: [{ id: 1 }], renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Global no rows fallback')).not.toBeInTheDocument();
  expect(screen.queryByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('checkbox defined using renderers prop', () => {
  setup({ columns, rows: noRows, renderers: { renderCheckbox: localRenderCheckbox } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local checkbox')).toBeInTheDocument();
});

test('checkbox defined using context', () => {
  setupContext({ columns, rows: noRows });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Global checkbox')).toBeInTheDocument();
});

test('checkbox defined using both context and renderers', () => {
  setupContext({ columns, rows: noRows, renderers: { renderCheckbox: localRenderCheckbox } });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Local checkbox')).toBeInTheDocument();
  expect(screen.queryByText('Global checkbox')).not.toBeInTheDocument();
});

test('sortPriority defined using both contexts', async () => {
  setupContext({ columns, rows: noRows });

  const [, headerCell2, headerCell3] = getHeaderCells();
  const user = userEvent.setup();
  await user.click(headerCell2);
  await user.keyboard('{Control>}');
  await user.click(headerCell3);

  const p = screen.getAllByTestId('global-sort-priority');
  expect(p[0]).toHaveTextContent('1');
  expect(p[1]).toHaveTextContent('2');

  expect(screen.queryByTestId('local-sort-priority')).not.toBeInTheDocument();
});

test('sortPriority defined using both contexts and renderers', async () => {
  setupContext({ columns, rows: noRows, renderers: { renderSortStatus } });

  const [, headerCell2, headerCell3] = getHeaderCells();
  const user = userEvent.setup();
  await user.click(headerCell3);
  await user.keyboard('{Control>}');
  await user.click(headerCell2);

  const p = screen.getAllByTestId('local-sort-priority');
  expect(p[0]).toHaveTextContent('2');
  expect(p[1]).toHaveTextContent('1');

  expect(screen.queryByTestId('global-sort-priority')).not.toBeInTheDocument();
});
