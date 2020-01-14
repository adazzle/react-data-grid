import React, { useState, useCallback } from 'react';
import faker from 'faker';
import { AutoSizer } from 'react-virtualized';
import DataGrid, { SelectColumn, Column, GridRowsUpdatedEvent } from '../../src';

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
    frozen: true
  },
  {
    key: 'title',
    name: 'Task',
    width: 120,
    editable: true,
    frozen: true,
    resizable: true
  },
  {
    key: 'assignee',
    name: 'Assignee',
    editable: true,
    resizable: true
  },
  {
    key: 'progress',
    name: 'Completion',
    resizable: true,
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
    formatter(props) {
      return <TimestampFormatter timestamp={props.row.startTimestamp} />;
    }
  },
  {
    key: 'endTimestamp',
    name: 'End date',
    resizable: true,
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
  const [selectedRows, setSelectedRows] = useState(() => new Set<number>());

  const handleGridRowsUpdated = useCallback(({ fromRow, toRow, updated }: GridRowsUpdatedEvent<Row, Partial<Row>>) => {
    const newRows = [...rows];

    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...newRows[i], ...updated };
    }

    setRows(newRows);
  }, [rows]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <DataGrid
          rowKey="id"
          columns={columns}
          rows={rows}
          minHeight={height}
          minWidth={width}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          onGridRowsUpdated={handleGridRowsUpdated}
          enableCellSelect
        />
      )}
    </AutoSizer>
  );
}
