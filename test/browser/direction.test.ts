import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { getGrid, getSelectedCell, setup } from './utils';

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

test('should use left to right direction by default', async () => {
  setup({ rows, columns });
  expect(getGrid()).toHaveAttribute('dir', 'ltr');
  await userEvent.tab();
  expect(getSelectedCell()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowRight}');
  expect(getSelectedCell()).toHaveTextContent('Name');
});

test('should use left to right direction if direction prop is set to ltr', async () => {
  setup({ rows, columns, direction: 'ltr' });
  expect(getGrid()).toHaveAttribute('dir', 'ltr');
  await userEvent.tab();
  expect(getSelectedCell()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowRight}');
  expect(getSelectedCell()).toHaveTextContent('Name');
});

test('should use right to left direction if direction prop is set to rtl', async () => {
  setup({ rows, columns, direction: 'rtl' });
  expect(getGrid()).toHaveAttribute('dir', 'rtl');
  await userEvent.tab();
  expect(getSelectedCell()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowLeft}');
  expect(getSelectedCell()).toHaveTextContent('Name');
});
