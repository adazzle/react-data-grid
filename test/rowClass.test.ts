import { setup } from './utils';
import { Column } from '../src';
import { screen } from '@testing-library/react';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID' }];
const rows: readonly Row[] = [{ id: 0 }, { id: 1 }, { id: 2 }];

function getAllRowClassNames() {
  return screen.getAllByRole('row').slice(1).map(row => row.className);
}

test('rowClass is undefined', () => {
  setup({
    columns,
    rows,
    rowClass: undefined
  });
  expect(getAllRowClassNames()).toStrictEqual([
    'rdg-row rdg-row-even',
    'rdg-row rdg-row-odd',
    'rdg-row rdg-row-even'
  ]);
});

test('rowClass returns a string', () => {
  setup({
    columns,
    rows,
    rowClass: row => `my-row-${row.id}`
  });
  expect(getAllRowClassNames()).toStrictEqual([
    'rdg-row rdg-row-even my-row-0',
    'rdg-row rdg-row-odd my-row-1',
    'rdg-row rdg-row-even my-row-2'
  ]);
});

test('rowClass returns undefined', () => {
  setup({
    columns,
    rows,
    rowClass: () => undefined
  });
  expect(getAllRowClassNames()).toStrictEqual([
    'rdg-row rdg-row-even',
    'rdg-row rdg-row-odd',
    'rdg-row rdg-row-even'
  ]);
});
