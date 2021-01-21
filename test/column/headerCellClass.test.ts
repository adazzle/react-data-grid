import type { Column } from '../../src';
import { setup, getHeaderCells } from '../utils';

interface Row {
  id: number;
  name: string;
}

test('headerCellClass is either undefined or a string', () => {
  const columns: readonly Column<Row>[] = [{
    key: 'id',
    name: 'ID'
  }, {
    key: 'name',
    name: 'Name',
    headerCellClass: 'my-header'
  }];

  setup({ columns, rows: [] });
  const [cell1, cell2] = getHeaderCells();
  expect(cell1).toHaveClass('rdg-cell', { exact: true });
  expect(cell2).toHaveClass('rdg-cell my-header', { exact: true });
});
