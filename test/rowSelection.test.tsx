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
    key: 'name',
    name: 'Name'
  }
];

const defaultRows: readonly Row[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

function rowKeyGetter(row: Row) {
  return row.id;
}

function RowSelectionTest({ initialRows }: { initialRows: readonly Row[] }) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set());

  return (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={initialRows}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    />
  );
}

function setup(initialRows = defaultRows) {
  render(
    <StrictMode>
      <RowSelectionTest initialRows={initialRows} />
    </StrictMode>
  );
}

function testSelection(rowIdx: number, isSelected: boolean) {
  expect(getRows()[rowIdx]).toHaveAttribute('aria-selected', isSelected ? 'true' : 'false');
}

async function toggleSelection(rowIdx: number, shift = false) {
  const element = within(getCellsAtRowIndex(rowIdx)[0]).getByLabelText('Select');
  const user = userEvent.setup();
  if (shift) await user.keyboard('{Shift>}');
  await user.click(element);
  if (shift) await user.keyboard('{/Shift}');
}

test('toggle selection when checkbox is clicked', async () => {
  setup();
  await toggleSelection(0);
  testSelection(0, true);
  await toggleSelection(1);
  testSelection(0, true);

  await toggleSelection(0);
  testSelection(0, false);
  await toggleSelection(1);
  testSelection(1, false);
});

test('toggle selection using keyboard', async () => {
  setup();
  testSelection(0, false);
  await userEvent.click(getCellsAtRowIndex(0)[0]);
  await userEvent.keyboard(' ');
  testSelection(0, true);
  await userEvent.keyboard('{arrowdown} ');
  testSelection(1, true);
  await userEvent.keyboard('{arrowup} ');
  testSelection(0, false);
});

test('select/deselect all rows when header checkbox is clicked', async () => {
  setup();
  const headerCheckbox = screen.getByLabelText('Select All');
  expect(headerCheckbox).not.toBeChecked();
  await userEvent.click(headerCheckbox);
  testSelection(0, true);
  testSelection(1, true);
  testSelection(2, true);

  // deselecting a row should toggle header
  await toggleSelection(0);
  expect(headerCheckbox).not.toBeChecked();
  await toggleSelection(0);
  expect(headerCheckbox).toBeChecked();

  await userEvent.click(headerCheckbox);
  testSelection(0, false);
  testSelection(1, false);
  testSelection(2, false);
});

test('header checkbox is not checked when there are no rows', () => {
  setup([]);
  expect(screen.getByLabelText('Select All')).not.toBeChecked();
});

test('header checkbox is not necessarily checked when selectedRows.size === rows.length', () => {
  render(
    <StrictMode>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={defaultRows}
        selectedRows={new Set([1, 2, 4])}
      />
    </StrictMode>
  );

  expect(screen.getByLabelText('Select All')).not.toBeChecked();
});

test('header checkbox is not necessarily checked when selectedRows.size > rows.length', () => {
  render(
    <StrictMode>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={defaultRows}
        selectedRows={new Set([1, 2, 4, 5])}
      />
    </StrictMode>
  );

  expect(screen.getByLabelText('Select All')).not.toBeChecked();
});

test('extra keys are preserved when updating the selectedRows Set', async () => {
  const initialSet = new Set([-1, 0, 99]);
  let set = initialSet;

  function Test() {
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(initialSet);

    function onSelectedRowsChange(selectedRows: Set<number>) {
      setSelectedRows(selectedRows);
      set = selectedRows;
    }

    return (
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={defaultRows}
        selectedRows={selectedRows}
        onSelectedRowsChange={onSelectedRowsChange}
      />
    );
  }

  render(
    <StrictMode>
      <Test />
    </StrictMode>
  );

  const headerCheckbox = screen.getByLabelText('Select All');

  await toggleSelection(1);
  expect(set).toStrictEqual(new Set([...initialSet, 2]));

  await userEvent.click(headerCheckbox);
  expect(set).toStrictEqual(new Set([...initialSet, 1, 2, 3]));

  await userEvent.click(headerCheckbox);
  expect(set).toStrictEqual(initialSet);

  await toggleSelection(1);
  expect(set).toStrictEqual(new Set([...initialSet, 2]));

  await toggleSelection(1);
  expect(set).toStrictEqual(initialSet);
});

test('select rows using shift click', async () => {
  setup();
  await toggleSelection(0);
  await toggleSelection(2, true);
  testSelection(0, true);
  testSelection(1, true);
  testSelection(2, true);
});

test('select rows using shift space', async () => {
  setup();
  await userEvent.click(getCellsAtRowIndex(0)[1]);
  await userEvent.keyboard('{Shift>} ');
  testSelection(0, true);
  await userEvent.keyboard(' ');
  testSelection(0, true);
  await userEvent.keyboard('{Shift>} ');
  testSelection(0, false);
});
