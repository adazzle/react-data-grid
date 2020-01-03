import React from 'react';
import DataGrid, { Column } from '../../src';
import Wrapper from './Wrapper';

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

export default function() {
  return (
    <Wrapper title="Basic Example">
      <DataGrid<Row, 'id'>
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={3}
        minHeight={150}
      />
    </Wrapper>
  );
}
