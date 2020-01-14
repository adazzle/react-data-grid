import React, { useState } from 'react';
import DataGrid, { Column } from '../../src';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'id',
    name: 'ID',
    resizable: true,
    width: 40
  },
  {
    key: 'task',
    name: 'Title',
    resizable: true
  },
  {
    key: 'priority',
    name: 'Priority',
    resizable: true
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    resizable: true
  },
  {
    key: 'complete',
    name: '% Complete',
    resizable: true
  },
  {
    key: 'startDate',
    name: 'Start Date',
    resizable: true
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    resizable: true
  }
];

function getRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

export default function ResizableColumns() {
  const [rows] = useState<readonly Row[]>(() => {
    const prevDate = new Date(2015, 3, 1);
    const nextDate = new Date(2016, 0, 1);
    const nowDate = new Date();
    const rows: Row[] = [];

    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: getRandomDate(prevDate, nowDate),
        completeDate: getRandomDate(nowDate, nextDate)
      });
    }

    return rows;
  });

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      height={500}
      minColumnWidth={120}
    />
  );
}
