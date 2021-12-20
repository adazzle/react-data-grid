import { useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import faker from 'faker';
import { css } from '@linaria/core';

import TreeDataGrid from '../../src/TreeDataGrid';
import { SelectColumn, TextEditor } from '../../src';
import type { Column } from '../../src';

const groupingClassname = css`
  display: flex;
  flex-direction: column;
  height: 100%;
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
    key: 'sport',
    name: 'Sport'
  },
  {
    key: 'country',
    name: 'Country',
    editor: TextEditor
  },
  {
    key: 'year',
    name: 'Year'
  },
  {
    key: 'id',
    name: 'Id',
    formatter(props) {
      function onClick() {
        props.onRowChange({ ...props.row, id: props.row.id + 10 });
      }

      return <button onClick={onClick}>value: {props.row.id}</button>;
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
      athlete: faker.name.findName(),
      gold: faker.datatype.number(5),
      silver: faker.datatype.number(5),
      bronze: faker.datatype.number(5)
    });
  }

  return rows.sort((r1, r2) => r2.country.localeCompare(r1.country));
}

const options = ['country', 'year', 'sport', 'athlete'] as const;

export default function Grouping() {
  const [rows] = useState([
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
  ]);
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

      <TreeDataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        groupBy={['year', 'country']}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
      />
    </div>
  );
}
