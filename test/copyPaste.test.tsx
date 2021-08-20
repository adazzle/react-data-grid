import { StrictMode, useState } from 'react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../src';
import type { Column, PasteEvent } from '../src';
import { render } from '@testing-library/react';
import { getCellsAtRowIndex, getSelectedCell, copySelectedCell, pasteSelectedCell } from './utils';

interface Row {
  col: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col',
    name: 'Col',
    editable: (row) => row.col !== 'a3',
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
  }
];

const copyCellClassName = 'rdg-cell-copied';

function CopyPasteTest({ allowCopyPaste = true }: { allowCopyPaste?: boolean }) {
  const [rows, setRows] = useState(initialRows);

  function onPaste({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }: PasteEvent<Row>) {
    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row] };
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onRowsChange={setRows}
      onPaste={allowCopyPaste ? onPaste : undefined}
    />
  );
}

function setup(allowCopyPaste = true) {
  render(
    <StrictMode>
      <CopyPasteTest allowCopyPaste={allowCopyPaste} />
    </StrictMode>
  );
}

test('should not allow copy/paste if onPaste is undefined', () => {
  setup(false);
  userEvent.click(getCellsAtRowIndex(0)[0]);
  copySelectedCell();
  expect(getSelectedCell()).not.toHaveClass(copyCellClassName);
  userEvent.keyboard('{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a2');
});

test('should allow copy/paste if onPaste is specified', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(0)[0]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.keyboard('{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a1');
});

test('should not allow paste on readonly cells', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(1)[0]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.keyboard('{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(2)[0]).toHaveTextContent('a3');
});

test('should allow copying a readonly cell, and pasting the value into a writable cell', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(2)[0]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.keyboard('{arrowup}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a3');
});

test('should cancel copy/paste on escape', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(0)[0]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.keyboard('{escape}');
  expect(getSelectedCell()).not.toHaveClass(copyCellClassName);
  userEvent.keyboard('{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[0]).toHaveTextContent('a2');
});
