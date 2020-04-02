import React from 'react';
import DataGrid, { Column, EmptyRowsViewProps } from '../../src';
import { AutoSizer } from 'react-virtualized';

function EmptyRowsView({ width, height }: EmptyRowsViewProps) {
  return <div style={{ textAlign: 'center', height, width }}>Nothing to show <span lang="ja" title="ショボーン">(´・ω・`)</span></div>;
}

interface Row {
  id: number;
  title: string;
  count: number;
}

const columns: readonly Column<Row>[] = [
  { key: 'id', name: 'ID', resizable: true },
  { key: 'title', name: 'Title', resizable: true },
  { key: 'count', name: 'Count', resizable: true }
];

const rows: readonly Row[] = [];

export default function NoRows() {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <DataGrid
          columns={columns}
          rows={rows}
          width={width}
          height={height}
          emptyRowsView={EmptyRowsView}
        />
      )}
    </AutoSizer>
  );
}
