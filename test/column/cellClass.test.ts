import { setup } from '../utils';
import { Column } from '../../src';
import { screen } from '@testing-library/react';

interface Row {
  id: number;
}

const rows: readonly Row[] = [{ id: 0 }, { id: 1 }];

function getAllCellClassNames() {
  return screen.getAllByRole('gridcell').map(row => row.className);
}

test('cellClass is undefined', () => {
  const columns: readonly Column<Row>[] = [{
    key: 'id',
    name: 'ID',
    cellClass: undefined
  }];
  setup({ columns, rows });
  expect(getAllCellClassNames()).toStrictEqual([
    'rdg-cell',
    'rdg-cell'
  ]);
});

test('cellClass is a string', () => {
  const columns: readonly Column<Row>[] = [{
    key: 'id',
    name: 'ID',
    cellClass: 'my-cell'
  }];
  setup({ columns, rows });
  expect(getAllCellClassNames()).toStrictEqual([
    'rdg-cell my-cell',
    'rdg-cell my-cell'
  ]);
});

test('cellClass returns a string', () => {
  const columns: readonly Column<Row>[] = [{
    key: 'id',
    name: 'ID',
    cellClass: row => `my-cell-${row.id}`
  }];
  setup({ columns, rows });
  expect(getAllCellClassNames()).toStrictEqual([
    'rdg-cell my-cell-0',
    'rdg-cell my-cell-1'
  ]);
});

test('cellClass returns undefined', () => {
  const columns: readonly Column<Row>[] = [{
    key: 'id',
    name: 'ID',
    cellClass: () => undefined
  }];
  setup({ columns, rows });
  expect(getAllCellClassNames()).toStrictEqual([
    'rdg-cell',
    'rdg-cell'
  ]);
});
