import userEvent from '@testing-library/user-event';
import { getCellsAtRowIndex, getHeaderCells } from './utils';
import type { Column, SortColumn } from '../src/types';
import { StrictMode, useMemo, useState } from 'react';
import DataGrid from '../src';
import { render } from '@testing-library/react';

interface Row {
  id: number;
  area: string;
  assignee: string;
  budget: number;
  transaction: string;
}
const newRows: readonly Row[] = [
  { id: 8, area: 'Creative', assignee: 'Phillip Kiehn', budget: 6877, transaction: 'invoice' },
  { id: 1, area: 'Accountability', assignee: 'Keith McGlynn', budget: 2508, transaction: 'deposit' },
  { id: 5, area: 'Brand', assignee: 'Brad Braun', budget: 8014, transaction: 'invoice' },
  { id: 7, area: 'Brand', assignee: 'Janice Stehr', budget: 10913, transaction: 'payment' },
  { id: 4, area: 'Accounts', assignee: 'Lynee Sawyer', budget: 3211, transaction: 'invoice' },
  { id: 2, area: 'Accountability', assignee: 'Michael Abshire', budget: 5252, transaction: 'invoice' },
  { id: 3, area: 'Accountability', assignee: 'Luther Larkin', budget: 1522, transaction: 'deposit' },
  { id: 6, area: 'Brand', assignee: 'Tony Reinger', budget: 700, transaction: 'invoice' }
];

const newColumns: readonly Column<Row>[] = [
  { key: 'id', name: 'id' },
  { key: 'area', name: 'area' },
  { key: 'assignee', name: 'assignee' },
  { key: 'budget', name: 'budget' },
  { key: 'transaction', name: 'transaction' }
];

interface Props {
  newRows: readonly Readonly<Row>[];
  newColumns: readonly Column<Row>[];
}

const SortingContainer = ({ newRows, newColumns }: Props) => {
  const [rows, setRows] = useState(newRows);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

  const getComparator = (sortColumn: string) => {
    switch (sortColumn) {
      case 'assignee':
      case 'area':
      case 'transaction':
        return function(a: Row, b: Row) { return a[sortColumn].localeCompare(b[sortColumn]); };
      case 'id':
      case 'budget':
        return function(a: Row, b: Row) { return a[sortColumn] - b[sortColumn]; };
      default:
        throw new Error(
          `unsupported sortColumn: "${sortColumn}"`
        );
    }
  };
  const sortedRows: readonly Row[] = useMemo(() => {
    if (sortColumns.length === 0) return rows;

    const sortedRows: Row[] = [...rows];
    sortedRows.sort((a: Row, b: Row) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
    return sortedRows;
  }, [rows, sortColumns]);

  return (
    <DataGrid
      columns={newColumns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true
      }}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid"
    />
  );
};

function setupNewGrid(props: Props) {
  return render(
    <StrictMode>
      <SortingContainer
        {...props}
      />
    </StrictMode>
  );
}

test('single column sort', () => {
  setupNewGrid({ newRows, newColumns });

  //Sort by Assignee - ASC
  userEvent.click(getHeaderCells()[2].firstElementChild!);

  expect(getCellsAtRowIndex(0)[2]).toHaveTextContent('Brad Braun');
  expect(getCellsAtRowIndex(1)[2]).toHaveTextContent('Janice Stehr');
  expect(getCellsAtRowIndex(2)[2]).toHaveTextContent('Keith McGlynn');
});

test('multi column sort', () => {
  setupNewGrid({ newRows, newColumns });

  //Sort by Area - ASC, Transaction - ASC, Budget - ASC
  userEvent.click(getHeaderCells()[1].firstElementChild!);
  userEvent.click(getHeaderCells()[4].firstElementChild!, { ctrlKey: true });
  userEvent.click(getHeaderCells()[3].firstElementChild!, { ctrlKey: true });

  expect(getCellsAtRowIndex(0)[1]).toHaveTextContent('Accountability');
  expect(getCellsAtRowIndex(0)[2]).toHaveTextContent('Luther Larkin');
  expect(getCellsAtRowIndex(0)[3]).toHaveTextContent('1522');
  expect(getCellsAtRowIndex(0)[4]).toHaveTextContent('deposit');

  expect(getCellsAtRowIndex(1)[1]).toHaveTextContent('Accountability');
  expect(getCellsAtRowIndex(1)[2]).toHaveTextContent('Keith McGlynn');
  expect(getCellsAtRowIndex(1)[3]).toHaveTextContent('2508');
  expect(getCellsAtRowIndex(1)[4]).toHaveTextContent('deposit');

  expect(getCellsAtRowIndex(2)[1]).toHaveTextContent('Accountability');
  expect(getCellsAtRowIndex(2)[2]).toHaveTextContent('Michael Abshire');
  expect(getCellsAtRowIndex(2)[3]).toHaveTextContent('5252');
  expect(getCellsAtRowIndex(2)[4]).toHaveTextContent('invoice');
});
