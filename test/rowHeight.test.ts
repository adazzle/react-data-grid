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

test('rowHeight is number', async () => {
  setupGrid(40);

  const rows = getRows();
  expect(rows[0]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows[1]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows[2]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(getRows()).toHaveLength(31);

  await userEvent.tab();
  const grid = screen.getByRole('grid');
  expect(grid.scrollTop).toBe(0);

  // Go to the last cell
  const spy = jest.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  await userEvent.keyboard('{Control>}{end}');
  expect(spy).toHaveBeenCalled();
});

test('rowHeight is function', async () => {
  setupGrid((args) => (args.type === 'ROW' ? [40, 60, 80][args.row % 3] : 40));

  const rows = getRows();
  expect(rows[0]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows[1]).toHaveStyle({ '--rdg-row-height': '60px' });
  expect(rows[2]).toHaveStyle({ '--rdg-row-height': '80px' });
  expect(rows[3]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows).toHaveLength(22);

  await userEvent.tab();
  const grid = screen.getByRole('grid');
  expect(grid.scrollTop).toBe(0);

  const spy = jest.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  // Go to the last cell
  await userEvent.keyboard('{Control>}{end}');
  expect(spy).toHaveBeenCalled();
});
