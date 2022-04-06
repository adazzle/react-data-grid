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

test('should not sort if sortable is false', async () => {
  setup();
  const headerCell = getHeaderCells()[3];
  await userEvent.click(headerCell);
  expect(headerCell).not.toHaveAttribute('aria-sort');
  testSortColumns([]);
});

test('single column sort', async () => {
  setup();
  const headerCell = getHeaderCells()[0];
  await userEvent.click(headerCell.firstElementChild!);
  expect(headerCell).toHaveAttribute('aria-sort', 'ascending');
  // priority is not shown for single sort
  expect(headerCell).not.toHaveTextContent('1');
  testSortColumns([{ columnKey: 'colA', direction: 'ASC' }]);
  await userEvent.click(headerCell.firstElementChild!);
  expect(headerCell).toHaveAttribute('aria-sort', 'descending');
  testSortColumns([{ columnKey: 'colA', direction: 'DESC' }]);
  await userEvent.click(headerCell.firstElementChild!);
  expect(headerCell).not.toHaveAttribute('aria-sort');
  testSortColumns([]);
});

test('multi column sort', async () => {
  setup();
  const user = userEvent.setup();
  const [headerCell1, headerCell2, headerCell3] = getHeaderCells();
  await user.click(headerCell1.firstElementChild!);
  await user.keyboard('{Control>}');
  await user.click(headerCell2.firstElementChild!);
  await user.click(headerCell3.firstElementChild!);

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

  await user.click(headerCell2.firstElementChild!);
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colB', direction: 'ASC' },
    { columnKey: 'colC', direction: 'ASC' }
  ]);
  await user.click(headerCell2.firstElementChild!);
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colC', direction: 'ASC' }
  ]);
  expect(headerCell3).toHaveTextContent('2');

  // clicking on a column without ctrlKey should remove multisort
  await user.keyboard('{/Control}');
  await user.click(headerCell2.firstElementChild!);
  testSortColumns([{ columnKey: 'colB', direction: 'DESC' }]);
  expect(headerCell2).toHaveAttribute('aria-sort');
  expect(headerCell2).not.toHaveTextContent('2');
});

test('multi column sort with metakey', async () => {
  setup();
  const [headerCell1, headerCell2] = getHeaderCells();
  const user = userEvent.setup();
  await user.click(headerCell1.firstElementChild!);
  await user.keyboard('{Meta>}');
  await user.click(headerCell2.firstElementChild!);
  testSortColumns([
    { columnKey: 'colA', direction: 'ASC' },
    { columnKey: 'colB', direction: 'DESC' }
  ]);
});

test('multi column sort with keyboard', async () => {
  setup();
  const [headerCell1] = getHeaderCells();
  await userEvent.click(headerCell1.firstElementChild!);
  await userEvent.keyboard(' {arrowright}{Control>}{enter}');
  testSortColumns([
    { columnKey: 'colA', direction: 'DESC' },
    { columnKey: 'colB', direction: 'DESC' }
  ]);
});
