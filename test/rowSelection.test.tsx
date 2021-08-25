import { StrictMode, useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
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

function toggleSelection(rowIdx: number, shiftKey = false) {
  userEvent.click(within(getCellsAtRowIndex(rowIdx)[0]).getByLabelText('Select'), { shiftKey });
}

// function toggleGroupSelection

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

test('extra keys are preserved when updating the selectedRows Set', () => {
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

  toggleSelection(1);
  expect(set).toStrictEqual(new Set([...initialSet, 2]));

  userEvent.click(headerCheckbox);
  expect(set).toStrictEqual(new Set([...initialSet, 1, 2, 3]));

  userEvent.click(headerCheckbox);
  expect(set).toStrictEqual(initialSet);

  toggleSelection(1);
  expect(set).toStrictEqual(new Set([...initialSet, 2]));

  toggleSelection(1);
  expect(set).toStrictEqual(initialSet);
});

test('toggling selection of row groups', () => {
  interface Row {
    year: number;
    month: number;
    code: string;
  }

  const columns: readonly Column<Row>[] = [
    SelectColumn,
    {
      key: 'year',
      name: 'Year'
    },
    {
      key: 'month',
      name: 'Month'
    },
    {
      key: 'code',
      name: 'Code'
    }
  ];

  const rows: readonly Row[] = [
    { year: 2020, month: 1, code: 'a' },
    { year: 2020, month: 1, code: 'b' },
    { year: 2020, month: 2, code: 'c' },
    { year: 2021, month: 1, code: 'd' }
  ];

  function rowKeyGetter(row: Row) {
    return row.code;
  }

  const initialSet = new Set(['!', '?']);
  let set = initialSet;

  function Test() {
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(initialSet);
    const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
      () => new Set<unknown>([])
    );

    function onSelectedRowsChange(selectedRows: Set<string>) {
      setSelectedRows(selectedRows);
      set = selectedRows;
    }

    return (
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        onSelectedRowsChange={onSelectedRowsChange}
        groupBy={['year', 'month']}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
      />
    );
  }

  render(
    <StrictMode>
      <Test />
    </StrictMode>
  );

  userEvent.tab();
  userEvent.keyboard('{arrowright}{enter}{arrowdown}{arrowright}{enter}');
  expect(getRows()).toHaveLength(6);

  userEvent.keyboard('{arrowdown}{arrowleft}{arrowleft}{space}');
  expect(set).toStrictEqual(new Set([...initialSet, 'a']));
  testSelection(0, false);
  testSelection(1, false);
  testSelection(2, true);
  testSelection(3, false);

  userEvent.keyboard('{arrowup}{space}');
  expect(set).toStrictEqual(new Set([...initialSet, 'a', 'b']));
  testSelection(0, false);
  testSelection(1, true);
  testSelection(2, true);
  testSelection(3, true);

  userEvent.keyboard('{space}');
  expect(set).toStrictEqual(initialSet);
  testSelection(0, false);
  testSelection(1, false);
  testSelection(2, false);
  testSelection(3, false);

  userEvent.keyboard('{arrowup}{space}');
  expect(set).toStrictEqual(new Set([...initialSet, 'a', 'b', 'c']));
  testSelection(0, true);
  testSelection(1, true);
  testSelection(2, true);
  testSelection(3, true);
  testSelection(4, true);
});

test('select rows using shift click', () => {
  setup();
  toggleSelection(0);
  toggleSelection(2, true);
  testSelection(0, true);
  testSelection(1, true);
  testSelection(2, true);
});

test('select rows using shift space', () => {
  setup();
  userEvent.click(getCellsAtRowIndex(0)[1]);
  userEvent.keyboard('{shift}{space}');
  testSelection(0, true);
  userEvent.keyboard('{space}');
  testSelection(0, true);
  userEvent.keyboard('{shift}{space}');
  testSelection(0, false);
});
