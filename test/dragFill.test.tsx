import { StrictMode, useState } from 'react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../src';
import type { Column, FillEvent } from '../src';
import { render } from '@testing-library/react';
import { getCellsAtRowIndex } from './utils';

interface Row {
  col1: number;
  col2: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col1',
    name: 'Col1',
    editable: false
  },
  {
    key: 'col2',
    name: 'Col2',
    editable: (row) => row.col1 !== 4,
    editor() {
      return null;
    }
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
  const [rows, setRows] = useState((): readonly Row[] => {
    return [
      {
        col1: 1,
        col2: 'a1'
      },
      {
        col1: 2,
        col2: 'a2'
      },
      {
        col1: 3,
        col2: 'a3'
      },
      {
        col1: 4,
        col2: 'a4'
      }
    ];
  });

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
  userEvent.click(getCellsAtRowIndex(0)[1]);
  expect(document.querySelector('.rdg-cell-drag-handle')).not.toBeInTheDocument();
});

test('should allow dragFill if onFill is specified', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(0)[1]);
  userEvent.dblClick(document.querySelector('.rdg-cell-drag-handle')!);
  expect(getCellsAtRowIndex(1)[1]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(2)[1]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(3)[1]).toHaveTextContent('a4'); // readonly cell
});
