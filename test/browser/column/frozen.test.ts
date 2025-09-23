import type { Column } from '../../../src';
import { cellClassname, cellFrozenClassname } from '../../../src/style/cell';
import { getHeaderCell, setup } from '../utils';

test('frozen column have a specific class, and are stable-sorted before non-frozen columns', async () => {
  const columns: readonly Column<never>[] = [
    {
      key: 'col1',
      name: 'col1',
      frozen: true
    },
    {
      key: 'col2',
      name: 'col2'
    },
    {
      key: 'col3',
      name: 'col3',
      frozen: true
    },
    {
      key: 'col4',
      name: 'col4',
      frozen: false
    }
  ];

  setup({ columns, rows: [] });
  const cell1 = getHeaderCell('col1');
  const cell2 = getHeaderCell('col2');
  const cell3 = getHeaderCell('col3');
  const cell4 = getHeaderCell('col4');

  await expect
    .element(cell1)
    .toHaveClass(`${cellClassname} ${cellFrozenClassname}`, { exact: true });
  await expect.element(cell2).toHaveClass(cellClassname, { exact: true });
  await expect
    .element(cell3)
    .toHaveClass(`${cellClassname} ${cellFrozenClassname}`, { exact: true });
  await expect.element(cell4).toHaveClass(cellClassname, { exact: true });
});
