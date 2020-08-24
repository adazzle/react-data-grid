import React, { useState, useMemo } from 'react';
import { AutoSizer } from 'react-virtualized';
import { groupBy as rowGrouper } from 'lodash';
import Select from 'react-select';
import faker from 'faker';

import DataGrid, { Column, Row, SelectColumn } from '../../src';

interface Row {
  id: number;
  country: string;
  year: number;
  sport: string;
  athlete: string;
  gold: number;
  silver: number;
  bronze: number;
}

const sports = ['Swimming', 'Gymnastics', 'Speed Skating', 'Cross Country Skiing', 'Short-Track Speed Skating', 'Diving', 'Cycling', 'Biathlon', 'Alpine Skiing', 'Ski Jumping', 'Nordic Combined', 'Athletics', 'Table Tennis', 'Tennis', 'Synchronized Swimming', 'Shooting', 'Rowing', 'Fencing', 'Equestrian', 'Canoeing', 'Bobsleigh', 'Badminton', 'Archery', 'Wrestling', 'Weightlifting', 'Waterpolo', 'Wrestling', 'Weightlifting'];

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
    key: 'sport',
    name: 'Sport'
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
      sport: sports[faker.random.number(sports.length)],
      athlete: faker.name.findName(),
      gold: faker.random.number(5),
      silver: faker.random.number(5),
      bronze: faker.random.number(5)
    });
  }

  return rows.sort((r1, r2) => r2.country.localeCompare(r1.country));
}

const options = [
  { value: 'country', label: 'Country' },
  { value: 'year', label: 'Year' },
  { value: 'sport', label: 'Sport' }
];

export default function Grouping() {
  const [rows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState(() => new Set<number>());
  const [selectedOptions, setSelectedOptions] = useState([options[0], options[1]]);
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<unknown>>(new Set(['United States of America', 'United States of America__2015']));

  const groupBy = useMemo(() => selectedOptions === null ? undefined : selectedOptions.map(o => o.value), [selectedOptions]);

  return (
    <>
      <label style={{ width: 400, marginBottom: 24 }}>
        Group by
        <Select
          value={selectedOptions}
          onChange={options => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setSelectedOptions(options as any);
            setExpandedGroupIds(new Set());
          }}
          options={options}
          isMulti
        />
      </label>
      <AutoSizer>
        {({ height, width }) => (
          <DataGrid
            rowKey="id"
            columns={columns}
            rows={rows}
            height={height - 85}
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
    </>
  );
}
