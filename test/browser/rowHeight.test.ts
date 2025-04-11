import { page, userEvent } from '@vitest/browser/context';

import type { Column, DataGridProps } from '../../src';
import { getRows, setup } from './utils';

type Row = number;

function setupGrid(rowHeight: DataGridProps<Row>['rowHeight']) {
  const columns: Column<Row>[] = [];
  const rows: readonly Row[] = Array.from({ length: 50 }, (_, i) => i);

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

test('rowHeight is number', async () => {
  setupGrid(40);

  const grid = page.getByRole('grid').element();
  expect(grid).toHaveStyle({
    gridTemplateRows:
      '40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px'
  });
  expect(getRows()).toHaveLength(30);

  await userEvent.tab();
  expect(grid.scrollTop).toBe(0);
  await userEvent.keyboard('{Control>}{end}');
  expect(grid.scrollTop + grid.clientHeight).toBe(grid.scrollHeight);
});

test('rowHeight is function', async () => {
  setupGrid((row) => [40, 60, 80][row % 3]);

  const grid = page.getByRole('grid').element();
  expect(grid).toHaveStyle({
    gridTemplateRows:
      '35px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px'
  });
  expect(getRows()).toHaveLength(22);

  await userEvent.tab();
  expect(grid.scrollTop).toBe(0);
  await userEvent.keyboard('{Control>}{end}');
  expect(grid.scrollTop + grid.clientHeight).toBe(grid.scrollHeight);
});
