import type { Column } from '../../src';
import { setup, getCells } from '../utils';
import { cellClassname as cellClass } from '../../src/style';
import { summaryCellClassname } from '../../src/SummaryCell';

interface SummaryRow {
  id: number;
}

const cellClassname = `${cellClass} ${summaryCellClassname}`;
const topSummaryRows: readonly SummaryRow[] = [{ id: 0 }, { id: 1 }];
const bottomSummaryRows: readonly SummaryRow[] = [{ id: 2 }, { id: 3 }];

test('summaryCellClass is undefined', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID'
    }
  ];
  setup({ columns, topSummaryRows, bottomSummaryRows, rows: [] });
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
  setup({ columns, topSummaryRows, bottomSummaryRows, rows: [] });
  const cells = getCells();
  cells.forEach((cell) => {
    expect(cell).toHaveClass(`${cellClassname} my-cell`, { exact: true });
  });
});

test('summaryCellClass returns a string', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID',
      summaryCellClass: (row) => `my-cell-${row.id}`
    }
  ];
  setup({ columns, topSummaryRows, bottomSummaryRows, rows: [] });
  const [cell1, cell2, cell3, cell4] = getCells();
  expect(cell1).toHaveClass(`${cellClassname} my-cell-0`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} my-cell-1`, { exact: true });
  expect(cell3).toHaveClass(`${cellClassname} my-cell-2`, { exact: true });
  expect(cell4).toHaveClass(`${cellClassname} my-cell-3`, { exact: true });
});

test('summaryCellClass returns undefined', () => {
  const columns: readonly Column<unknown, SummaryRow>[] = [
    {
      key: 'id',
      name: 'ID',
      summaryCellClass: () => undefined
    }
  ];
  setup({ columns, topSummaryRows, bottomSummaryRows, rows: [] });
  const cells = getCells();
  cells.forEach((cell) => {
    expect(cell).toHaveClass(cellClassname, { exact: true });
  });
});
