import { useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import { css } from '@linaria/core';
import { faker } from '@faker-js/faker';

import DataGrid, { SelectColumn } from '../../src';
import type { Column } from '../../src';
import type { Props } from './types';

const groupingClassname = css`
  display: flex;
  flex-direction: column;
  block-size: 100%;
  gap: 8px;

  > .rdg {
    flex: 1;
  }
`;

const optionsClassname = css`
  display: flex;
  gap: 8px;
  text-transform: capitalize;
`;

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

const sports = [
  'Swimming',
  'Gymnastics',
  'Speed Skating',
  'Cross Country Skiing',
  'Short-Track Speed Skating',
  'Diving',
  'Cycling',
  'Biathlon',
  'Alpine Skiing',
  'Ski Jumping',
  'Nordic Combined',
  'Athletics',
  'Table Tennis',
  'Tennis',
  'Synchronized Swimming',
  'Shooting',
  'Rowing',
  'Fencing',
  'Equestrian',
  'Canoeing',
  'Bobsleigh',
  'Badminton',
  'Archery',
  'Wrestling',
  'Weightlifting',
  'Waterpolo',
  'Wrestling',
  'Weightlifting'
];

const columns: readonly Column<Row>[] = [
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

function rowKeyGetter(row: Row) {
  return row.id;
}

function createRows(): readonly Row[] {
  const rows: Row[] = [];
  for (let i = 1; i < 10000; i++) {
    rows.push({
      id: i,
      year: 2015 + faker.datatype.number(3),
      country: faker.address.country(),
      sport: sports[faker.datatype.number(sports.length - 1)],
      athlete: faker.name.fullName(),
      gold: faker.datatype.number(5),
      silver: faker.datatype.number(5),
      bronze: faker.datatype.number(5)
    });
  }

  return rows.sort((r1, r2) => r2.country.localeCompare(r1.country));
}

const options = ['country', 'year', 'sport', 'athlete'] as const;

export default function Grouping({ direction }: Props) {
  const [rows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState<readonly string[]>([
    options[0],
    options[1]
  ]);
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>(['United States of America', 'United States of America__2015'])
  );

  function toggleOption(option: string, enabled: boolean) {
    const index = selectedOptions.indexOf(option);
    if (enabled) {
      if (index === -1) {
        setSelectedOptions((options) => [...options, option]);
      }
    } else if (index !== -1) {
      setSelectedOptions((options) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        return newOptions;
      });
    }
    setExpandedGroupIds(new Set());
  }

  return (
    <div className={groupingClassname}>
      <b>Group by columns:</b>
      <div className={optionsClassname}>
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={(event) => toggleOption(option, event.target.checked)}
            />{' '}
            {option}
          </label>
        ))}
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        groupBy={selectedOptions}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
        direction={direction}
      />
    </div>
  );
}
