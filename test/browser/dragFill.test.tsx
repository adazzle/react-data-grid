import { useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../../src';
import type { Column, FillEvent } from '../../src';
import { getCellsAtRowIndexOld, getRowsOld } from './utils';

interface Row {
  col: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col',
    name: 'Col',
    editable: (row) => row.col !== 'a4',
    renderEditCell() {
      return null;
    }
  }
];

const initialRows: readonly Row[] = [{ col: 'a1' }, { col: 'a2' }, { col: 'a3' }, { col: 'a4' }];

function setup(allowDragFill = true) {
  render(<DragFillTest allowDragFill={allowDragFill} />);
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
  await userEvent.click(getCellsAtRowIndexOld(0)[0]);
  expect(getDragHandle()).not.toBeInTheDocument();
});

test('should allow dragFill if onFill is specified', async () => {
  setup();
  const cell = getCellsAtRowIndexOld(0)[0];
  await userEvent.click(cell);
  expect(cell).toHaveFocus();
  await userEvent.dblClick(getDragHandle()!);
  expect(cell).toHaveFocus();
  expect(getCellsAtRowIndexOld(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndexOld(2)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndexOld(3)[0]).toHaveTextContent('a4'); // readonly cell
});

test('should update single row using mouse', async () => {
  setup();
  const cell = getCellsAtRowIndexOld(0)[0];
  await userEvent.click(cell);
  await userEvent.pointer([
    { keys: '[MouseLeft>]', target: getDragHandle()! },
    { target: getRowsOld()[1] },
    { keys: '[/MouseLeft]' }
  ]);
  expect(getCellsAtRowIndexOld(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndexOld(2)[0]).toHaveTextContent('a3');
  expect(cell).toHaveFocus();
});

test('should update multiple rows using mouse', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndexOld(0)[0]);
  await userEvent.pointer([
    { keys: '[MouseLeft>]', target: getDragHandle()! },
    { target: getRowsOld()[3] },
    { keys: '[/MouseLeft]' }
  ]);
  expect(getCellsAtRowIndexOld(1)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndexOld(2)[0]).toHaveTextContent('a1');
  expect(getCellsAtRowIndexOld(3)[0]).toHaveTextContent('a4'); // readonly cell
});

test('should allow drag up using mouse', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndexOld(3)[0]);
  await userEvent.pointer([
    { keys: '[MouseLeft>]', target: getDragHandle()! },
    { target: getRowsOld()[0] },
    { keys: '[/MouseLeft]' }
  ]);
  expect(getCellsAtRowIndexOld(0)[0]).toHaveTextContent('a4');
  expect(getCellsAtRowIndexOld(1)[0]).toHaveTextContent('a4');
  expect(getCellsAtRowIndexOld(2)[0]).toHaveTextContent('a4');
});

test('should focus the cell when drag handle is clicked', async () => {
  setup();
  const cell = getCellsAtRowIndexOld(0)[0];
  await userEvent.click(cell);
  await userEvent.click(document.body);
  expect(document.body).toHaveFocus();
  await userEvent.click(getDragHandle()!);
  expect(cell).toHaveFocus();
});
