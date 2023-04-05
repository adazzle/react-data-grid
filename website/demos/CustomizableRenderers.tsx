import { useMemo, useState } from 'react';
import { css } from '@linaria/core';

import DataGrid, { SelectColumn, textEditor } from '../../src';
import type { Column, CheckboxFormatterProps, SortColumn, SortStatusProps } from '../../src';
import type { Props } from './types';

const selectCellClassname = css`
  display: flex;
  align-items: center;
  justify-content: center;

  > input {
    margin: 0;
  }
`;

const sortPriorityClassname = css`
  color: grey;
  margin-left: 2px;
`;

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
}

function createRows(): readonly Row[] {
  const rows: Row[] = [];

  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.round(Math.random() * 3)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.round(Math.random() * 3)]
    });
  }

  return rows;
}

const columns: readonly Column<Row>[] = [
  {
    ...SelectColumn,
    headerCellClass: selectCellClassname,
    cellClass: selectCellClassname
  },
  {
    key: 'id',
    name: 'ID',
    width: 80
  },
  {
    key: 'task',
    name: 'Title',
    editor: textEditor,
    sortable: true
  },
  {
    key: 'priority',
    name: 'Priority',
    sortable: true
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    sortable: true
  },
  {
    key: 'complete',
    name: '% Complete',
    sortable: true
  }
];

export default function CustomizableRenderers({ direction }: Props) {
  const [rows, setRows] = useState(createRows);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  return (
    <DataGrid
      className="fill-grid"
      columns={columns}
      rows={sortedRows}
      rowKeyGetter={rowKeyGetter}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      renderers={{ sortStatus, checkboxFormatter }}
      direction={direction}
    />
  );
}

function checkboxFormatter(
  { onChange, ...props }: CheckboxFormatterProps,
  ref: React.RefObject<HTMLInputElement>
) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return <input type="checkbox" ref={ref} {...props} onChange={handleChange} />;
}

function sortStatus({ sortDirection, priority }: SortStatusProps) {
  return (
    <>
      {sortDirection !== undefined ? (sortDirection === 'ASC' ? '\u2B9D' : '\u2B9F') : null}
      <span className={sortPriorityClassname}>{priority}</span>
    </>
  );
}
function rowKeyGetter(row: Row) {
  return row.id;
}

type Comparator = (a: Row, b: Row) => number;
function getComparator(sortColumn: string): Comparator {
  switch (sortColumn) {
    case 'task':
    case 'priority':
    case 'issueType':
      return (a, b) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
      };
    case 'complete':
      return (a, b) => {
        return a[sortColumn] - b[sortColumn];
      };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
}
