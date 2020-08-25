import React from 'react';
import DataGrid, { Column } from '../../src';

function EmptyRowsRenderer() {
  return <div style={{ textAlign: 'center' }}>Nothing to show <span lang="ja" title="ショボーン">(´・ω・`)</span></div>;
}

interface Row {
  id: number;
  title: string;
  count: number;
}

const columns: readonly Column<Row>[] = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' }
];

const rows: readonly Row[] = [];

export default function NoRows() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      emptyRowsRenderer={EmptyRowsRenderer}
      className="small-grid"
    />
  );
}
