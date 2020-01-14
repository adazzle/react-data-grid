import React, { useState } from 'react';
import DataGrid, { Column, GridRowsUpdatedEvent } from '../../src';
import update from 'immutability-helper';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
}

function getRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function createRows(numberOfRows: number): Row[] {
  const rows: Row[] = [];

  for (let i = 1; i < numberOfRows; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }

  return rows;
}

const columns: Column<Row>[] = [
  {
    key: 'id',
    name: 'ID',
    width: 80
  },
  {
    key: 'task',
    name: 'Title',
    editable: true
  },
  {
    key: 'priority',
    name: 'Priority',
    editable: true
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    editable: true
  },
  {
    key: 'complete',
    name: '% Complete',
    editable: true
  },
  {
    key: 'startDate',
    name: 'Start Date',
    editable: true
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    editable: true
  }
];

export default function Editable() {
  const [rows, setRows] = useState(() => createRows(1000));

  function handleGridRowsUpdated({ fromRow, toRow, updated }: GridRowsUpdatedEvent<Row>) {
    const newRows = [...rows];

    for (let i = fromRow; i <= toRow; i++) {
      const rowToUpdate = newRows[i];
      const updatedRow = update(rowToUpdate, { $merge: updated });
      newRows[i] = updatedRow;
    }

    setRows(newRows);
  }

  return (
    <DataGrid
      enableCellSelect
      columns={columns}
      rows={rows}
      minHeight={500}
      onGridRowsUpdated={handleGridRowsUpdated}
    />
  );
}
