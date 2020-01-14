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

const columns: Column<Row>[] = [
  {
    key: 'id',
    name: 'ID',
    width: 80
  },
  {
    key: 'task',
    name: 'Title'
  },
  {
    key: 'priority',
    name: 'Priority'
  },
  {
    key: 'issueType',
    name: 'Issue Type'
  },
  {
    key: 'complete',
    name: '% Complete',
    formatter(props) {
      const value = props.row.complete;
      return (
        <>
          <progress max={100} value={value} /> {value}%
        </>
      );
    }
  },
  {
    key: 'startDate',
    name: 'Start Date'
  },
  {
    key: 'completeDate',
    name: 'Expected Complete'
  }
];


function getRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function createRows(): Row[] {
  const rows: Row[] = [];

  for (let i = 1; i < 100; i++) {
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

export default function CustomFormatters() {
  const [rows] = useState(createRows);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      minHeight={500}
    />
  );
}
