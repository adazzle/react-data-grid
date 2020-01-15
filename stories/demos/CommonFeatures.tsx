import React, { useState, useCallback, useMemo } from 'react';
import faker from 'faker';
import { AutoSizer } from 'react-virtualized';
import DataGrid, { SelectColumn, Column, RowsUpdateEvent, DEFINE_SORT } from '../../src';

const formatter = new Intl.DateTimeFormat(navigator.language);

function TimestampFormatter({ timestamp }: { timestamp: number }) {
  return <>{formatter.format(timestamp)}</>;
}

interface Row {
  id: number;
  title: string;
  assignee: string;
  progress: number;
  startTimestamp: number;
  endTimestamp: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'id',
    name: 'ID',
    width: 60,
    frozen: true,
    sortable: true
  },
  {
    key: 'title',
    name: 'Task',
    width: 120,
    editable: true,
    frozen: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'assignee',
    name: 'Assignee',
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'progress',
    name: 'Completion',
    resizable: true,
    sortable: true,
    formatter(props) {
      const value = props.row.progress;
      return (
        <>
          <progress max={100} value={value} /> {Math.round(value)}%
        </>
      );
    }
  },
  {
    key: 'startTimestamp',
    name: 'Start date',
    resizable: true,
    sortable: true,
    formatter(props) {
      return <TimestampFormatter timestamp={props.row.startTimestamp} />;
    }
  },
  {
    key: 'endTimestamp',
    name: 'End date',
    resizable: true,
    sortable: true,
    formatter(props) {
      return <TimestampFormatter timestamp={props.row.endTimestamp} />;
    }
  }
];

function createRows(): readonly Row[] {
  const now = Date.now();
  const rows: Row[] = [];

  for (let i = 0; i < 1000; i++) {
    rows.push({
      id: i,
      title: `Task ${i + 1}`,
      assignee: faker.name.findName(),
      progress: Math.random() * 100,
      startTimestamp: now - Math.round(Math.random() * 1e10),
      endTimestamp: now + Math.round(Math.random() * 1e10)
    });
  }

  return rows;
}

export default function CommonFeatures() {
  const [rows, setRows] = useState(createRows);
  const [[sortColumn, sortDirection], setSort] = useState<[keyof Row, DEFINE_SORT]>(['id', DEFINE_SORT.NONE]);
  const [selectedRows, setSelectedRows] = useState(() => new Set<number>());

  const sortedRows: readonly Row[] = useMemo(() => {
    if (sortDirection === DEFINE_SORT.NONE) return rows;

    let sortedRows: Row[];

    if (sortColumn === 'assignee' || sortColumn === 'title') {
      sortedRows = [...rows].sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]));
    } else {
      sortedRows = [...rows].sort((a, b) => a[sortColumn] - b[sortColumn]);
    }

    return sortDirection === DEFINE_SORT.DESC ? sortedRows.reverse() : sortedRows;
  }, [rows, sortDirection, sortColumn]);

  const handleRowsUpdate = useCallback(({ fromRow, toRow, updated }: RowsUpdateEvent<Row, Partial<Row>>) => {
    const newRows = [...sortedRows];

    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...newRows[i], ...updated };
    }

    setRows(newRows);
  }, [sortedRows]);

  const handleSort = useCallback((columnKey: keyof Row, direction: DEFINE_SORT) => {
    setSort([columnKey, direction]);
  }, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <DataGrid
          rowKey="id"
          columns={columns}
          rows={sortedRows}
          width={width}
          height={height}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          onRowsUpdate={handleRowsUpdate}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          enableCellSelect
        />
      )}
    </AutoSizer>
  );
}
