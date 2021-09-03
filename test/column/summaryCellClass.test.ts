import type { Column } from '../../src';
import { setup, getCells } from '../utils';
import { cellClassname } from '../../src/style';

interface SummaryRow {
  id: number;
}

const summaryRows: readonly SummaryRow[] = [{ id: 0 }, { id: 1 }];

test('summaryCellClass is undefined', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID'
    }
  ];
  setup({ columns, summaryRows, rows: [] });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(cellClassname, { exact: true });
  expect(cell2).toHaveClass(cellClassname, { exact: true });
});

test('summaryCellClass is a string', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID',
      summaryCellClass: 'my-cell'
    }
  ];
  setup({ columns, summaryRows, rows: [] });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(`${cellClassname} my-cell`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} my-cell`, { exact: true });
});

test('summaryCellClass returns a string', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID',
      summaryCellClass: (row) => `my-cell-${row.id}`
    }
  ];
  setup({ columns, summaryRows, rows: [] });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(`${cellClassname} my-cell-0`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} my-cell-1`, { exact: true });
});

test('summaryCellClass returns undefined', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID',
      summaryCellClass: () => undefined
    }
  ];
  setup({ columns, summaryRows, rows: [] });
  const [cell1, cell2] = getCells();
  expect(cell1).toHaveClass(cellClassname, { exact: true });
  expect(cell2).toHaveClass(cellClassname, { exact: true });
});
