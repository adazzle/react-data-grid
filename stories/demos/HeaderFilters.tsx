import { useMemo, useState } from 'react';
import Select from 'react-select';
import faker from 'faker';
import { css } from '@linaria/core';

import DataGrid from '../../src';
import type { Column } from '../../src';
import { filterNumber, NumericFilter } from './components/Filters';

const rootClassname = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;

  > .rdg {
    flex: 1;
  }
`;

const toolbarClassname = css`
  text-align: end;
`;

const filterContainerClassname = css`
  display: flex;
  height: inherit;
  align-items: center;
`;

const filterClassname = css`
  width: 100%;
  padding: 4px;
  font-size: 14px;
`;

interface Row {
  id: number;
  task: string;
  priority: string;
  issueType: string;
  developer: string;
  complete: number;
}

export interface FilterRow {
  task?: string;
  priority?: string;
  issueType?: string;
  developer?: string;
  complete?: string;
}

export interface FilterRow {
  task?: string;
  priority?: string;
  issueType?: string;
  developer?: string;
  complete?: string;
}

function createRows() {
  const rows: Row[] = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor(Math.random() * 4)],
      developer: faker.name.findName()
    });
  }
  return rows;
}

export function HeaderFilters() {
  const [rows] = useState(createRows);
  const [filterRow, setFilterRow] = useState<FilterRow>({
    priority: 'Critical',
    issueType: 'All'
  });
  const [enableFilterRow, setEnableFilterRow] = useState(true);

  const columns = useMemo((): readonly Column<Row, unknown, FilterRow>[] => {
    const developerOptions = Array.from(new Set(rows.map(r => r.developer))).map(d => ({
      label: d,
      value: d
    }));

    return [
      {
        key: 'id',
        name: 'ID',
        width: 50
      },
      {
        key: 'task',
        name: 'Title',
        filterRenderer: ({ filterRow, onFilterRowChange }) => (
          <div className={filterContainerClassname}>
            <input
              className={filterClassname}
              value={filterRow.task}
              onChange={e => onFilterRowChange({ ...filterRow, task: e.target.value })}
            />
          </div>
        )
      },
      {
        key: 'priority',
        name: 'Priority',
        filterRenderer: ({ filterRow, onFilterRowChange }) => (
          <div className={filterContainerClassname}>
            <select
              className={filterClassname}
              value={filterRow.priority}
              onChange={e => onFilterRowChange({ ...filterRow, priority: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        )
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        filterRenderer: ({ filterRow, onFilterRowChange }) => (
          <div className={filterContainerClassname}>
            <select
              className={filterClassname}
              value={filterRow.issueType}
              onChange={e => onFilterRowChange({ ...filterRow, issueType: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Bug">Bug</option>
              <option value="Improvement">Improvement</option>
              <option value="Epic">Epic</option>
              <option value="Story">Story</option>
            </select>
          </div>
        )
      },
      {
        key: 'developer',
        name: 'Developer',
        filterRenderer: ({ filterRow, onFilterRowChange }) => (
          <div className={filterContainerClassname}>
            <Select
              value={filterRow.developer ? { label: filterRow.developer, value: filterRow.developer } : undefined}
              onChange={e => onFilterRowChange({ ...filterRow, developer: e!.value })}
              options={developerOptions}
              styles={{
                option: (provided) => ({
                  ...provided,
                  padding: 10
                }),
                control: (provided) => ({
                  ...provided,
                  height: 30,
                  minHeight: 30,
                  padding: 0,
                  lineHeight: 'normal'
                }),
                container: (provided) => ({
                  ...provided,
                  width: '100%'
                })
              }}
              menuPortalTarget={document.body}
            />
          </div>
        )
      },
      {
        key: 'complete',
        name: '% Complete',
        filterRenderer: ({ filterRow, onFilterRowChange }) => (
          <NumericFilter
            value={filterRow.complete}
            onChange={value => onFilterRowChange({ ...filterRow, complete: value })}
          />
        )
      }
    ];
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      if (filterRow.task && !row.task.includes(filterRow.task)) {
        return false;
      }
      if (filterRow.priority !== 'All' && row.priority !== filterRow.priority) {
        return false;
      }
      if (filterRow.issueType !== 'All' && row.issueType !== filterRow.issueType) {
        return false;
      }
      if (filterRow.developer && row.developer !== filterRow.developer) {
        return false;
      }
      if (filterRow.complete && !filterNumber(row.complete, filterRow.complete)) {
        return false;
      }

      return true;
    });
  }, [rows, filterRow]);

  function clearFilters() {
    setFilterRow({
      priority: 'All',
      issueType: 'All'
    });
  }

  function toggleFilters() {
    setEnableFilterRow(!enableFilterRow);
  }

  return (
    <div className={rootClassname}>
      <div className={toolbarClassname}>
        <button type="button" onClick={toggleFilters}>Toggle Filters</button>
        {' '}
        <button type="button" onClick={clearFilters}>Clear Filters</button>
      </div>
      <DataGrid
        columns={columns}
        rows={filteredRows}
        enableFilterRow={enableFilterRow}
        filterRow={filterRow}
        onFilterRowChange={setFilterRow}
      />
    </div>
  );
}

HeaderFilters.storyName = 'Header Filters';
