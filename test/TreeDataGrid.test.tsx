import { useState } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { groupBy as rowGrouper } from 'lodash-es';

import type { Column } from '../src';
import { SelectColumn, textEditor, TreeDataGrid } from '../src';
import { focusSinkClassname } from '../src/style/core';
import { rowSelected } from '../src/style/row';
import type { PasteEvent } from '../src/types';
import {
  copySelectedCell,
  getCellsAtRowIndex,
  getHeaderCells,
  getRows,
  getSelectedCell,
  getTreeGrid,
  pasteSelectedCell,
  render
} from './utils';

const rowSelectedClassname = 'rdg-row-selected';

interface Row {
  id: number;
  country: string;
  year: number;
}

type SummaryRow = undefined;

const topSummaryRows: readonly SummaryRow[] = [undefined];
const bottomSummaryRows: readonly SummaryRow[] = [undefined];

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'sport',
    name: 'Sport'
  },
  {
    key: 'country',
    name: 'Country',
    renderEditCell: textEditor
  },
  {
    key: 'year',
    name: 'Year'
  },
  {
    key: 'id',
    name: 'Id',
    renderCell(props) {
      function onClick() {
        props.onRowChange({ ...props.row, id: props.row.id + 10 });
      }

      return (
        <button type="button" onClick={onClick}>
          value: {props.row.id}
        </button>
      );
    },
    renderGroupCell({ childRows }) {
      return Math.min(...childRows.map((c) => c.id));
    }
  }
];

const initialRows: readonly Row[] = [
  {
    id: 1,
    country: 'USA',
    year: 2020
  },
  {
    id: 2,
    country: 'USA',
    year: 2021
  },
  {
    id: 3,
    country: 'Canada',
    year: 2021
  },
  {
    id: 4,
    country: 'Canada',
    year: 2022
  }
];

function rowKeyGetter(row: Row) {
  return row.id;
}

function TestGrid({ groupBy }: { groupBy: string[] }) {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
  const [expandedGroupIds, setExpandedGroupIds] = useState(
    (): ReadonlySet<unknown> => new Set<unknown>([])
  );

  function onPaste(event: PasteEvent<Row>) {
    return {
      ...event.targetRow,
      [event.targetColumnKey]: event.sourceRow[event.sourceColumnKey as keyof Row]
    };
  }

  return (
    <TreeDataGrid
      columns={columns}
      rows={rows}
      topSummaryRows={topSummaryRows}
      bottomSummaryRows={bottomSummaryRows}
      rowKeyGetter={rowKeyGetter}
      groupBy={groupBy}
      rowGrouper={rowGrouper}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      expandedGroupIds={expandedGroupIds}
      onExpandedGroupIdsChange={setExpandedGroupIds}
      onRowsChange={setRows}
      onPaste={onPaste}
    />
  );
}

function setup(groupBy: string[]) {
  render(<TestGrid groupBy={groupBy} />);
}

function getHeaderCellsContent() {
  return getHeaderCells().map((cell) => cell.textContent);
}

test('should not group if groupBy is empty', () => {
  setup([]);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '7');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Sport', 'Country', 'Year', 'Id']);
  expect(getRows()).toHaveLength(6);
});

test('should not group if column does not exist', () => {
  setup(['abc']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '7');
  expect(getRows()).toHaveLength(6);
});

test('should group by single column', () => {
  setup(['country']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '9');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Sport', 'Year', 'Id']);
  expect(getRows()).toHaveLength(4);
});

test('should group by multiple columns', () => {
  setup(['country', 'year']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '13');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Year', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(4);
});

test('should ignore duplicate groupBy columns', () => {
  setup(['year', 'year', 'year']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '10');
  expect(getRows()).toHaveLength(5);
});

test('should use groupBy order while grouping', () => {
  setup(['year', 'country']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '14');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Year', 'Country', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(5);
});

test('should toggle group when group cell is clicked', async () => {
  setup(['year']);
  expect(getRows()).toHaveLength(5);
  const groupCell = screen.getByRole('gridcell', { name: '2021' });
  await userEvent.click(groupCell);
  expect(getRows()).toHaveLength(7);
  await userEvent.click(groupCell);
  expect(getRows()).toHaveLength(5);
});

test('should toggle group using keyboard', async () => {
  setup(['year']);
  expect(getRows()).toHaveLength(5);
  const groupCell = screen.getByRole('gridcell', { name: '2021' });
  await userEvent.click(groupCell);
  expect(getRows()).toHaveLength(7);
  // clicking on the group cell selects the row
  expect(getSelectedCell()).toBeNull();
  expect(getRows()[2]).toHaveClass(rowSelectedClassname);
  await userEvent.keyboard('{arrowright}{arrowright}{enter}');
  expect(getRows()).toHaveLength(5);
  await userEvent.keyboard('{enter}');
  expect(getRows()).toHaveLength(7);
});

test('should set aria-attributes', async () => {
  setup(['year', 'country']);

  const groupCell1 = screen.getByRole('gridcell', { name: '2020' });
  const groupRow1 = groupCell1.parentElement!;
  expect(groupRow1).toHaveAttribute('aria-level', '1');
  expect(groupRow1).toHaveAttribute('aria-setsize', '3');
  expect(groupRow1).toHaveAttribute('aria-posinset', '1');
  expect(groupRow1).toHaveAttribute('aria-rowindex', '3');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  const groupCell2 = screen.getByRole('gridcell', { name: '2021' });
  const groupRow2 = groupCell2.parentElement!;
  expect(groupRow2).toHaveAttribute('aria-level', '1');
  expect(groupRow2).toHaveAttribute('aria-setsize', '3');
  expect(groupRow2).toHaveAttribute('aria-posinset', '2');
  expect(groupRow2).toHaveAttribute('aria-rowindex', '6');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  await userEvent.click(groupCell2);
  expect(groupRow2).toHaveAttribute('aria-expanded', 'true');

  const groupCell3 = screen.getByRole('gridcell', { name: 'Canada' });
  const groupRow3 = groupCell3.parentElement!;
  expect(groupRow3).toHaveAttribute('aria-level', '2');
  expect(groupRow3).toHaveAttribute('aria-setsize', '2');
  expect(groupRow3).toHaveAttribute('aria-posinset', '2');
  expect(groupRow3).toHaveAttribute('aria-rowindex', '9');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  await userEvent.click(groupCell3);
  expect(groupRow3).toHaveAttribute('aria-expanded', 'true');
});

test('should select rows in a group', async () => {
  setup(['year', 'country']);

  const headerCheckbox = screen.getByLabelText('Select All');
  expect(headerCheckbox).not.toBeChecked();

  // expand group
  const groupCell1 = screen.getByRole('gridcell', { name: '2021' });
  await userEvent.click(groupCell1);
  const groupCell2 = screen.getByRole('gridcell', { name: 'Canada' });
  await userEvent.click(groupCell2);

  expect(screen.queryAllByRole('row', { selected: true })).toHaveLength(0);

  // select parent row
  await userEvent.click(within(groupCell1.parentElement!).getByLabelText('Select Group'));
  let selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(4);
  expect(selectedRows[0]).toHaveAttribute('aria-rowindex', '6');
  expect(selectedRows[1]).toHaveAttribute('aria-rowindex', '7');
  expect(selectedRows[2]).toHaveAttribute('aria-rowindex', '9');
  expect(selectedRows[3]).toHaveAttribute('aria-rowindex', '10');

  // unselecting child should unselect the parent row
  await userEvent.click(within(selectedRows[3]).getByLabelText('Select'));
  selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(1);
  expect(selectedRows[0]).toHaveAttribute('aria-rowindex', '7');

  // select child group
  const checkbox = within(groupCell2.parentElement!).getByLabelText('Select Group');
  await userEvent.click(checkbox);
  selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(4);

  // unselect child group
  await userEvent.click(checkbox);
  selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(1);

  await userEvent.click(screen.getByRole('gridcell', { name: '2020' }));
  await userEvent.click(screen.getByRole('gridcell', { name: '2022' }));

  await userEvent.click(headerCheckbox);
  expect(screen.getAllByRole('row', { selected: true })).toHaveLength(8);

  await userEvent.click(headerCheckbox);
  expect(screen.queryByRole('row', { selected: true })).not.toBeInTheDocument();
});

test('cell navigation in a treegrid', async () => {
  setup(['country', 'year']);
  expect(getRows()).toHaveLength(4);
  const focusSink = document.querySelector(`.${focusSinkClassname}`);

  // expand group
  const groupCell1 = screen.getByRole('gridcell', { name: 'USA' });
  expect(document.body).toHaveFocus();
  expect(focusSink).toHaveAttribute('tabIndex', '-1');
  await userEvent.click(groupCell1);
  expect(focusSink).toHaveFocus();
  expect(focusSink).toHaveAttribute('tabIndex', '0');
  expect(focusSink).toHaveStyle('grid-row-start:3');
  expect(focusSink).toHaveClass(rowSelected);
  await userEvent.keyboard('{arrowup}');
  expect(focusSink).toHaveFocus();
  expect(focusSink).toHaveStyle('grid-row-start:2');
  expect(focusSink).toHaveClass(rowSelected);
  await userEvent.keyboard('{arrowup}');
  expect(focusSink).toHaveFocus();
  expect(focusSink).toHaveStyle('grid-row-start:1');
  expect(focusSink).toHaveClass(rowSelected);
  expect(focusSink).toHaveFocus();
  expect(focusSink).toHaveStyle('grid-row-start:1');
  expect(focusSink).toHaveClass(rowSelected);
  await userEvent.keyboard('{arrowdown}');
  expect(focusSink).toHaveFocus();
  expect(focusSink).toHaveStyle('grid-row-start:2');
  expect(focusSink).toHaveClass(rowSelected);
  const groupCell2 = screen.getByRole('gridcell', { name: '2021' });
  await userEvent.click(groupCell2);
  expect(focusSink).toHaveFocus();
  expect(focusSink).toHaveAttribute('tabIndex', '0');

  // select cell
  await userEvent.click(getCellsAtRowIndex(5)[1]);
  expect(getCellsAtRowIndex(5)[1]).toHaveAttribute('aria-selected', 'true');
  expect(focusSink).toHaveAttribute('tabIndex', '-1');

  // select the previous cell
  await userEvent.keyboard('{arrowleft}');
  expect(getCellsAtRowIndex(5)[1]).toHaveAttribute('aria-selected', 'false');
  expect(getCellsAtRowIndex(5)[0]).toHaveAttribute('aria-selected', 'true');

  // if the first cell is selected then arrowleft should select the row
  await userEvent.keyboard('{arrowleft}');
  expect(getCellsAtRowIndex(5)[0]).toHaveAttribute('aria-selected', 'false');
  expect(getRows()[4]).toHaveClass(rowSelectedClassname);
  expect(focusSink).toHaveFocus();

  // if the row is selected then arrowright should select the first cell on the same row
  await userEvent.keyboard('{arrowright}');
  expect(getCellsAtRowIndex(5)[0]).toHaveAttribute('aria-selected', 'true');

  await userEvent.keyboard('{arrowleft}{arrowup}');

  expect(getRows()).toHaveLength(7);

  // left arrow should collapse the group
  await userEvent.keyboard('{arrowleft}');
  expect(getRows()).toHaveLength(6);

  // right arrow should expand the group
  await userEvent.keyboard('{arrowright}');
  expect(getRows()).toHaveLength(7);

  // left arrow on a collapsed group should select the parent group
  expect(getRows()[1]).not.toHaveClass(rowSelectedClassname);
  await userEvent.keyboard('{arrowleft}{arrowleft}');
  expect(getRows()[1]).toHaveClass(rowSelectedClassname);

  await userEvent.keyboard('{end}');
  expect(getRows()[5]).toHaveClass(rowSelectedClassname);

  await userEvent.keyboard('{home}');
  expect(screen.getAllByRole('row')[0]).toHaveClass(rowSelectedClassname);

  // collpase parent group
  await userEvent.keyboard('{arrowdown}{arrowdown}{arrowleft}');
  expect(screen.queryByRole('gridcell', { name: '2021' })).not.toBeInTheDocument();
  expect(getRows()).toHaveLength(4);
});

test('copy/paste when grouping is enabled', async () => {
  setup(['year']);
  await userEvent.click(screen.getByRole('gridcell', { name: '2021' }));
  await userEvent.click(screen.getByRole('gridcell', { name: 'USA' }));
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass('rdg-cell-copied');
  await userEvent.keyboard('{arrowdown}');
  expect(getSelectedCell()).toHaveTextContent('Canada');
  pasteSelectedCell();
  expect(getSelectedCell()).toHaveTextContent('USA');
});

test('update row using cell renderer', async () => {
  setup(['year']);
  await userEvent.click(screen.getByRole('gridcell', { name: '2021' }));
  await userEvent.click(screen.getByRole('gridcell', { name: 'USA' }));
  await userEvent.keyboard('{arrowright}{arrowright}');
  expect(getSelectedCell()).toHaveTextContent('value: 2');
  await userEvent.click(screen.getByRole('button', { name: 'value: 2' }));
  expect(getSelectedCell()).toHaveTextContent('value: 12');
});

test('custom renderGroupCell', () => {
  setup(['country']);
  expect(getCellsAtRowIndex(1)[4]).toHaveTextContent('1');
  expect(getCellsAtRowIndex(4)[4]).toHaveTextContent('3');
});
