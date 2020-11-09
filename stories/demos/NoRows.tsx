import DataGrid from '../../src';
import type { Column } from '../../src';

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

export function NoRows() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      emptyRowsRenderer={EmptyRowsRenderer}
      className="small-grid"
    />
  );
}

NoRows.storyName = 'No Rows';
