import { StrictMode, useState } from 'react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../src';
import type { Column, FillEvent } from '../src';
import { fireEvent, render } from '@testing-library/react';
import { getCellsAtRowIndex, getRows } from './utils';

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

function getDragHandle() {
  return document.querySelector('.rdg-cell-drag-handle');
}

test('should not allow dragFill if onFill is undefined', async () => {
  setup(false);
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  expect(getDragHandle()).not.toBeInTheDocument();
});

test('should allow dragFill if onFill is specified', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await userEvent.dblClick(getDragHandle()!);
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(3)[0]).toHaveTextContent('a4'); // readonly cell
});

test('should update single row using mouse', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  fireEvent.mouseDown(getDragHandle()!, { buttons: 1 });
  fireEvent.mouseEnter(getRows()[1]);
  fireEvent.mouseUp(window);
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a3');
});

test('should update multiple rows using mouse', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  fireEvent.mouseDown(getDragHandle()!, { buttons: 1 });
  fireEvent.mouseEnter(getRows()[3]);
  fireEvent.mouseUp(window);
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndex(3)[0]).toHaveTextContent('a4'); // readonly cell
});

test('should allow drag up using mouse', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(3)[0]);
  fireEvent.mouseDown(getDragHandle()!, { buttons: 1 });
  fireEvent.mouseEnter(getRows()[0]);
  fireEvent.mouseUp(window);
  expect(getCellsAtRowIndex(0)[0]).toHaveTextContent('a4');
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a4');
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a4');
});
