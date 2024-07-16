import { act } from 'react';
import { userEvent } from '@vitest/browser/context';

import type { Column } from '../../src';
import { getHeaderCells, setup } from '../utils';

const columns: readonly Column<never>[] = [
  {
    key: 'col1',
    name: 'col1'
  },
  {
    key: 'col2',
    name: 'col2',
    draggable: true
  },
  {
    key: 'col3',
    name: 'col3',
    draggable: true
  },
  {
    key: 'col4',
    name: 'col4',
    draggable: true
  }
];

test('draggable columns', async () => {
  const onColumnsReorder = vi.fn();
  setup({ columns, rows: [], onColumnsReorder });
  const [cell1, cell2, cell3, cell4] = getHeaderCells();

  expect(cell1).not.toHaveAttribute('draggable');
  expect(cell2).toHaveAttribute('draggable');
  expect(cell3).toHaveAttribute('draggable');
  expect(cell4).toHaveAttribute('draggable');

  expect(onColumnsReorder).not.toHaveBeenCalled();

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.dragAndDrop(cell2, cell4);
  });

  expect(onColumnsReorder).toHaveBeenCalledWith('col2', 'col4');
  onColumnsReorder.mockReset();

  // should not call `onColumnsReorder` if drag and drop elements are the same
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.dragAndDrop(cell2, cell2);
  });
  expect(onColumnsReorder).not.toHaveBeenCalled();

  // should not drag a column if it is not specified as draggable
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.dragAndDrop(cell1, cell2);
  });
  expect(onColumnsReorder).not.toHaveBeenCalled();
});
