import type { Column } from '../../src';
import { setup, getHeaderCells } from '../utils';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from '../../src/style';

interface Row {
  col1: number;
  col2: string;
  col3: string;
  col4: string;
}

test('frozen column have a specific class, and are stable-sorted before non-frozen columns', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'col1',
      name: 'col1',
      frozen: true
    },
    {
      key: 'col2',
      name: 'col2'
    },
    {
      key: 'col3',
      name: 'col3',
      frozen: true
    },
    {
      key: 'col4',
      name: 'col4',
      frozen: false
    }
  ];

  setup({ columns, rows: [] });
  const [cell1, cell2, cell3, cell4] = getHeaderCells();

  expect(cell1).toHaveClass(`${cellClassname} ${cellFrozenClassname}`, { exact: true });
  expect(cell2).toHaveClass(`${cellClassname} ${cellFrozenClassname} ${cellFrozenLastClassname}`, {
    exact: true
  });
  expect(cell3).toHaveClass(`${cellClassname}`, { exact: true });
  expect(cell4).toHaveClass(`${cellClassname}`, { exact: true });

  expect(cell1).toHaveTextContent('col1');
  expect(cell2).toHaveTextContent('col3');
  expect(cell3).toHaveTextContent('col2');
  expect(cell4).toHaveTextContent('col4');
});
