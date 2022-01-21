import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Column, DataGridProps } from '../src';
import { setup, getRows } from './utils';

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
  expect(grid).toHaveStyle({ 'grid-template-rows': '40px repeat(50, 40px)' });
  expect(getRows()).toHaveLength(31);

  userEvent.tab();
  expect(grid.scrollTop).toBe(0);

  // Go to the last cell
  userEvent.keyboard('{ctrl}{end}');
  // scrollTop = 2000 (totalRowHeight) + 40(headerRowHeight)- 1080(clientHeight)
  expect(grid.scrollTop).toBe(960);
});

test('rowHeight is function', () => {
  setupGrid((args) => (args.type === 'ROW' ? [40, 60, 80][args.row % 3] : 40));

  const grid = screen.getByRole('grid');
  expect(grid).toHaveStyle({
    'grid-template-rows':
      '35px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px 80px 40px 60px'
  });
  expect(getRows()).toHaveLength(22);

  userEvent.tab();
  expect(grid.scrollTop).toBe(0);

  // Go to the last cell
  userEvent.keyboard('{ctrl}{end}');
  // scrollTop = 2980 (totalRowHeight) + 35(headerRowHeight)- 1080(clientHeight)
  expect(grid.scrollTop).toBe(1935);
});
