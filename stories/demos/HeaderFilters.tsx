import React, { useMemo, useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import Select from 'react-select';
import faker from 'faker';

import DataGrid, { Column, Filters } from '../../src';
import { NumericFilter } from './components/Filters';

interface Row {
  id: number;
  task: string;
  priority: string;
  issueType: string;
  developer: string;
  complete: number;
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

export default function HeaderFilters() {
  const [rows] = useState(createRows);
  const [filters, setFilters] = useState<Filters<Row>>({
    task: '',
    priority: 'Critical',
    issueType: 'All',
    developer: '',
    complete: ''
  });
  const [enableHeaderFilters, setEnableHeaderFilters] = useState(true);

  const columns = useMemo((): Column<Row>[] => {
    const developerOptions = Array.from(new Set(rows.map(r => r.developer))).map(d => ({
      label: d,
      value: d
    }));

    return [
      {
        key: 'id',
        name: 'ID',
        width: 50,
        filterable: false
      },
      {
        key: 'task',
        name: 'Title',
        filterable: true,
        filterRenderer: p => (
          <div className="rdg-filter-container">
            <input
              className="rdg-filter"
              value={p.value}
              onChange={e => p.onChange(e.target.value)}
            />
          </div>
        )
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        filterRenderer: p => (
          <div className="rdg-filter-container">
            <select className="rdg-filter" value={p.value} onChange={e => p.onChange(e.target.value)}>
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
        filterable: true,
        filterRenderer: p => (
          <div className="rdg-filter-container">
            <select className="rdg-filter" value={p.value} onChange={e => p.onChange(e.target.value)}>
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
        filterable: true,
        filterRenderer: p => (
          <div className="rdg-filter-container">
            <Select
              value={p.value}
              onChange={p.onChange}
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
        filterable: true,
        filterRenderer: NumericFilter
      }
    ];
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      return (
        (filters.task ? r.task.includes(filters.task) : true)
        && (filters.priority !== 'All' ? r.priority === filters.priority : true)
        && (filters.issueType !== 'All' ? r.issueType === filters.issueType : true)
        && (filters.developer ? r.developer === filters.developer.value : true)
        && (filters.complete ? filters.complete.filterValues(r, filters.complete, 'complete') : true)
      );
    });
  }, [rows, filters]);

  function clearFilters() {
    setFilters({
      task: '',
      priority: 'All',
      issueType: 'All',
      developer: '',
      complete: ''
    });
  }

  function toggleFilters() {
    setEnableHeaderFilters(!enableHeaderFilters);
  }

  return (
    <>
      <div style={{ marginBottom: 10, textAlign: 'right' }}>
        <button type="button" onClick={toggleFilters}>Toggle Filters</button>{' '}
        <button type="button" onClick={clearFilters}>Clear Filters</button>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <DataGrid
            columns={columns}
            rows={filteredRows}
            width={width}
            height={height - 30}
            enableHeaderFilters={enableHeaderFilters}
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}
      </AutoSizer>
    </>
  );
}
