import { useState } from 'react';
import DataGrid, { SelectColumn } from '../../src';
import type { Column } from '../../src';
import type { Props } from './types';

function EmptyRowsRenderer() {
  return (
    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
      Nothing to show{' '}
      <span lang="ja" title="ショボーン">
        (´・ω・`)
      </span>
    </div>
  );
}

interface Row {
  id: number;
  title: string;
  count: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' }
];

const rows: readonly Row[] = [];

function rowKeyGetter(row: Row) {
  return row.id;
}

export default function NoRows({ direction }: Props) {
  const [selectedRows, onSelectedRowsChange] = useState((): ReadonlySet<number> => new Set());

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      rowKeyGetter={rowKeyGetter}
      className="small-grid"
      direction={direction}
    />
  );
}
