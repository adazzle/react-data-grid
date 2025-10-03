import { page } from 'vitest/browser';

import { DataGrid, SelectColumn, type Column } from '../src';
import { getGrid } from '../test/browser/utils';

interface Row {
  id: number;
  name: string;
}

const columns: readonly Column<Row, Row>[] = [
  SelectColumn,
  {
    key: 'name',
    name: 'Name',
    renderSummaryCell(props) {
      return props.row.name;
    }
  }
];

const rows: readonly Row[] = [
  { id: 1, name: 'Row 1' },
  { id: 2, name: 'Row 2' },
  { id: 3, name: 'Row 3' }
];

const topSummaryRows: readonly Row[] = [
  { id: 4, name: 'Top Summary Row 1' },
  { id: 5, name: 'Top Summary Row 2' }
];

const bottomSummaryRows: readonly Row[] = [
  { id: 4, name: 'Top Summary Row 1' },
  { id: 5, name: 'Top Summary Row 2' }
];

function rowKeyGetter(row: Row) {
  return row.id;
}

test('basic grid', async () => {
  page.render(
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={rows}
      topSummaryRows={topSummaryRows}
      bottomSummaryRows={bottomSummaryRows}
    />
  );

  await expect(getGrid()).toMatchScreenshot('basic-grid');
});
