import React from 'react';
import DataGrid, { Row as GridRow, Column, RowRendererProps } from '../../src';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
}

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

const rows = (function createRows(): Row[] {
  const rows = [];
  for (let i = 1; i < 1000; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2022, 0, 1))
    });
  }

  return rows;
})();

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

function getRowBackground(index: number): string {
  return index % 2 ? 'green' : 'blue';
}


function getRowStyle(row: RowRendererProps<Row>) {
  return {
    color: getRowBackground(row.rowIdx)
  };
}

function RowRenderer(props: RowRendererProps<Row>) {
  // here we are just changing the style
  // but we could replace this with anything we liked, cards, images, etc
  // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
  return (
    <div style={getRowStyle(props)}>
      <GridRow {...props} />
    </div>
  );
}


export default function CustomRowRenderer() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowRenderer={RowRenderer}
    />
  );
}
