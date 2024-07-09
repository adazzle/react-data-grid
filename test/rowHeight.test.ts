import type { Column, DataGridProps } from '../src';
import { getRows, setup } from './utils';

type Row = number;

function setupGrid(rowHeight: DataGridProps<Row>['rowHeight']) {
  const columns: Column<Row>[] = [];
  const rows: readonly Row[] = [...Array(50).keys()];

  for (let i = 0; i < 5; i++) {
    const key = String(i);
    columns.push({
      key,
      name: key,
      width: 80
    });
  }
  setup({ columns, rows, rowHeight });
}

test('rowHeight is number', () => {
  setupGrid(40);

  const grid = screen.getByRole('grid');
  expect(grid).toHaveStyle({ 'grid-template-rows': 'repeat(1, 40px) repeat(50, 40px)' });
  expect(getRows()).toHaveLength(31);
});

test('rowHeight is function', () => {
  setupGrid((row) => [40, 60, 80][row % 3]);

  const grid = screen.getByRole('grid');
  expect(grid).toHaveStyle({
    'grid-template-rows':
      'repeat(1, 35px) 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px'
  });
  expect(getRows()).toHaveLength(22);
});
