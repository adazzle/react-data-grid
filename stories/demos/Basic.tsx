import React from 'react';
import DataGrid, { Column } from '../../src';

interface Row {
  id: number;
  title: string;
  count: number;
}

const columns: Column<Row>[] = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' }
];

const rows = [
  { id: 0, title: 'row1', count: 20 },
  { id: 1, title: 'row1', count: 40 },
  { id: 2, title: 'row1', count: 60 }
];

export default function Basic() {
  return (
    <DataGrid<Row, 'id'>
      columns={columns}
      rows={rows}
      height={150}
    />
  );
}
