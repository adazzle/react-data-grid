import type { Column, ColumnGroup } from '../../../src';
import { cellClassname } from '../../../src/style/cell';
import { getHeaderCells, setup } from '../utils';

test('headerCellClass is either nullish or a string', async () => {
  const columns: readonly Column<never>[] = [
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'name',
      name: 'Name',
      headerCellClass: 'my-header'
    }
  ];

  setup({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  await expect.element(cell1).toHaveClass(cellClassname, { exact: true });
  await expect.element(cell2).toHaveClass(`${cellClassname} my-header`, { exact: true });
});

test('columnGroup.headerCellClass is either nullish or a string', async () => {
  const columns: readonly ColumnGroup<never>[] = [
    {
      name: 'Group 1',
      children: [{ key: '1', name: '1' }]
    },
    {
      name: 'Group 2',
      headerCellClass: 'my-header',
      children: [{ key: '2', name: '2' }]
    }
  ];

  setup({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  await expect.element(cell1).toHaveClass(cellClassname, { exact: true });
  await expect.element(cell2).toHaveClass(`${cellClassname} my-header`, { exact: true });
});
