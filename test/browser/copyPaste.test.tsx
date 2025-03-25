import { useState } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import { DataGrid } from '../../src';
import type { CellCopyPasteEvent, Column } from '../../src';
import type { CellClipboardEvent } from '../../src/types';
import { copySelectedCell, getCellsAtRowIndex, getSelectedCell, pasteSelectedCell } from './utils';

interface Row {
  col: string;
}

const columns: readonly Column<Row, Row>[] = [
  {
    key: 'col',
    name: 'Col',
    editable: (row) => row.col !== 'a3',
    renderEditCell() {
      return <input autoFocus />;
    },
    renderSummaryCell({ row }) {
      return row.col;
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
  }
];

const bottomSummaryRows: readonly Row[] = [
  {
    col: 's1'
  }
];

const onCellPasteSpy = vi.fn();
const onCellCopySpy = vi.fn();

function CopyPasteTest() {
  const [rows, setRows] = useState(initialRows);

  function onCellPaste(
    { column, row }: CellCopyPasteEvent<Row, Row>,
    event: CellClipboardEvent
  ): Row {
    onCellPasteSpy({ column, row }, event);
    const columnKey = column.key;
    return { ...row, [columnKey]: row[columnKey as keyof Row] };
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      bottomSummaryRows={bottomSummaryRows}
      onRowsChange={setRows}
      onCellPaste={onCellPaste}
      onCellCopy={onCellCopySpy}
    />
  );
}

function setup() {
  onCellPasteSpy.mockReset();
  onCellCopySpy.mockReset();
  page.render(<CopyPasteTest />);
}

test('should call onCellCopy on cell copy', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  expect(onCellCopySpy).toHaveBeenCalledExactlyOnceWith(
    {
      row: initialRows[0],
      column: expect.objectContaining(columns[0])
    },
    expect.anything()
  );
});

test('should call onCellPaste on cell paste', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await pasteSelectedCell();
  expect(onCellPasteSpy).toHaveBeenCalledExactlyOnceWith(
    {
      row: initialRows[0],
      column: expect.objectContaining(columns[0])
    },
    expect.anything()
  );
});

test('should not allow paste on readonly cells', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(2)[0]);
  await pasteSelectedCell();
  expect(onCellPasteSpy).not.toHaveBeenCalled();
});

test('should allow copying a readonly cell', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(2)[0]);
  await copySelectedCell();
  expect(onCellCopySpy).toHaveBeenCalledExactlyOnceWith(
    {
      row: initialRows[2],
      column: expect.objectContaining(columns[0])
    },
    expect.anything()
  );
});

test('should not allow copy/paste on header or summary cells', async () => {
  setup();
  await userEvent.tab();
  await copySelectedCell();
  expect(onCellCopySpy).not.toHaveBeenCalled();
  await pasteSelectedCell();
  expect(onCellPasteSpy).not.toHaveBeenCalled();

  await userEvent.keyboard('{Control>}{end}');
  await copySelectedCell();
  expect(onCellCopySpy).not.toHaveBeenCalled();
  await pasteSelectedCell();
  expect(onCellPasteSpy).not.toHaveBeenCalled();
});

test('should not start editing when pressing ctrl+<input key>', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(1)[0]);
  await userEvent.keyboard('{Control>}b');
  await expect.element(getSelectedCell()).not.toHaveClass('rdg-editor-container');
});
