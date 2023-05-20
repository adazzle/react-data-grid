import type { Column, HeaderRendererProps } from '../../src';
import { setup, getHeaderCells } from '../utils';

interface Row {
  id: number;
  name: string;
}

test('headerRenderer is either undefined or a component', () => {
  function headerRenderer({ column }: HeaderRendererProps<Row>) {
    return <>Fancy! {column.name}</>;
  }

  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'name',
      name: 'Name',
      headerRenderer
    }
  ];

  setup({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  expect(cell1).toHaveTextContent('ID');
  expect(cell2).toHaveTextContent('Fancy! Name');
});
