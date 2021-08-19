import { screen } from '@testing-library/react';
import type { Column } from '../src';
import { getRows, setup } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col',
    name: 'Column'
  }
];

function Empty() {
  return <div>Nothing to see</div>;
}

test('fallback defined with no rows', () => {
  setup({ columns, rows: [], noRowsFallback: <Empty /> });

  expect(getRows()).toHaveLength(0);
  expect(screen.getByText('Nothing to see')).toBeInTheDocument();
});

test('fallback defined with a row', () => {
  setup({ columns, rows: [{ id: 1 }], noRowsFallback: <Empty /> });

  expect(getRows()).toHaveLength(1);
  expect(screen.queryByText('Nothing to see')).not.toBeInTheDocument();
});
