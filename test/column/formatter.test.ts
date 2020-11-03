import { screen } from '@testing-library/react';
import { Column } from '../../src';
import { setup } from '../utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row | null>[] = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' }
];
const rows: readonly Row[] = [{ id: 101 }];

function getAllCellTexts() {
  return screen.getAllByRole('gridcell').map(row => row.textContent);
}

describe('ValueFormatter', () => {
  it('should be used by default', () => {
    setup({ columns, rows });
    expect(getAllCellTexts()).toStrictEqual([
      '101',
      ''
    ]);
  });

  it('should handle non-object values', () => {
    setup({ columns, rows: [null] });
    expect(getAllCellTexts()).toStrictEqual([
      '',
      ''
    ]);
  });
});
