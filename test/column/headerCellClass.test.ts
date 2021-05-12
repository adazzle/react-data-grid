import type { Column } from '../../src';
import { setup, getHeaderCells } from '../utils';
import { cellClassname } from '../../src/style';

interface Row {
  id: number;
  name: string;
}

test('headerCellClass is either undefined or a string', () => {
  const columns: readonly Column<Row>[] = [
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
  expect(cell1).toHaveClass(`${cellClassname}`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} my-header`, { exact: true });
});
