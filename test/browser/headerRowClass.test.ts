import { page } from '@vitest/browser/context';

import type { Column } from '../../src';
import { headerRowClassname } from '../../src/HeaderRow';
import { setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID' }];
const rows: readonly Row[] = [{ id: 0 }];

test('headerRowClass is undefined', () => {
  setup({
    columns,
    rows,
    rowClass: undefined
  });
  const header = page.getByRole('row').first();
  expect(header).toHaveClass(headerRowClassname, { exact: true });
});

test('headerRowClass is a string', () => {
  setup({
    columns,
    rows,
    headerRowClass: 'my-header-row'
  });
  const header = page.getByRole('row').first();
  expect(header).toHaveClass(`${headerRowClassname} my-header-row`, { exact: true });
});
