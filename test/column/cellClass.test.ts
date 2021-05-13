import type { Column } from '../../src';
import { setup, getCells } from '../utils';
import { cellClassname } from '../../src/style';

interface Row {
  id: number;
}

const rows: readonly Row[] = [{ id: 0 }, { id: 1 }];

test('cellClass is undefined', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID'
    }
  ];
  setup({ columns, rows });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(cellClassname, { exact: true });
  expect(cell2).toHaveClass(cellClassname, { exact: true });
});

test('cellClass is a string', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID',
      cellClass: 'my-cell'
    }
  ];
  setup({ columns, rows });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(`${cellClassname} my-cell`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} my-cell`, { exact: true });
});

test('cellClass returns a string', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID',
      cellClass: (row) => `my-cell-${row.id}`
    }
  ];
  setup({ columns, rows });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(`${cellClassname} my-cell-0`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} my-cell-1`, { exact: true });
});

test('cellClass returns undefined', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID',
      cellClass: () => undefined
    }
  ];
  setup({ columns, rows });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(cellClassname, { exact: true });
  expect(cell2).toHaveClass(cellClassname, { exact: true });
});
