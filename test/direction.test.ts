import type { Column } from '../src';
import { getGrid, setup } from './utils';

interface Row {
  id: number;
  name: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'id',
    name: 'ID'
  },
  {
    key: 'name',
    name: 'Name'
  }
];

const rows: readonly Row[] = [];

test('should use left to right direction by default', () => {
  setup({ rows, columns });
  expect(getGrid()).toHaveAttribute('dir', 'ltr');
});

test('should use left to right direction if direction prop is set to ltr', () => {
  setup({ rows, columns, direction: 'ltr' });
  expect(getGrid()).toHaveAttribute('dir', 'ltr');
});

test('should use right to left direction if direction prop is set to rtl', () => {
  setup({ rows, columns, direction: 'rtl' });
  expect(getGrid()).toHaveAttribute('dir', 'rtl');
});
