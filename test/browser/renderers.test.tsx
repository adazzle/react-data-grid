import { useState } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import DataGrid, {
  Cell,
  DataGridDefaultRenderersProvider,
  Row as DefaultRow,
  renderSortIcon,
  SelectColumn
} from '../../src';
import type {
  CellRendererProps,
  Column,
  DataGridProps,
  RenderRowProps,
  RenderSortStatusProps,
  SortColumn
} from '../../src';
import { getCellsNew, getHeaderCellsNew, getRows, setupNew } from './utils';

interface Row {
  id: number;
  col1: string;
  col2: string;
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

function renderGlobalCell(key: React.Key, props: CellRendererProps<Row, unknown>) {
  return <Cell key={key} {...props} className="global" style={{ fontStyle: 'italic' }} />;
}

function renderLocalCell(key: React.Key, props: CellRendererProps<Row, unknown>) {
  return <Cell key={key} {...props} className="local" style={{ fontStyle: 'normal' }} />;
}

function renderGlobalRow(key: React.Key, props: RenderRowProps<Row>) {
  return <DefaultRow key={key} {...props} className="global" />;
}

function renderLocalRow(key: React.Key, props: RenderRowProps<Row>) {
  return <DefaultRow key={key} {...props} className="local" />;
}

function NoRowsFallback() {
  return <div>Local no rows fallback</div>;
}

function NoRowsGlobalFallback() {
  return <div>Global no rows fallback</div>;
}

function renderLocalCheckbox() {
  return <div>Local checkbox</div>;
}

function renderGlobalCheckbox() {
  return <div>Global checkbox</div>;
}

function renderGlobalSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
  return (
    <>
      {renderSortIcon({ sortDirection })}
      <span data-testid="global-sort-priority">{priority}</span>
    </>
  );
}

function renderLocalSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
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

function setupProvider<R, SR, K extends React.Key>(props: DataGridProps<R, SR, K>) {
  return page.render(
    <DataGridDefaultRenderersProvider
      value={{
        noRowsFallback: <NoRowsGlobalFallback />,
        renderCheckbox: renderGlobalCheckbox,
        renderSortStatus: renderGlobalSortStatus,
        renderCell: renderGlobalCell,
        renderRow: renderGlobalRow
      }}
    >
      <TestGrid {...props} />
    </DataGridDefaultRenderersProvider>
  );
}

test('fallback defined using renderers prop with no rows', async () => {
  setupNew({ columns, rows: noRows, renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  await expect.element(page.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using provider with no rows', async () => {
  setupProvider({ columns, rows: noRows });

  expect(getRows()).toHaveLength(0);
  await expect.element(page.getByText('Global no rows fallback')).toBeInTheDocument();
});

test('fallback defined using both provider and renderers with no rows', async () => {
  setupProvider({ columns, rows: noRows, renderers: { noRowsFallback: <NoRowsFallback /> } });

  expect(getRows()).toHaveLength(0);
  await expect.element(page.getByText('Local no rows fallback')).toBeInTheDocument();
});

test('fallback defined using renderers prop with a row', async () => {
  setupNew({
    columns,
    rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }],
    renderers: { noRowsFallback: <NoRowsFallback /> }
  });

  expect(getRows()).toHaveLength(1);
  await expect.element(page.getByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using provider with a row', async () => {
  setupProvider({ columns, rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }] });

  expect(getRows()).toHaveLength(1);
  await expect.element(page.getByText('Global no rows fallback')).not.toBeInTheDocument();
});

test('fallback defined using both provider and renderers with a row', async () => {
  setupProvider({
    columns,
    rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }],
    renderers: { noRowsFallback: <NoRowsFallback /> }
  });

  expect(getRows()).toHaveLength(1);
  await expect.element(page.getByText('Global no rows fallback')).not.toBeInTheDocument();
  await expect.element(page.getByText('Local no rows fallback')).not.toBeInTheDocument();
});

test('checkbox defined using renderers prop', async () => {
  setupNew({ columns, rows: noRows, renderers: { renderCheckbox: renderLocalCheckbox } });

  expect(getRows()).toHaveLength(0);
  await expect.element(page.getByText('Local checkbox')).toBeInTheDocument();
});

test('checkbox defined using provider', async () => {
  setupProvider({ columns, rows: noRows });

  expect(getRows()).toHaveLength(0);
  await expect.element(page.getByText('Global checkbox')).toBeInTheDocument();
});

test('checkbox defined using both provider and renderers', async () => {
  setupProvider({ columns, rows: noRows, renderers: { renderCheckbox: renderLocalCheckbox } });

  expect(getRows()).toHaveLength(0);
  await expect.element(page.getByText('Local checkbox')).toBeInTheDocument();
  await expect.element(page.getByText('Global checkbox')).not.toBeInTheDocument();
});

test('sortPriority defined using both providers', async () => {
  setupProvider({ columns, rows: noRows });

  const [, headerCell2, headerCell3] = getHeaderCellsNew();
  await userEvent.click(headerCell2);
  await userEvent.keyboard('{Control>}');
  await userEvent.click(headerCell3);

  const p = page.getByTestId('global-sort-priority').all();
  await expect.element(p[0]).toHaveTextContent('1');
  await expect.element(p[1]).toHaveTextContent('2');

  await expect.element(page.getByTestId('local-sort-priority')).not.toBeInTheDocument();
});

test('sortPriority defined using both providers and renderers', async () => {
  setupProvider({ columns, rows: noRows, renderers: { renderSortStatus: renderLocalSortStatus } });

  const [, headerCell2, headerCell3] = getHeaderCellsNew();
  await userEvent.click(headerCell3);
  await userEvent.keyboard('{Control>}');
  await userEvent.click(headerCell2);

  const p = page.getByTestId('local-sort-priority').all();
  await expect.element(p[0]).toHaveTextContent('2');
  await expect.element(p[1]).toHaveTextContent('1');

  await expect.element(page.getByTestId('global-sort-priority')).not.toBeInTheDocument();
});

test('renderCell defined using provider', async () => {
  setupProvider({ columns, rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }] });

  const [, cell1, cell2] = getCellsNew();
  await expect.element(cell1).toHaveTextContent('value 1');
  await expect.element(cell1).toHaveClass('global');
  await expect.element(cell1).not.toHaveClass('local');
  await expect.element(cell1).toHaveStyle({ fontStyle: 'italic' });

  await expect.element(cell2).toHaveTextContent('value 2');
  await expect.element(cell2).toHaveClass('global');
  await expect.element(cell2).not.toHaveClass('local');
  await expect.element(cell2).toHaveStyle({ fontStyle: 'italic' });
});

test('renderCell defined using both providers and renderers', async () => {
  setupProvider({
    columns,
    rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }],
    renderers: { renderCell: renderLocalCell }
  });

  const [, cell1, cell2] = getCellsNew();
  await expect.element(cell1).toHaveTextContent('value 1');
  await expect.element(cell1).toHaveClass('local');
  await expect.element(cell1).not.toHaveClass('global');
  await expect.element(cell1).toHaveStyle({ fontStyle: 'normal' });

  await expect.element(cell2).toHaveTextContent('value 2');
  await expect.element(cell2).toHaveClass('local');
  await expect.element(cell2).not.toHaveClass('global');
  await expect.element(cell2).toHaveStyle({ fontStyle: 'normal' });
});

test('renderRow defined using provider', () => {
  setupProvider({ columns, rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }] });

  const [row] = getRows();
  expect(row).toHaveClass('global');
  expect(row).not.toHaveClass('local');
});

test('renderRow defined using both providers and renderers', () => {
  setupProvider({
    columns,
    rows: [{ id: 1, col1: 'value 1', col2: 'value 2' }],
    renderers: { renderRow: renderLocalRow }
  });

  const [row] = getRows();
  expect(row).toHaveClass('local');
  expect(row).not.toHaveClass('global');
});
