import userEvent from '@testing-library/user-event';
import { getHeaderCells } from './utils';
import type { Column, SortColumn } from '../src/types';
import { StrictMode, useState } from 'react';
import DataGrid from '../src';
import { render, screen } from '@testing-library/react';

const columns: readonly Column<unknown>[] = [
  { key: 'colA', name: 'colA' },
  { key: 'colB', name: 'colB', sortDescendingFirst: true },
  { key: 'colC', name: 'colC' },
  { key: 'colD', name: 'colD', sortable: false }
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
  render(
    <StrictMode>
      <TestGrid />
    </StrictMode>
  );
}

function testSortColumns(expectedValue: readonly SortColumn[]) {
  expect(JSON.parse(screen.getByTestId('sortColumnsValue').textContent!)).toStrictEqual(
    expectedValue
  );
}

test('should not sort if sortable is false', () => {
  setup();
  const headerCell = getHeaderCells()[3];
  userEvent.click(headerCell);
  expect(headerCell).not.toHaveAttribute('aria-sort');
  testSortColumns([]);
});

test('single column sort', () => {
  setup();
  const headerCell = getHeaderCells()[0];
  userEvent.click(headerCell.firstElementChild!);
  expect(headerCell).toHaveAttribute('aria-sort', 'ascending');
  // priority is not shown for single sort
  expect(headerCell).not.toHaveTextContent('1');
  testSortColumns([{ columnKey: 'colA', direction: 'ASC' }]);
  userEvent.click(headerCell.firstElementChild!);
  expect(headerCell).toHaveAttribute('aria-sort', 'descending');
  testSortColumns([{ columnKey: 'colA', direction: 'DESC' }]);
  userEvent.click(headerCell.firstElementChild!);
  expect(headerCell).not.toHaveAttribute('aria-sort');
  testSortColumns([]);
});

test('multi column sort', () => {
  setup();
  const [headerCell1, headerCell2, headerCell3] = getHeaderCells();
  userEvent.click(headerCell1.firstElementChild!);
  userEvent.click(headerCell2.firstElementChild!, { ctrlKey: true });
  userEvent.click(headerCell3.firstElementChild!, { ctrlKey: true });

  // aria-sort is only added for single sort
  expect(headerCell1).not.toHaveAttribute('aria-sort');
  expect(headerCell1).toHaveTextContent('1'); // priority
  expect(headerCell2).not.toHaveAttribute('aria-sort');
  expect(headerCell2).toHaveTextContent('2');
  expect(headerCell3).not.toHaveAttribute('aria-sort');
  expect(headerCell3).toHaveTextContent('3');
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colB', direction: 'DESC' },
    { columnKey: 'colC', direction: 'ASC' }
  ]);

  userEvent.click(headerCell2.firstElementChild!, { ctrlKey: true });
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colB', direction: 'ASC' },
    { columnKey: 'colC', direction: 'ASC' }
  ]);
  userEvent.click(headerCell2.firstElementChild!, { ctrlKey: true });
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colC', direction: 'ASC' }
  ]);
  expect(headerCell3).toHaveTextContent('2');

  // clicking on a column without ctrlKey should remove multisort
  userEvent.click(headerCell2.firstElementChild!);
  testSortColumns([{ columnKey: 'colB', direction: 'DESC' }]);
  expect(headerCell2).toHaveAttribute('aria-sort');
  expect(headerCell2).not.toHaveTextContent('2');
});

test('multi column sort with metakey', () => {
  setup();
  const [headerCell1, headerCell2] = getHeaderCells();
  userEvent.click(headerCell1.firstElementChild!);
  userEvent.click(headerCell2.firstElementChild!, { metaKey: true });
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colB', direction: 'DESC' }
  ]);
});
