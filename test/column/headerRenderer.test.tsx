import type { Column } from '../../src';
import { setup, getHeaderCells } from '../utils';

interface Row {
  id: number;
  name: string;
}

test('headerRenderer is either undefined or a component', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'name',
      name: 'Name',
      renderHeaderCell: ({ column }) => `Fancy! ${column.name}`
    }
  ];

  setup({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  expect(cell1).toHaveTextContent('ID');
  expect(cell2).toHaveTextContent('Fancy! Name');
});
