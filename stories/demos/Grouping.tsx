import React, { useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import { groupBy as rowGrouper } from 'lodash';
import faker from 'faker';

import DataGrid, { Column, Row, SelectColumn } from '../../src';

interface Row {
  id: number;
  country: string;
  year: number;
  athlete: string;
  gold: number;
  silver: number;
  bronze: number;
}

const columns: Column<Row>[] = [
  SelectColumn,
  {
    key: 'country',
    name: 'Country'
  },
  {
    key: 'year',
    name: 'Year'
  },
  {
    key: 'athlete',
    name: 'Athlete'
  },
  {
    key: 'gold',
    name: 'Gold',
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { gold }) => prev + gold, 0)}</>;
    }
  },
  {
    key: 'silver',
    name: 'Silver',
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
    }
  },
  {
    key: 'bronze',
    name: 'Bronze',
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, { silver }) => prev + silver, 0)}</>;
    }
  },
  {
    key: 'total',
    name: 'Total',
    formatter({ row }) {
      return <>{row.gold + row.silver + row.bronze}</>;
    },
    groupFormatter({ childRows }) {
      return <>{childRows.reduce((prev, row) => prev + row.gold + row.silver + row.bronze, 0)}</>;
    }
  }
];

function createRows(): Row[] {
  const rows: Row[] = [];
  for (let i = 1; i < 10000; i++) {
    rows.push({
      id: i,
      year: 2015 + faker.random.number(3),
      country: faker.address.country(),
      athlete: faker.name.findName(),
      gold: faker.random.number(5),
      silver: faker.random.number(5),
      bronze: faker.random.number(5)
    });
  }

  return rows.sort((r1, r2) => r1.country.localeCompare(r2.country));
}

export default function Grouping() {
  const [rows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState(() => new Set<number>());
  const [groupBy] = useState(['country', 'year']);
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<unknown>>(new Set());

  return (
    <AutoSizer>
      {({ height, width }) => (
        <DataGrid
          rowKey="id"
          columns={columns}
          rows={rows}
          height={height}
          width={width}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          groupBy={groupBy}
          rowGrouper={rowGrouper}
          expandedGroupIds={expandedGroupIds}
          onExpandedGroupIdsChange={setExpandedGroupIds}
          defaultColumnOptions={{ resizable: true }}
        />
      )}
    </AutoSizer>
  );
}
