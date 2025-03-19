import { useState } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import { DataGrid } from '../../src';
import type { Column, PasteEvent } from '../../src';
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

const copyCellClassName = 'rdg-cell-copied';
const onPasteSpy = vi.fn();
const onCopySpy = vi.fn();

function CopyPasteTest({
  onPasteCallback = true,
  onCopyCallback = false
}: {
  onPasteCallback?: boolean;
  onCopyCallback?: boolean;
}) {
  const [rows, setRows] = useState(initialRows);

  function onPaste({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }: PasteEvent<Row>) {
    onPasteSpy();
    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row] };
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      bottomSummaryRows={bottomSummaryRows}
      onRowsChange={setRows}
      onPaste={onPasteCallback ? onPaste : undefined}
      onCopy={onCopyCallback ? onCopySpy : undefined}
    />
  );
}

function setup(onPasteCallback = true, onCopyCallback = false) {
  onPasteSpy.mockReset();
  onCopySpy.mockReset();
  page.render(<CopyPasteTest onPasteCallback={onPasteCallback} onCopyCallback={onCopyCallback} />);
}

test('should not allow copy/paste if onPaste & onCopy is undefined', async () => {
  setup(false, false);
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).not.toHaveClass(copyCellClassName);
  expect(onCopySpy).not.toHaveBeenCalled();
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  await userEvent.keyboard('{escape}');
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a2');
  expect(onPasteSpy).not.toHaveBeenCalled();
});

test('should allow copy if only onCopy is specified', async () => {
  setup(false, true);
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).toHaveClass(copyCellClassName);
  expect(onCopySpy).toHaveBeenCalledExactlyOnceWith({
    sourceRow: initialRows[0],
    sourceColumnKey: 'col'
  });
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a2');
  expect(onPasteSpy).not.toHaveBeenCalled();
});

test('should allow copy/paste if only onPaste is specified', async () => {
  setup(true, false);
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).toHaveClass(copyCellClassName);
  expect(onCopySpy).not.toHaveBeenCalled();
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
  expect(onPasteSpy).toHaveBeenCalledOnce();
});

test('should allow copy/paste if both onPaste & onCopy is specified', async () => {
  setup(true, true);
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).toHaveClass(copyCellClassName);
  expect(onCopySpy).toHaveBeenCalledExactlyOnceWith({
    sourceRow: initialRows[0],
    sourceColumnKey: 'col'
  });
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
  expect(onPasteSpy).toHaveBeenCalledOnce();
});

test('should not allow paste on readonly cells', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(1)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).toHaveClass(copyCellClassName);
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a3');
});

test('should allow copying a readonly cell, and pasting the value into a writable cell', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(2)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).toHaveClass(copyCellClassName);
  await userEvent.keyboard('{arrowup}');
  await pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a3');
});

test('should cancel copy/paste on escape', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  await expect.element(getSelectedCell()).toHaveClass(copyCellClassName);
  await userEvent.keyboard('{escape}');
  await expect.element(getSelectedCell()).not.toHaveClass(copyCellClassName);
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a2');
});

test('should not allow copy on header or summary cells', async () => {
  setup();
  await userEvent.tab();
  await copySelectedCell();
  await expect.element(getSelectedCell()).not.toHaveClass(copyCellClassName);
  await userEvent.keyboard('{arrowdown}');
  await pasteSelectedCell();
  await expect.element(getSelectedCell()).toHaveTextContent('a1');
  expect(onPasteSpy).not.toHaveBeenCalled();
  await userEvent.keyboard('{Control>}{end}');
  await copySelectedCell();
  await expect.element(getSelectedCell()).not.toHaveClass(copyCellClassName);
  await userEvent.keyboard('{arrowup}');
  await pasteSelectedCell();
  await expect.element(getSelectedCell()).toHaveTextContent('a3');
  expect(onPasteSpy).not.toHaveBeenCalled();
});

test('should not allow paste on header or summary cells', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await copySelectedCell();
  await userEvent.keyboard('{arrowup}');
  await pasteSelectedCell();
  await expect.element(getSelectedCell()).toHaveTextContent('Col');
  expect(onPasteSpy).not.toHaveBeenCalled();
  await userEvent.keyboard('{Control>}{end}');
  await pasteSelectedCell();
  await expect.element(getSelectedCell()).toHaveTextContent('s1');
  expect(onPasteSpy).not.toHaveBeenCalled();
});

test('should not start editing when pressing ctrl+<input key>', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(1)[0]);
  await userEvent.keyboard('{Control>}b');
  await expect.element(getSelectedCell()).not.toHaveClass('rdg-editor-container');
});
