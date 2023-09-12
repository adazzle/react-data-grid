import type { Column } from '../../src';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from '../../src/style/cell';
import { getHeaderCells, setup } from '../utils';

const columns: readonly Column<undefined>[] = [
  {
    key: 'col1',
    name: 'col1'
  },
  {
    key: 'col2',
    name: 'col2',
    draggable: true
  },
  {
    key: 'col3',
    name: 'col3',
    draggable: true
  },
  {
    key: 'col4',
    name: 'col4',
    draggable: true
  }
];

test('draggable columns', () => {
  setup({ columns, rows: [] });
  const [cell1, cell2, cell3, cell4] = getHeaderCells();

  expect(cell1).not.toHaveAttribute('draggable');
  expect(cell2).toHaveAttribute('draggable');
  expect(cell3).toHaveAttribute('draggable');
  expect(cell4).toHaveAttribute('draggable');
});
