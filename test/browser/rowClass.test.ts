import type { Column } from '../../src';
import { rowClassname } from '../../src/style/row';
import { getRowByCellOrCellName, setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID' }];
const rows: readonly Row[] = [{ id: 0 }, { id: 1 }, { id: 2 }];

test('rowClass is undefined', async () => {
  setup({
    columns,
    rows,
    rowClass: undefined
  });
  await expect
    .element(getRowByCellOrCellName('0'))
    .toHaveClass(`${rowClassname} rdg-row-even`, { exact: true });
  await expect
    .element(getRowByCellOrCellName('1'))
    .toHaveClass(`${rowClassname} rdg-row-odd`, { exact: true });
  await expect
    .element(getRowByCellOrCellName('2'))
    .toHaveClass(`${rowClassname} rdg-row-even`, { exact: true });
});

test('rowClass returns a string', async () => {
  setup({
    columns,
    rows,
    rowClass: (row) => `my-row-${row.id}`
  });
  await expect
    .element(getRowByCellOrCellName('0'))
    .toHaveClass(`${rowClassname} rdg-row-even my-row-0`, { exact: true });
  await expect
    .element(getRowByCellOrCellName('1'))
    .toHaveClass(`${rowClassname} rdg-row-odd my-row-1`, { exact: true });
  await expect
    .element(getRowByCellOrCellName('2'))
    .toHaveClass(`${rowClassname} rdg-row-even my-row-2`, { exact: true });
});

test('rowClass returns undefined', async () => {
  setup({
    columns,
    rows,
    rowClass: () => undefined
  });
  await expect
    .element(getRowByCellOrCellName('0'))
    .toHaveClass(`${rowClassname} rdg-row-even`, { exact: true });
  await expect
    .element(getRowByCellOrCellName('1'))
    .toHaveClass(`${rowClassname} rdg-row-odd`, { exact: true });
  await expect
    .element(getRowByCellOrCellName('2'))
    .toHaveClass(`${rowClassname} rdg-row-even`, { exact: true });
});
