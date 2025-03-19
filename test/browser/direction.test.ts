import { userEvent } from '@vitest/browser/context';

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
  await expect.element(getGrid()).toHaveAttribute('dir', 'ltr');
  await userEvent.tab();
  await expect.element(getSelectedCell()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowRight}');
  await expect.element(getSelectedCell()).toHaveTextContent('Name');
});

test('should use left to right direction if direction prop is set to ltr', async () => {
  setup({ rows, columns, direction: 'ltr' });
  await expect.element(getGrid()).toHaveAttribute('dir', 'ltr');
  await userEvent.tab();
  await expect.element(getSelectedCell()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowRight}');
  await expect.element(getSelectedCell()).toHaveTextContent('Name');
});

test('should use right to left direction if direction prop is set to rtl', async () => {
  setup({ rows, columns, direction: 'rtl' });
  await expect.element(getGrid()).toHaveAttribute('dir', 'rtl');
  await userEvent.tab();
  await expect.element(getSelectedCell()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowLeft}');
  await expect.element(getSelectedCell()).toHaveTextContent('Name');
});
