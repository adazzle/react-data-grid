import type { Column } from '../../../src';
import { getHeaderCells, setup } from '../utils';

test('name is either a string or an element', () => {
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

  setup({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  expect(cell1).toHaveTextContent('ID');
  expect(cell2).toHaveTextContent('Fancy');
});
