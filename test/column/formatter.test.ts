import { Column } from '../../src';
import { setup, getCells } from '../utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row | null>[] = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' }
];
const rows: readonly Row[] = [{ id: 101 }];

describe('ValueFormatter', () => {
  it('should be used by default', () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('101');
    expect(cell2).toHaveTextContent('');
  });

  it('should handle non-object values', () => {
    setup({ columns, rows: [null] });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('');
    expect(cell2).toHaveTextContent('');
  });
});
