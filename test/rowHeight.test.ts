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

  const rows = getRows();
  expect(rows[0]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows[1]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows[2]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(getRows()).toHaveLength(30);
});

test('rowHeight is function', async () => {
  setupGrid((row) => [40, 60, 80][row % 3]);

  const rows = getRows();
  expect(rows[0]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows[1]).toHaveStyle({ '--rdg-row-height': '60px' });
  expect(rows[2]).toHaveStyle({ '--rdg-row-height': '80px' });
  expect(rows[3]).toHaveStyle({ '--rdg-row-height': '40px' });
  expect(rows).toHaveLength(22);
});
