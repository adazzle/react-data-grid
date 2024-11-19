import type { Column } from '../../../src';
import { getHeaderCells, setupNew } from '../utils';

test('name is either a string or an element', async () => {
  function Header() {
    return 'Fancy';
  }

  const columns: readonly Column<never>[] = [
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'name',
      name: <Header />
    }
  ];

  setupNew({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  await expect.element(cell1).toHaveTextContent('ID');
  await expect.element(cell2).toHaveTextContent('Fancy');
});
