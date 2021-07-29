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

  const rows = getRows();
  expect(rows[0]).toHaveStyle({ '--row-height': '40px' });
  expect(rows[1]).toHaveStyle({ '--row-height': '40px' });
  expect(rows[2]).toHaveStyle({ '--row-height': '40px' });
  expect(getRows()).toHaveLength(31);

  userEvent.tab();
  const grid = screen.getByRole('grid');
  expect(grid.scrollTop).toBe(0);

  // Go to the last cell
  userEvent.type(document.activeElement!, '{ctrl}{end}');
  // scrollTop = 2000 (totalRowHeight) + 40(headerRowHeight)- 1080(clientHeight)
  expect(grid.scrollTop).toBe(960);
});

test('rowHeight is function', () => {
  setupGrid((args) => (args.type === 'ROW' ? [40, 60, 80][args.row % 3] : 40));

  const rows = getRows();
  expect(rows[0]).toHaveStyle({ '--row-height': '40px' });
  expect(rows[1]).toHaveStyle({ '--row-height': '60px' });
  expect(rows[2]).toHaveStyle({ '--row-height': '80px' });
  expect(rows[3]).toHaveStyle({ '--row-height': '40px' });
  expect(rows).toHaveLength(22);

  userEvent.tab();
  const grid = screen.getByRole('grid');
  expect(grid.scrollTop).toBe(0);

  // Go to the last cell
  userEvent.type(document.activeElement!, '{ctrl}{end}');
  // scrollTop = 2980 (totalRowHeight) + 35(headerRowHeight)- 1080(clientHeight)
  expect(grid.scrollTop).toBe(1935);
});
