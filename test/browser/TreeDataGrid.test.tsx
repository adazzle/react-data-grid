import { useState } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import type { Column } from '../../src';
import { SelectColumn, textEditor, TreeDataGrid } from '../../src';
import { focusSinkClassname } from '../../src/style/core';
import { rowSelected } from '../../src/style/row';
import { getCellsAtRowIndex, getHeaderCells, getRows, getSelectedCell, getTreeGrid } from './utils';

const rowSelectedClassname = 'rdg-row-selected';

interface Row {
  id: number;
  country: string;
  year: number;
}

type SummaryRow = undefined;

const topSummaryRows: readonly SummaryRow[] = [undefined];
const bottomSummaryRows: readonly SummaryRow[] = [undefined];

const columns: readonly Column<Row, SummaryRow>[] = [
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

const onCellCopySpy = vi.fn();
const onCellPasteSpy = vi.fn(({ row }: { row: Row }) => row);

function rowKeyGetter(row: Row) {
  return row.id;
}
function TestGrid({
  groupBy,
  groupIdGetter
}: {
  groupBy: string[];
  groupIdGetter: ((groupKey: string, parentId?: string) => string) | undefined;
}) {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
  const [expandedGroupIds, setExpandedGroupIds] = useState(
    (): ReadonlySet<unknown> => new Set<unknown>([])
  );

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
      onCellCopy={onCellCopySpy}
      onCellPaste={onCellPasteSpy}
      groupIdGetter={groupIdGetter}
    />
  );
}

function rowGrouper(rows: readonly Row[], columnKey: string) {
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.groupBy(rows, (r) => r[columnKey]) as Record<string, readonly R[]>;
}

function setup(groupBy: string[], groupIdGetter?: (groupKey: string, parentId?: string) => string) {
  page.render(<TestGrid groupBy={groupBy} groupIdGetter={groupIdGetter} />);
}

function getHeaderCellsContent() {
  return getHeaderCells().map((cell) => cell.textContent);
}

test('should not group if groupBy is empty', async () => {
  setup([]);
  await expect.element(getTreeGrid()).toHaveAttribute('aria-rowcount', '7');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Sport', 'Country', 'Year', 'Id']);
  expect(getRows()).toHaveLength(6);
});

test('should not group if column does not exist', async () => {
  setup(['abc']);
  await expect.element(getTreeGrid()).toHaveAttribute('aria-rowcount', '7');
  expect(getRows()).toHaveLength(6);
});

test('should group by single column', async () => {
  setup(['country']);
  await expect.element(getTreeGrid()).toHaveAttribute('aria-rowcount', '9');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Sport', 'Year', 'Id']);
  expect(getRows()).toHaveLength(4);
});

test('should group by multiple columns', async () => {
  setup(['country', 'year']);
  await expect.element(getTreeGrid()).toHaveAttribute('aria-rowcount', '13');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Year', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(4);
});

test('should use groupIdGetter when provided', async () => {
  const groupIdGetter = vi.fn((groupKey: string, parentId?: string) =>
    parentId !== undefined ? `${groupKey}#${parentId}` : groupKey
  );
  setup(['country', 'year'], groupIdGetter);
  expect(groupIdGetter).toHaveBeenCalled();
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '13');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Year', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(4);
  groupIdGetter.mockClear();
  await userEvent.click(page.getByRole('gridcell', { name: 'USA' }));
  expect(getRows()).toHaveLength(6);
  expect(groupIdGetter).toHaveBeenCalled();
  await userEvent.click(page.getByRole('gridcell', { name: 'Canada' }));
  expect(getRows()).toHaveLength(8);
  await userEvent.click(page.getByRole('gridcell', { name: '2020' }));
  expect(getRows()).toHaveLength(9);
});

test('should ignore duplicate groupBy columns', async () => {
  setup(['year', 'year', 'year']);
  await expect.element(getTreeGrid()).toHaveAttribute('aria-rowcount', '10');
  expect(getRows()).toHaveLength(5);
});

test('should use groupBy order while grouping', async () => {
  setup(['year', 'country']);
  await expect.element(getTreeGrid()).toHaveAttribute('aria-rowcount', '14');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Year', 'Country', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(5);
});

test('should toggle group when group cell is clicked', async () => {
  setup(['year']);
  expect(getRows()).toHaveLength(5);
  const groupCell = page.getByRole('gridcell', { name: '2021' });
  await userEvent.click(groupCell);
  expect(getRows()).toHaveLength(7);
  await userEvent.click(groupCell);
  expect(getRows()).toHaveLength(5);
});

test('should toggle group using keyboard', async () => {
  setup(['year']);
  expect(getRows()).toHaveLength(5);
  const groupCell = page.getByRole('gridcell', { name: '2021' });
  await userEvent.click(groupCell);
  expect(getRows()).toHaveLength(7);
  // clicking on the group cell selects the row
  await expect.element(getSelectedCell()).not.toBeInTheDocument();
  await expect.element(getRows()[2]).toHaveClass(rowSelectedClassname);
  await userEvent.keyboard('{arrowright}{arrowright}{enter}');
  expect(getRows()).toHaveLength(5);
  await userEvent.keyboard('{enter}');
  expect(getRows()).toHaveLength(7);
});

test('should set aria-attributes', async () => {
  setup(['year', 'country']);

  const groupCell1 = page.getByRole('gridcell', { name: '2020' }).element();
  const groupRow1 = groupCell1.parentElement!;
  expect(groupRow1).toHaveAttribute('aria-level', '1');
  expect(groupRow1).toHaveAttribute('aria-setsize', '3');
  expect(groupRow1).toHaveAttribute('aria-posinset', '1');
  expect(groupRow1).toHaveAttribute('aria-rowindex', '3');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  const groupCell2 = page.getByRole('gridcell', { name: '2021' }).element();
  const groupRow2 = groupCell2.parentElement!;
  expect(groupRow2).toHaveAttribute('aria-level', '1');
  expect(groupRow2).toHaveAttribute('aria-setsize', '3');
  expect(groupRow2).toHaveAttribute('aria-posinset', '2');
  expect(groupRow2).toHaveAttribute('aria-rowindex', '6');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  await userEvent.click(groupCell2);
  expect(groupRow2).toHaveAttribute('aria-expanded', 'true');

  const groupCell3 = page.getByRole('gridcell', { name: 'Canada' }).element();
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

  const headerCheckbox = page.getByRole('checkbox', { name: 'Select All' });
  await expect.element(headerCheckbox).not.toBeChecked();

  // expand group
  const groupCell1 = page.getByRole('gridcell', { name: '2021' }).element();
  await userEvent.click(groupCell1);
  const groupCell2 = page.getByRole('gridcell', { name: 'Canada' }).element();
  await userEvent.click(groupCell2);

  expect(page.getByRole('row', { selected: true }).all()).toHaveLength(0);

  // select parent row
  await userEvent.click(
    page.elementLocator(groupCell1.parentElement!).getByRole('checkbox', { name: 'Select Group' })
  );
  let selectedRows = page.getByRole('row', { selected: true }).all();
  expect(selectedRows).toHaveLength(4);
  await expect.element(selectedRows[0]).toHaveAttribute('aria-rowindex', '6');
  await expect.element(selectedRows[1]).toHaveAttribute('aria-rowindex', '7');
  await expect.element(selectedRows[2]).toHaveAttribute('aria-rowindex', '9');
  await expect.element(selectedRows[3]).toHaveAttribute('aria-rowindex', '10');

  // unselecting child should unselect the parent row
  await userEvent.click(selectedRows[3].getByRole('checkbox', { name: 'Select' }));
  selectedRows = page.getByRole('row', { selected: true }).all();
  expect(selectedRows).toHaveLength(1);
  await expect.element(selectedRows[0]).toHaveAttribute('aria-rowindex', '7');

  // select child group
  const checkbox = page.elementLocator(groupCell2.parentElement!).getByRole('checkbox', {
    name: 'Select Group'
  });
  await userEvent.click(checkbox);
  selectedRows = page.getByRole('row', { selected: true }).all();
  expect(selectedRows).toHaveLength(4);

  // unselect child group
  await userEvent.click(checkbox);
  selectedRows = page.getByRole('row', { selected: true }).all();
  expect(selectedRows).toHaveLength(1);

  await userEvent.click(page.getByRole('gridcell', { name: '2020' }));
  await userEvent.click(page.getByRole('gridcell', { name: '2022' }));

  await userEvent.click(headerCheckbox);
  await expect.element(page.getByRole('row', { selected: true })).not.toBeInTheDocument();

  await userEvent.click(headerCheckbox);
  expect(page.getByRole('row', { selected: true }).all()).toHaveLength(8);

  await userEvent.click(headerCheckbox);
  await expect.element(page.getByRole('row', { selected: true })).not.toBeInTheDocument();
});

test('cell navigation in a treegrid', async () => {
  setup(['country', 'year']);
  expect(getRows()).toHaveLength(4);
  const focusSink = document.querySelector(`.${focusSinkClassname}`);

  // expand group
  const groupCell1 = page.getByRole('gridcell', { name: 'USA' });
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
  const groupCell2 = page.getByRole('gridcell', { name: '2021' });
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
  await expect.element(getRows()[4]).toHaveClass(rowSelectedClassname);
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
  await expect.element(getRows()[1]).not.toHaveClass(rowSelectedClassname);
  await userEvent.keyboard('{arrowleft}{arrowleft}');
  await expect.element(getRows()[1]).toHaveClass(rowSelectedClassname);

  await userEvent.keyboard('{end}');
  await expect.element(getRows()[5]).toHaveClass(rowSelectedClassname);

  await userEvent.keyboard('{home}');
  await expect.element(page.getByRole('row').all()[0]).toHaveClass(rowSelectedClassname);

  // collpase parent group
  await userEvent.keyboard('{arrowdown}{arrowdown}{arrowleft}');
  await expect.element(page.getByRole('gridcell', { name: '2021' })).not.toBeInTheDocument();
  expect(getRows()).toHaveLength(4);
});

test('copy/paste when grouping is enabled', async () => {
  setup(['year']);
  await userEvent.click(page.getByRole('gridcell', { name: '2021' }));
  await userEvent.copy();
  expect(onCellCopySpy).not.toHaveBeenCalled();
  await userEvent.paste();
  expect(onCellPasteSpy).not.toHaveBeenCalled();

  await userEvent.click(page.getByRole('gridcell', { name: 'USA' }));
  await userEvent.copy();
  expect(onCellCopySpy).toHaveBeenCalledExactlyOnceWith(
    {
      column: expect.objectContaining(columns[2]),
      row: {
        country: 'USA',
        id: 2,
        year: 2021
      }
    },
    expect.anything()
  );
  await userEvent.paste();
  expect(onCellPasteSpy).toHaveBeenCalledExactlyOnceWith(
    {
      column: expect.objectContaining(columns[2]),
      row: {
        country: 'USA',
        id: 2,
        year: 2021
      }
    },
    expect.anything()
  );
});

test('update row using cell renderer', async () => {
  setup(['year']);
  await userEvent.click(page.getByRole('gridcell', { name: '2021' }));
  await userEvent.click(page.getByRole('gridcell', { name: 'USA' }));
  await userEvent.keyboard('{arrowright}{arrowright}');
  await expect.element(getSelectedCell()).toHaveTextContent('value: 2');
  await userEvent.click(page.getByRole('button', { name: 'value: 2' }));
  await expect.element(getSelectedCell()).toHaveTextContent('value: 12');
});

test('custom renderGroupCell', () => {
  setup(['country']);
  expect(getCellsAtRowIndex(1)[4]).toHaveTextContent('1');
  expect(getCellsAtRowIndex(4)[4]).toHaveTextContent('3');
});
