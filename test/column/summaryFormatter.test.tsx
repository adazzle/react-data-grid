import type { Column } from '../../src';
import { setup, getCells } from '../utils';

interface SummaryRow {
  id: number;
  col1: string;
  col2: string;
}

const columns: readonly Column<unknown, SummaryRow>[] = [
  {
    key: 'col1',
    name: 'Col1',
    summaryFormatter(props) {
      return <>Summary: {props.row.id}</>;
    }
  },
  {
    key: 'col2',
    name: 'Col2'
  }
];

test('summaryFormatter', () => {
  setup({
    columns,
    rows: [],
    summaryRows: [
      { id: 12, col1: 'ab', col2: 'cd' },
      { id: 34, col1: 'ef', col2: 'gh' }
    ]
  });

  const cells = getCells();
  expect(cells).toHaveLength(4);
  expect(cells[0]).toHaveTextContent('Summary: 12');
  expect(cells[2]).toHaveTextContent('Summary: 34');
  // nothing is rendered when summaryFormatter is not defined
  expect(cells[1]).toBeEmptyDOMElement();
  expect(cells[3]).toBeEmptyDOMElement();
});
