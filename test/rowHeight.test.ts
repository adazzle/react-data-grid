import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

test('rowHeight is number', async () => {
  setupGrid(40);

  const grid = screen.getByRole('grid');
  expect(grid).toHaveStyle({ 'grid-template-rows': 'repeat(1, 40px) repeat(50, 40px)' });
  expect(getRows()).toHaveLength(31);

  await userEvent.tab();
  expect(grid.scrollTop).toBe(0);

  // Go to the last cell
  const spy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  await userEvent.keyboard('{Control>}{end}');
  expect(spy).toHaveBeenCalled();
});

test('rowHeight is function', async () => {
  setupGrid((row) => [40, 60, 80][row % 3]);

  const grid = screen.getByRole('grid');
  expect(grid).toHaveStyle({
    'grid-template-rows':
      'repeat(1, 35px) 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px'
  });
  expect(getRows()).toHaveLength(22);

  await userEvent.tab();
  expect(grid.scrollTop).toBe(0);

  const spy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  // Go to the last cell
  await userEvent.keyboard('{Control>}{end}');
  expect(spy).toHaveBeenCalled();
});
