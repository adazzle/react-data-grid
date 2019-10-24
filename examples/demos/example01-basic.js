import React from 'react';
import DataGrid, { valueCellContentRenderer } from 'react-data-grid';
import Wrapper from './Wrapper';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' }
];

const rows = [{ id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 }];

export default function() {
  return (
    <Wrapper title="Basic Example">
      <DataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={3}
        minHeight={150}
        defaultCellContentRenderer={valueCellContentRenderer}
      />
    </Wrapper>
  );
}
