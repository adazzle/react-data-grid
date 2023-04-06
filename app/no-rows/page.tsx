'use client';

import { css } from '@linaria/core';

import DataGrid, { SelectColumn } from '../../src';
import type { Column } from '../../src';
import { useDirection } from '../DirectionContext';

const gridClassname = css`
  block-size: 300px;
`;

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

export default function NoRows() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
      rowKeyGetter={rowKeyGetter}
      className={gridClassname}
      direction={useDirection()}
    />
  );
}
