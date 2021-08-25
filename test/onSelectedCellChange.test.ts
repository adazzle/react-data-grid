import userEvent from '@testing-library/user-event';
import type { Column } from '../src';
import { getCells, setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID', editor: () => null }];
const rows: readonly Row[] = [{ id: 0 }, { id: 1 }];

test('onSelectedCellChange', () => {
  const onSelectedCellChange = jest.fn();
  setup({ columns, rows, onSelectedCellChange });

  expect(onSelectedCellChange).toHaveBeenCalledTimes(0);

  const cells = getCells();
  userEvent.click(cells[0]);
  expect(onSelectedCellChange).toHaveBeenCalledTimes(1);
  expect(onSelectedCellChange).toHaveBeenLastCalledWith({ idx: 0, rowIdx: 0 });

  // onSelectedCellChange is not called again as nothing changes
  userEvent.click(cells[0]);
  expect(onSelectedCellChange).toHaveBeenCalledTimes(1);

  userEvent.keyboard('{arrowdown}');
  expect(onSelectedCellChange).toHaveBeenCalledTimes(2);
  expect(onSelectedCellChange).toHaveBeenLastCalledWith({ idx: 0, rowIdx: 1 });

  userEvent.dblClick(cells[1]);
  expect(onSelectedCellChange).toHaveBeenCalledTimes(3);
  expect(onSelectedCellChange).toHaveBeenLastCalledWith({ idx: 0, rowIdx: 1 });
});
