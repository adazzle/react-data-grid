import { StrictMode, useMemo, useState } from 'react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../src';
import type { Column, PasteEvent } from '../src';
import { fireEvent, render } from '@testing-library/react';
import { getCellsAtRowIndex, getSelectedCell } from './utils';

interface Row {
  col1: number;
  col2: string;
}

const copyCellClassName = 'rdg-cell-copied';

test('should not allow copy/paste if onPaste is undefined', () => {
  render(<CopyPasteTest allowCopyPaste={false} />);
  userEvent.click(getCellsAtRowIndex(0)[1]);
  copySelectedCell();
  expect(getSelectedCell()).not.toHaveClass(copyCellClassName);
  userEvent.type(document.activeElement!, '{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[1]).toHaveTextContent('a2');
});

test('should allow copy/paste if onPaste is specified', () => {
  render(<CopyPasteTest />);
  userEvent.click(getCellsAtRowIndex(0)[1]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.type(document.activeElement!, '{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[1]).toHaveTextContent('a1');
});

test('should not allow paste on readonly cells', () => {
  render(<CopyPasteTest />);
  userEvent.click(getCellsAtRowIndex(1)[1]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.type(document.activeElement!, '{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(2)[1]).toHaveTextContent('a3');
});

test('should cancel copy/paste on escape', () => {
  render(<CopyPasteTest />);
  userEvent.click(getCellsAtRowIndex(0)[1]);
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass(copyCellClassName);
  userEvent.type(document.activeElement!, '{escape}');
  expect(getSelectedCell()).not.toHaveClass(copyCellClassName);
  userEvent.type(document.activeElement!, '{arrowdown}');
  pasteSelectedCell();
  expect(getCellsAtRowIndex(1)[1]).toHaveTextContent('a2');
});

function CopyPasteTest({ allowCopyPaste = true }: { allowCopyPaste?: boolean }) {
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
      }
    ];
  });

  const columns = useMemo((): readonly Column<Row>[] => {
    return [
      {
        key: 'col1',
        name: 'Col1',
        editable: false
      },
      {
        key: 'col2',
        name: 'Col2',
        editable: (row) => row.col1 !== 3,
        editor() {
          return null;
        }
      }
    ];
  }, []);

  function onPaste({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }: PasteEvent<Row>) {
    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row] };
  }

  return (
    <StrictMode>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        onPaste={allowCopyPaste ? onPaste : undefined}
      />
    </StrictMode>
  );
}

function copySelectedCell() {
  fireEvent.keyDown(document.activeElement!, {
    keyCode: '67',
    ctrlKey: true
  });
}

function pasteSelectedCell() {
  fireEvent.keyDown(document.activeElement!, {
    keyCode: '86',
    ctrlKey: true
  });
}
