import type { Column } from '../../src';
import { headerRowClassname } from '../../src/HeaderRow';
import { getRow, setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID' }];
const rows: readonly Row[] = [{ id: 0 }];

test('headerRowClass is undefined', async () => {
  setup({
    columns,
    rows,
    rowClass: undefined
  });
  const header = getRow('ID');
  await expect.element(header).toHaveClass(headerRowClassname, { exact: true });
});

test('headerRowClass is a string', async () => {
  setup({
    columns,
    rows,
    headerRowClass: 'my-header-row'
  });
  const header = getRow('ID');
  await expect.element(header).toHaveClass(`${headerRowClassname} my-header-row`, { exact: true });
});
