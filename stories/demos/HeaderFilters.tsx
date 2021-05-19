import { createContext, useContext, useMemo, useState } from 'react';
import faker from 'faker';
import { css } from '@linaria/core';

import DataGrid from '../../src';
import type { Column } from '../../src';
import type { HeaderRendererProps, Omit } from '../../src/types';

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
  line-height: 35px;
  padding: 0;

  > div {
    padding: 0 8px;

    &:first-child {
      border-bottom: 1px solid var(--border-color);
    }
  }
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

interface Filter extends Omit<Row, 'id' | 'complete'> {
  complete?: number;
}

// Context is needed to read filter values otherwise columns are
// re-created when filters are changed and filter looses focus
const FilterContext = createContext<Filter | undefined>(undefined);

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
  const [filters, setFilters] = useState<Filter>({
    task: '',
    priority: 'Critical',
    issueType: 'All',
    developer: '',
    complete: undefined
  });
  const [enableFilterRow, setEnableFilterRow] = useState(true);

  const columns = useMemo((): readonly Column<Row>[] => {
    const developerOptions = Array.from(new Set(rows.map((r) => r.developer))).map((d) => ({
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
        headerCellClass: filterContainerClassname,
        headerRenderer: (p) => (
          <FilterRenderer {...p}>
            {(filters) => (
              <input
                className={filterClassname}
                value={filters.task}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    task: e.target.value
                  })
                }
              />
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'priority',
        name: 'Priority',
        headerCellClass: filterContainerClassname,
        headerRenderer: (p) => (
          <FilterRenderer {...p}>
            {(filters) => (
              <select
                className={filterClassname}
                value={filters.priority}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priority: e.target.value
                  })
                }
              >
                <option value="All">All</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        headerCellClass: filterContainerClassname,
        headerRenderer: (p) => (
          <FilterRenderer {...p}>
            {(filters) => (
              <select
                className={filterClassname}
                value={filters.issueType}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    issueType: e.target.value
                  })
                }
              >
                <option value="All">All</option>
                <option value="Bug">Bug</option>
                <option value="Improvement">Improvement</option>
                <option value="Epic">Epic</option>
                <option value="Story">Story</option>
              </select>
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'developer',
        name: 'Developer',
        headerCellClass: filterContainerClassname,
        headerRenderer: (p) => (
          <FilterRenderer {...p}>
            {(filters) => (
              <>
                <input
                  className={filterClassname}
                  value={filters.developer}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      developer: e.target.value
                    })
                  }
                  list="developers"
                />
                <datalist id="developers">
                  {developerOptions.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </datalist>
              </>
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'complete',
        name: '% Complete',
        headerCellClass: filterContainerClassname,
        headerRenderer: (p) => (
          <FilterRenderer {...p}>
            {(filters) => (
              <input
                type="number"
                className={filterClassname}
                value={filters.complete}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    complete: Number.isFinite(e.target.valueAsNumber)
                      ? e.target.valueAsNumber
                      : undefined
                  })
                }
              />
            )}
          </FilterRenderer>
        )
      }
    ];
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      return (
        (filters.task ? r.task.includes(filters.task) : true) &&
        (filters.priority !== 'All' ? r.priority === filters.priority : true) &&
        (filters.issueType !== 'All' ? r.issueType === filters.issueType : true) &&
        (filters.developer ? r.developer.startsWith(filters.developer) : true) &&
        (filters.complete !== undefined ? r.complete >= filters.complete : true)
      );
    });
  }, [rows, filters]);

  function clearFilters() {
    setFilters({
      task: '',
      priority: 'All',
      issueType: 'All',
      developer: '',
      complete: undefined
    });
  }

  function toggleFilters() {
    setEnableFilterRow(!enableFilterRow);
  }

  return (
    <div className={rootClassname}>
      <div className={toolbarClassname}>
        <button type="button" onClick={toggleFilters}>
          Toggle Filters
        </button>{' '}
        <button type="button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      <FilterContext.Provider value={filters}>
        <DataGrid columns={columns} rows={filteredRows} headerRowHeight={70} />
      </FilterContext.Provider>
    </div>
  );
}

function FilterRenderer<R, SR>({
  column,
  children
}: HeaderRendererProps<R, SR> & { children: (filters: Filter) => React.ReactElement }) {
  const filters = useContext(FilterContext)!;
  return (
    <>
      <div>{column.name}</div>
      <div>{children(filters)}</div>
    </>
  );
}
