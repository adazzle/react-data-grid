import userEvent from '@testing-library/user-event';
import { getHeaderCells } from './utils';
import type { Column, SortColumn } from '../src/types';
import { StrictMode, useState } from 'react';
import DataGrid from '../src';
import { render, screen } from '@testing-library/react';

const columns: readonly Column<SortColumn>[] = [
  { key: 'columnKey', name: 'columnKey' },
  { key: 'direction', name: 'direction' }
];

function TestGrid() {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={[]}
        defaultColumnOptions={{ sortable: true }}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
      />
      <div data-testid="sortColumnsValue">{JSON.stringify(sortColumns)}</div>
    </>
  );
}

function setup() {
  return render(
    <StrictMode>
      <TestGrid />
    </StrictMode>
  );
}

test('single column sort', () => {
  setup();
  userEvent.click(getHeaderCells()[1].firstElementChild!);
  expect(JSON.parse(screen.getByTestId('sortColumnsValue')!.textContent!)).toStrictEqual([
    { columnKey: 'direction', direction: 'ASC' }
  ]);
});

test('multi column sort', () => {
  setup();
  userEvent.click(getHeaderCells()[0].firstElementChild!);
  userEvent.click(getHeaderCells()[1].firstElementChild!, { ctrlKey: true });
  expect(JSON.parse(screen.getByTestId('sortColumnsValue')!.textContent!)).toStrictEqual([
    { columnKey: 'columnKey', direction: 'ASC' },
    { columnKey: 'direction', direction: 'ASC' }
  ]);
});

test('multi column sort with metakey', () => {
  setup();
  userEvent.click(getHeaderCells()[0].firstElementChild!);
  userEvent.click(getHeaderCells()[1].firstElementChild!, { metaKey: true });
  expect(JSON.parse(screen.getByTestId('sortColumnsValue')!.textContent!)).toStrictEqual([
    { columnKey: 'columnKey', direction: 'ASC' },
    { columnKey: 'direction', direction: 'ASC' }
  ]);
});
