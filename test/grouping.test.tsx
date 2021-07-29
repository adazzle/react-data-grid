import { StrictMode, useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import type { Column } from '../src';
import DataGrid, { SelectColumn } from '../src';
import { render, screen, within } from '@testing-library/react';
import { getGrid, queryGrid, getRows, queryTreeGrid, getTreeGrid, getHeaderCells } from './utils';
import userEvent from '@testing-library/user-event';

interface Row {
  id: number;
  country: string;
  year: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'sport',
    name: 'Sport'
  },
  {
    key: 'country',
    name: 'Country'
  },
  {
    key: 'year',
    name: 'Year'
  }
];

const rows: readonly Row[] = [
  {
    id: 1,
    country: 'USA',
    year: 2020
  },
  {
    id: 2,
    country: 'USA',
    year: 2021
  },
  {
    id: 3,
    country: 'Canada',
    year: 2021
  },
  {
    id: 4,
    country: 'Canada',
    year: 2022
  }
];

function rowKeyGetter(row: Row) {
  return row.id;
}

function TestGrid({ groupBy }: { groupBy?: string[] }) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>([])
  );

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      groupBy={groupBy}
      rowGrouper={rowGrouper}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      expandedGroupIds={expandedGroupIds}
      onExpandedGroupIdsChange={setExpandedGroupIds}
    />
  );
}

function setup(groupBy?: string[]) {
  render(
    <StrictMode>
      <TestGrid groupBy={groupBy} />
    </StrictMode>
  );
}

function getHeaderCellsContent() {
  return getHeaderCells().map((cell) => cell.textContent);
}

test('should not group if groupBy is not specified', () => {
  setup();
  expect(queryTreeGrid()).not.toBeInTheDocument();
  expect(getGrid()).toHaveAttribute('aria-rowcount', '5');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Sport', 'Country', 'Year']);
  expect(getRows()).toHaveLength(4);
});

test('should not group if column does not exist', () => {
  setup(['abc']);
  expect(getGrid()).toHaveAttribute('aria-rowcount', '5');
  expect(getRows()).toHaveLength(4);
});

test('should group by single column', () => {
  setup(['country']);
  expect(queryGrid()).not.toBeInTheDocument();
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '7');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Sport', 'Year']);
  expect(getRows()).toHaveLength(2);
});

test('should group by multiple columns', () => {
  setup(['country', 'year']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '11');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Year', 'Sport']);
  expect(getRows()).toHaveLength(2);
});

test('should ignore duplicate groupBy columns', () => {
  setup(['year', 'year', 'year']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '8');
  expect(getRows()).toHaveLength(3);
});

test('should use groupBy order while grouping', () => {
  setup(['year', 'country']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '12');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Year', 'Country', 'Sport']);
  expect(getRows()).toHaveLength(3);
});

test('should toggle group when group cell is clicked', () => {
  setup(['year']);
  expect(getRows()).toHaveLength(3);
  const groupCell = screen.getByRole('gridcell', { name: '2021' });
  userEvent.click(groupCell);
  expect(getRows()).toHaveLength(5);
  userEvent.click(groupCell);
  expect(getRows()).toHaveLength(3);
});

test('should set aria-attributes', () => {
  setup(['year', 'country']);

  const groupCell1 = screen.getByRole('gridcell', { name: '2020' });
  const groupRow1 = groupCell1.parentElement!;
  expect(groupRow1).toHaveAttribute('aria-level', '1');
  expect(groupRow1).toHaveAttribute('aria-setsize', '3');
  expect(groupRow1).toHaveAttribute('aria-posinset', '1');
  expect(groupRow1).toHaveAttribute('aria-rowindex', '2');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  const groupCell2 = screen.getByRole('gridcell', { name: '2021' });
  const groupRow2 = groupCell2.parentElement!;
  expect(groupRow2).toHaveAttribute('aria-level', '1');
  expect(groupRow2).toHaveAttribute('aria-setsize', '3');
  expect(groupRow2).toHaveAttribute('aria-posinset', '2');
  expect(groupRow2).toHaveAttribute('aria-rowindex', '5');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(groupCell2);
  expect(groupRow2).toHaveAttribute('aria-expanded', 'true');

  const groupCell3 = screen.getByRole('gridcell', { name: 'Canada' });
  const groupRow3 = groupCell3.parentElement!;
  expect(groupRow3).toHaveAttribute('aria-level', '2');
  expect(groupRow3).toHaveAttribute('aria-setsize', '2');
  expect(groupRow3).toHaveAttribute('aria-posinset', '2');
  expect(groupRow3).toHaveAttribute('aria-rowindex', '8');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(groupCell3);
  expect(groupRow3).toHaveAttribute('aria-expanded', 'true');
});

test('should select rows in a group', () => {
  setup(['year', 'country']);

  // expand group
  const groupCell1 = screen.getByRole('gridcell', { name: '2021' });
  userEvent.click(groupCell1);
  const groupCell2 = screen.getByRole('gridcell', { name: 'Canada' });
  userEvent.click(groupCell2);

  // eslint-disable-next-line jest-dom/prefer-in-document
  expect(screen.queryAllByRole('row', { selected: true })).toHaveLength(0);

  // select parent row
  userEvent.click(within(groupCell1.parentElement!).getByLabelText('Select Group'));
  let selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(4);
  expect(selectedRows[0]).toHaveAttribute('aria-rowindex', '5');
  expect(selectedRows[1]).toHaveAttribute('aria-rowindex', '6');
  expect(selectedRows[2]).toHaveAttribute('aria-rowindex', '8');
  expect(selectedRows[3]).toHaveAttribute('aria-rowindex', '9');

  // unselecting child should unselect the parent row
  userEvent.click(within(selectedRows[3]).getByLabelText('Select'));
  selectedRows = screen.getAllByRole('row', { selected: true });
  // eslint-disable-next-line jest-dom/prefer-in-document
  expect(selectedRows).toHaveLength(1);
  expect(selectedRows[0]).toHaveAttribute('aria-rowindex', '6');

  // select child group
  userEvent.click(within(groupCell2.parentElement!).getByLabelText('Select Group'));
  selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(4);
});
