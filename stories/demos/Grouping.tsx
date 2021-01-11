import { useState, useMemo } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import Select, { components } from 'react-select';
import type { ValueType, OptionsType, Props as SelectProps } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import faker from 'faker';
import { css } from '@linaria/core';

import DataGrid, { SelectColumn } from '../../src';
import type { Column } from '../../src';

const groupingClassname = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;

  > .rdg {
    flex: 1;
  }
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

interface Option {
  value: string;
  label: string;
}

const sports = ['Swimming', 'Gymnastics', 'Speed Skating', 'Cross Country Skiing', 'Short-Track Speed Skating', 'Diving', 'Cycling', 'Biathlon', 'Alpine Skiing', 'Ski Jumping', 'Nordic Combined', 'Athletics', 'Table Tennis', 'Tennis', 'Synchronized Swimming', 'Shooting', 'Rowing', 'Fencing', 'Equestrian', 'Canoeing', 'Bobsleigh', 'Badminton', 'Archery', 'Wrestling', 'Weightlifting', 'Waterpolo', 'Wrestling', 'Weightlifting'];

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
      year: 2015 + faker.random.number(3),
      country: faker.address.country(),
      sport: sports[faker.random.number(sports.length - 1)],
      athlete: faker.name.findName(),
      gold: faker.random.number(5),
      silver: faker.random.number(5),
      bronze: faker.random.number(5)
    });
  }

  return rows.sort((r1, r2) => r2.country.localeCompare(r1.country));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SortableMultiValue = SortableElement((props: any) => {
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

// @ts-expect-error
const SortableSelect = SortableContainer<SelectProps<Option, true>>(Select);

const options: OptionsType<Option> = [
  { value: 'country', label: 'Country' },
  { value: 'year', label: 'Year' },
  { value: 'sport', label: 'Sport' },
  { value: 'athlete', label: 'athlete' }
];

export function Grouping() {
  const [rows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());
  const [selectedOptions, setSelectedOptions] = useState<ValueType<Option, true>>([options[0], options[1]]);
  const [expandedGroupIds, setExpandedGroupIds] = useState(() => new Set<unknown>(['United States of America', 'United States of America__2015']));

  const groupBy = useMemo(() => Array.isArray(selectedOptions) ? selectedOptions.map((o: Option) => o.value) : undefined, [selectedOptions]);

  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
    if (!Array.isArray(selectedOptions)) return;
    const newOptions: Option[] = [...selectedOptions];
    newOptions.splice(newIndex < 0 ? newOptions.length + newIndex : newIndex, 0, newOptions.splice(oldIndex, 1)[0]);
    setSelectedOptions(newOptions);
    setExpandedGroupIds(new Set());
  }

  return (
    <div className={groupingClassname}>
      <label style={{ width: 400 }}>
        <b>Group by</b> (drag to sort)
        <SortableSelect
          // react-sortable-hoc props
          axis="xy"
          onSortEnd={onSortEnd}
          distance={4}
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          // react-select props
          isMulti
          value={selectedOptions}
          onChange={options => {
            setSelectedOptions(options);
            setExpandedGroupIds(new Set());
          }}
          options={options}
          components={{
            MultiValue: SortableMultiValue
          }}
          closeMenuOnSelect={false}
        />
      </label>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        groupBy={groupBy}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
      />
    </div>
  );
}

Grouping.storyName = 'Grouping';
