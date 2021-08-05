import { StrictMode, useState } from 'react';
import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid, { SelectColumn } from '../src';
import type { Column } from '../src';
import { getCellsAtRowIndex, getRows } from './utils';

interface Row {
  id: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'id',
    name: 'id'
  }
];

const initialRows: readonly Row[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

function rowKeyGetter(row: Row) {
  return row.id;
}

function RowSelectionTest({
  rows,
  setRowKeyGetter
}: {
  rows: readonly Row[];
  setRowKeyGetter: boolean;
}) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set());

  return (
    <DataGrid
      rowKeyGetter={setRowKeyGetter ? rowKeyGetter : undefined}
      columns={columns}
      rows={rows}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    />
  );
}

function setup(setRowKeyGetter = true, rows = initialRows) {
  render(
    <StrictMode>
      <RowSelectionTest rows={rows} setRowKeyGetter={setRowKeyGetter} />
    </StrictMode>
  );
}

function testSelection(rowIdx: number, isSelected: boolean) {
  expect(getRows()[rowIdx]).toHaveAttribute('aria-selected', isSelected ? 'true' : 'false');
}

function toggleSelection(rowIdx: number, shiftKey = false) {
  userEvent.click(within(getCellsAtRowIndex(rowIdx)[0]).getByLabelText('Select'), { shiftKey });
}

// https://github.com/testing-library/react-testing-library/issues/624
test.skip('row selection should throw error if rowKeyGetter is not specified', () => {
  setup(false);
  expect(() => {
    userEvent.click(within(getCellsAtRowIndex(0)[0]).getByLabelText('Select'));
  }).toThrow();
});

test('toggle selection when checkbox is clicked', () => {
  setup();
  toggleSelection(0);
  testSelection(0, true);
  toggleSelection(1);
  testSelection(0, true);

  toggleSelection(0);
  testSelection(0, false);
  toggleSelection(1);
  testSelection(1, false);
});

test('toggle selection using keyboard', () => {
  setup();
  testSelection(0, false);
  userEvent.click(getCellsAtRowIndex(0)[0]);
  userEvent.keyboard('{space}');
  testSelection(0, true);
  userEvent.keyboard('{arrowdown}');
  userEvent.keyboard('{space}');
  testSelection(1, true);
  userEvent.keyboard('{arrowup}');
  userEvent.keyboard('{space}');
  testSelection(0, false);
});

test('select/deselect all rows when header checkbox is clicked', () => {
  setup();
  const headerCheckbox = screen.getByLabelText('Select All');
  expect(headerCheckbox).not.toBeChecked();
  userEvent.click(headerCheckbox);
  testSelection(0, true);
  testSelection(1, true);
  testSelection(2, true);

  // deselecting a row should toggle header
  toggleSelection(0);
  expect(headerCheckbox).not.toBeChecked();
  toggleSelection(0);
  expect(headerCheckbox).toBeChecked();

  userEvent.click(headerCheckbox);
  testSelection(0, false);
  testSelection(1, false);
  testSelection(2, false);
});

test('header checkbox is not selected when there are no rows', () => {
  setup(true, []);
  expect(screen.getByLabelText('Select All')).not.toBeChecked();
});

test('select rows using shift click', () => {
  setup();
  toggleSelection(0);
  toggleSelection(2, true);
  testSelection(0, true);
  testSelection(1, true);
  testSelection(2, true);
});
