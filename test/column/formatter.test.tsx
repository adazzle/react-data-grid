import type { Column } from '../../src';
import { setup, getCells } from '../utils';

interface Row {
  id: number;
}

describe('ValueFormatter', () => {
  const columns: readonly Column<Row | null>[] = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' }
  ];

  const rows: readonly Row[] = [{ id: 101 }];

  it('should be used by default', () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('101');
    expect(cell2).toBeEmptyDOMElement();
  });

  it('should handle non-object values', () => {
    setup({ columns, rows: [null] });
    const [cell1, cell2] = getCells();
    expect(cell1).toBeEmptyDOMElement();
    expect(cell2).toBeEmptyDOMElement();
  });
});

describe('Custom formatter component', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID',
      formatter: props => <>#{props.row.id}</>
    },
    {
      key: 'name',
      name: 'Name',
      formatter: () => <>No name</>
    }
  ];

  const rows: readonly Row[] = [{ id: 101 }];

  it('should replace the default formatter', () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('#101');
    expect(cell2).toHaveTextContent('No name');
  });
});
