import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { getGrid, setup, validateCellPosition } from '../utils';

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

test('should not change the left and right arrow behavior for right to left languages', () => {
  setup({ rows, columns, direction: 'rtl' });
  userEvent.tab();
  validateCellPosition(0, 0);
  userEvent.tab();
  validateCellPosition(1, 0);
  // we reverse the arrow direction for rtl, but in JSDOM arrowright moves to the left
  // it seems like the dir attribute is not supported
  userEvent.keyboard('{arrowright}');
  validateCellPosition(0, 0);
  userEvent.keyboard('{arrowleft}');
  validateCellPosition(1, 0);
  userEvent.keyboard('{arrowleft}');
  validateCellPosition(1, 0);
});
