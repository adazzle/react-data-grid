import React, { useMemo, useCallback, useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import Select from 'react-select';

import DataGrid, { Column, Filters } from '../../src';
import { NumericFilter } from './components/Filters';
import Toolbar from './components/Toolbar/Toolbar';

interface Row {
  id: number;
  task: string;
  priority: string;
  issueType: string;
  developer: string;
  complete: number;
  startDate: string;
  completeDate: string;
}

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function createRows() {
  const rows: Row[] = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      developer: ['James', 'Tim', 'Daniel', 'Alan'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }
  return rows;
}

export default function HeaderFilters() {
  const [rows, setRows] = useState(createRows);
  const [filters, setFilters] = useState<Filters<Row>>({});
  const [enableHeaderFilters, setEnableHeaderFilters] = useState(true);
  const getValidFilterValues = useCallback((columnKey: keyof Row) => {
    const values = new Set(rows.map(r => r[columnKey]));
    return Array.from(values).map(v => ({
      label: v,
      value: v
    }));
  }, [rows]);

  const columns = useMemo((): Column<Row>[] => {
    return [
      {
        key: 'id',
        name: 'ID',
        width: 120,
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'task',
        name: 'Title',
        filterable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        filterRenderer: p => (
          <div className="rdg-filter-container">
            <Select
              value={p.value}
              onChange={p.onChange}
              options={getValidFilterValues(p.column.key)}
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
        key: 'issueType',
        name: 'Issue Type',
        filterable: true
      },
      {
        key: 'developer',
        name: 'Developer',
        filterable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'startDate',
        name: 'Start Date',
        filterable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        filterable: true
      }
    ];
  }, [getValidFilterValues]);

  function onFiltersChange(filters: Filters<Row>) {
    setFilters(filters);
    setRows(rows);
  }

  return (
    <>
      <Toolbar
        enableFilter
        numberOfRows={rows.length}
        onToggleFilter={() => {
          setEnableHeaderFilters(!enableHeaderFilters);
          setFilters({});
        }}
      />
      <AutoSizer>
        {({ height, width }) => (
          <DataGrid<Row, 'id'>
            columns={columns}
            rows={rows}
            width={width}
            height={height - 40}
            enableHeaderFilters={enableHeaderFilters}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        )}
      </AutoSizer>
    </>
  );
}
