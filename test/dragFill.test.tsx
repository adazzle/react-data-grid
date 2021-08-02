import { StrictMode, useState } from 'react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../src';
import type { Column, FillEvent } from '../src';
import { render } from '@testing-library/react';
import { getCellsAtRowIndex } from './utils';

interface Row {
  col: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col',
    name: 'Col',
    editable: (row) => row.col !== 'a4',
    editor() {
      return null;
    }
  }
];

const initialRows: readonly Row[] = [
  {
    col: 'a1'
  },
  {
    col: 'a2'
  },
  {
    col: 'a3'
  },
  {
    col: 'a4'
  }
];

function setup(allowDragFill = true) {
  render(
    <StrictMode>
      <DragFillTest allowDragFill={allowDragFill} />
    </StrictMode>
  );
}

function DragFillTest({ allowDragFill = true }: { allowDragFill?: boolean }) {
  const [rows, setRows] = useState(initialRows);

  function onFill({ columnKey, sourceRow, targetRow }: FillEvent<Row>): Row {
    return { ...targetRow, [columnKey]: sourceRow[columnKey as keyof Row] };
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onRowsChange={setRows}
      onFill={allowDragFill ? onFill : undefined}
    />
  );
}

test('should not allow dragFill if onFill is undefined', () => {
  setup(false);
  userEvent.click(getCellsAtRowIndex(0)[0]);
  expect(document.querySelector('.rdg-cell-drag-handle')).not.toBeInTheDocument();
});

test('should allow dragFill if onFill is specified', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(0)[0]);
  userEvent.dblClick(document.querySelector('.rdg-cell-drag-handle')!);
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(3)[0]).toHaveTextContent('a4'); // readonly cell
});
