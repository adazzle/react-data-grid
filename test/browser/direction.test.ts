import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { getGridNew, getSelectedCellNew, setupNew } from './utils';

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
  setupNew({ rows, columns });
  await expect.element(getGridNew()).toHaveAttribute('dir', 'ltr');
  await userEvent.tab();
  await expect.element(getSelectedCellNew()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowRight}');
  await expect.element(getSelectedCellNew()).toHaveTextContent('Name');
});

test('should use left to right direction if direction prop is set to ltr', async () => {
  setupNew({ rows, columns, direction: 'ltr' });
  await expect.element(getGridNew()).toHaveAttribute('dir', 'ltr');
  await userEvent.tab();
  await expect.element(getSelectedCellNew()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowRight}');
  await expect.element(getSelectedCellNew()).toHaveTextContent('Name');
});

test('should use right to left direction if direction prop is set to rtl', async () => {
  setupNew({ rows, columns, direction: 'rtl' });
  await expect.element(getGridNew()).toHaveAttribute('dir', 'rtl');
  await userEvent.tab();
  await expect.element(getSelectedCellNew()).toHaveTextContent('ID');
  await userEvent.keyboard('{ArrowLeft}');
  await expect.element(getSelectedCellNew()).toHaveTextContent('Name');
});
