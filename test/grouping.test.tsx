import { StrictMode, useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import type { Column } from '../src';
import DataGrid, { SelectColumn } from '../src';
import { render, screen } from '@testing-library/react';
import { getGrid } from './utils';

interface Row {
  id: number;
  country: string;
  year: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'country',
    name: 'Country'
  },
  {
    key: 'year',
    name: 'Year'
  }
];

const rows: Row[] = [
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

function TestGrid({ groupBy }: { groupBy?: string[] }) {
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>([])
  );

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      defaultColumnOptions={{ sortable: true }}
      groupBy={groupBy}
      rowGrouper={rowGrouper}
      expandedGroupIds={expandedGroupIds}
      onExpandedGroupIdsChange={setExpandedGroupIds}
    />
  );
}

function setup(groupBy?: string[]) {
  return render(
    <StrictMode>
      <TestGrid groupBy={groupBy} />
    </StrictMode>
  );
}

test('should not group if group by is not specified', () => {
  setup();
  const grid = getGrid();
  expect(screen.queryByRole('treegrid')).not.toBeInTheDocument();
  expect(grid).toHaveAttribute('aria-rowcount', '5');
});

test('should not group when column does not exist', () => {
  setup(['abc']);
  expect(getGrid()).toHaveAttribute('aria-rowcount', '5');
});

test('should group by single column', () => {
  setup(['country']);
  expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  const grid = screen.queryByRole('treegrid');
  expect(grid).toHaveAttribute('aria-rowcount', '7');
});

test('should group by multiple columns', () => {
  setup(['country', 'year']);
  const grid = screen.queryByRole('treegrid');
  expect(grid).toHaveAttribute('aria-rowcount', '11');
});
