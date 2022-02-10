import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { getGrid, getSelectedCell, setup } from '../utils';

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
  // it seems like the dir prop is not supported in jsdom.
  // in a real browser, name will be selected
  expect(getSelectedCell()).toHaveTextContent('ID');
  userEvent.tab();
  expect(getSelectedCell()).toHaveTextContent('Name');
  // as we reverse the arrow direction for rtl, so in jsdom arrowright moves to the left
  userEvent.type(getSelectedCell(), '{arrowright}');
  expect(getSelectedCell()).toHaveTextContent('ID');
  userEvent.type(getSelectedCell(), '{arrowleft}');
  expect(getSelectedCell()).toHaveTextContent('Name');
  userEvent.type(getSelectedCell(), '{arrowleft}');
  expect(getSelectedCell()).toHaveTextContent('Name');
});
