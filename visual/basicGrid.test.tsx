import { page } from '@vitest/browser/context';

import { DataGrid, SelectColumn, type Column } from '../src';
import { getGrid } from '../test/browser/utils';

interface Row {
  id: number;
  name: string;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'name',
    name: 'Name'
  }
];

const rows: readonly Row[] = [
  { id: 1, name: 'Row 1' },
  { id: 2, name: 'Row 2' },
  { id: 3, name: 'Row 3' }
];

function rowKeyGetter(row: Row) {
  return row.id;
}

test('toggle selection when checkbox is clicked', async () => {
  page.render(<DataGrid rowKeyGetter={rowKeyGetter} columns={columns} rows={rows} />);

  await expect(getGrid()).toMatchScreenshot('basic-grid');
});
