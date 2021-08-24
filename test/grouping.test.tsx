import { StrictMode, useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import type { Column } from '../src';
import DataGrid, { SelectColumn, TextEditor } from '../src';
import { render, screen, within } from '@testing-library/react';
import {
  getGrid,
  queryGrid,
  getRows,
  queryTreeGrid,
  getTreeGrid,
  getHeaderCells,
  getCellsAtRowIndex,
  getSelectedCell,
  copySelectedCell,
  pasteSelectedCell
} from './utils';
import userEvent from '@testing-library/user-event';
import type { FillEvent, PasteEvent, Position } from '../src/types';

interface Row {
  id: number;
  country: string;
  year: number;
}

const columns: readonly Column<Row>[] = [
  SelectColumn,
  {
    key: 'sport',
    name: 'Sport'
  },
  {
    key: 'country',
    name: 'Country',
    editor: TextEditor
  },
  {
    key: 'year',
    name: 'Year'
  },
  {
    key: 'id',
    name: 'Id',
    formatter(props) {
      function onClick() {
        props.onRowChange({ ...props.row, id: props.row.id + 10 });
      }

      return <button onClick={onClick}>value: {props.row.id}</button>;
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

function TestGrid({ groupBy }: { groupBy?: string[] }) {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>([])
  );
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  function onFill(event: FillEvent<Row>) {
    return event.targetRow;
  }

  function onPaste(event: PasteEvent<Row>) {
    return {
      ...event.targetRow,
      [event.targetColumnKey]: event.sourceRow[event.sourceColumnKey as keyof Row]
    };
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        groupBy={groupBy}
        rowGrouper={rowGrouper}
        onSelectedCellChange={setSelectedPosition}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        onRowsChange={setRows}
        onFill={onFill}
        onPaste={onPaste}
      />
      <div data-testid="selectedPosition">{JSON.stringify(selectedPosition)}</div>
    </>
  );
}

function setup(groupBy?: string[]) {
  render(
    <StrictMode>
      <TestGrid groupBy={groupBy} />
    </StrictMode>
  );
}

function getHeaderCellsContent() {
  return getHeaderCells().map((cell) => cell.textContent);
}

test('should not group if groupBy is not specified', () => {
  setup();
  expect(queryTreeGrid()).not.toBeInTheDocument();
  expect(getGrid()).toHaveAttribute('aria-rowcount', '5');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Sport', 'Country', 'Year', 'Id']);
  expect(getRows()).toHaveLength(4);
});

test('should not group if column does not exist', () => {
  setup(['abc']);
  expect(getGrid()).toHaveAttribute('aria-rowcount', '5');
  expect(getRows()).toHaveLength(4);
});

test('should group by single column', () => {
  setup(['country']);
  expect(queryGrid()).not.toBeInTheDocument();
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '7');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Sport', 'Year', 'Id']);
  expect(getRows()).toHaveLength(2);
});

test('should group by multiple columns', () => {
  setup(['country', 'year']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '11');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Country', 'Year', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(2);
});

test('should ignore duplicate groupBy columns', () => {
  setup(['year', 'year', 'year']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '8');
  expect(getRows()).toHaveLength(3);
});

test('should use groupBy order while grouping', () => {
  setup(['year', 'country']);
  expect(getTreeGrid()).toHaveAttribute('aria-rowcount', '12');
  expect(getHeaderCellsContent()).toStrictEqual(['', 'Year', 'Country', 'Sport', 'Id']);
  expect(getRows()).toHaveLength(3);
});

test('should toggle group when group cell is clicked', () => {
  setup(['year']);
  expect(getRows()).toHaveLength(3);
  const groupCell = screen.getByRole('gridcell', { name: '2021' });
  userEvent.click(groupCell);
  expect(getRows()).toHaveLength(5);
  userEvent.click(groupCell);
  expect(getRows()).toHaveLength(3);
});

test('should toggle group using keyboard', () => {
  setup(['year']);
  expect(getRows()).toHaveLength(3);
  const groupCell = screen.getByRole('gridcell', { name: '2021' });
  userEvent.click(groupCell);
  expect(getRows()).toHaveLength(5);
  // clicking on the group cell selects the row
  expect(JSON.parse(screen.getByTestId('selectedPosition').textContent!)).toStrictEqual({
    rowIdx: 1,
    idx: -1
  });
  userEvent.keyboard('{arrowright}{arrowright}{enter}');
  expect(getRows()).toHaveLength(3);
  userEvent.keyboard('{enter}');
  expect(getRows()).toHaveLength(5);
});

test('should set aria-attributes', () => {
  setup(['year', 'country']);

  const groupCell1 = screen.getByRole('gridcell', { name: '2020' });
  const groupRow1 = groupCell1.parentElement!;
  expect(groupRow1).toHaveAttribute('aria-level', '1');
  expect(groupRow1).toHaveAttribute('aria-setsize', '3');
  expect(groupRow1).toHaveAttribute('aria-posinset', '1');
  expect(groupRow1).toHaveAttribute('aria-rowindex', '2');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  const groupCell2 = screen.getByRole('gridcell', { name: '2021' });
  const groupRow2 = groupCell2.parentElement!;
  expect(groupRow2).toHaveAttribute('aria-level', '1');
  expect(groupRow2).toHaveAttribute('aria-setsize', '3');
  expect(groupRow2).toHaveAttribute('aria-posinset', '2');
  expect(groupRow2).toHaveAttribute('aria-rowindex', '5');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(groupCell2);
  expect(groupRow2).toHaveAttribute('aria-expanded', 'true');

  const groupCell3 = screen.getByRole('gridcell', { name: 'Canada' });
  const groupRow3 = groupCell3.parentElement!;
  expect(groupRow3).toHaveAttribute('aria-level', '2');
  expect(groupRow3).toHaveAttribute('aria-setsize', '2');
  expect(groupRow3).toHaveAttribute('aria-posinset', '2');
  expect(groupRow3).toHaveAttribute('aria-rowindex', '8');
  expect(groupRow1).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(groupCell3);
  expect(groupRow3).toHaveAttribute('aria-expanded', 'true');
});

test('should select rows in a group', () => {
  setup(['year', 'country']);

  // expand group
  const groupCell1 = screen.getByRole('gridcell', { name: '2021' });
  userEvent.click(groupCell1);
  const groupCell2 = screen.getByRole('gridcell', { name: 'Canada' });
  userEvent.click(groupCell2);

  // eslint-disable-next-line jest-dom/prefer-in-document
  expect(screen.queryAllByRole('row', { selected: true })).toHaveLength(0);

  // select parent row
  userEvent.click(within(groupCell1.parentElement!).getByLabelText('Select Group'));
  let selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(4);
  expect(selectedRows[0]).toHaveAttribute('aria-rowindex', '5');
  expect(selectedRows[1]).toHaveAttribute('aria-rowindex', '6');
  expect(selectedRows[2]).toHaveAttribute('aria-rowindex', '8');
  expect(selectedRows[3]).toHaveAttribute('aria-rowindex', '9');

  // unselecting child should unselect the parent row
  userEvent.click(within(selectedRows[3]).getByLabelText('Select'));
  selectedRows = screen.getAllByRole('row', { selected: true });
  // eslint-disable-next-line jest-dom/prefer-in-document
  expect(selectedRows).toHaveLength(1);
  expect(selectedRows[0]).toHaveAttribute('aria-rowindex', '6');

  // select child group
  userEvent.click(within(groupCell2.parentElement!).getByLabelText('Select Group'));
  selectedRows = screen.getAllByRole('row', { selected: true });
  expect(selectedRows).toHaveLength(4);
});

test('cell navigation in a treegrid', () => {
  setup(['country', 'year']);
  expect(getRows()).toHaveLength(2);

  // expand group
  const groupCell1 = screen.getByRole('gridcell', { name: 'USA' });
  expect(document.body).toHaveFocus();
  expect(getRows()[0]).toHaveAttribute('tabIndex', '-1');
  userEvent.click(groupCell1);
  expect(getRows()[0]).toHaveFocus();
  expect(getRows()[0]).toHaveAttribute('tabIndex', '0');
  const groupCell2 = screen.getByRole('gridcell', { name: '2021' });
  userEvent.click(groupCell2);
  expect(getRows()[0]).toHaveAttribute('tabIndex', '-1');
  expect(getRows()[2]).toHaveFocus();
  expect(getRows()[2]).toHaveAttribute('tabIndex', '0');

  // select cell
  userEvent.click(getCellsAtRowIndex(4)[1]);
  expect(getCellsAtRowIndex(4)[1]).toHaveAttribute('aria-selected', 'true');
  expect(getRows()[2]).toHaveAttribute('tabIndex', '-1');

  // select the previous cell
  userEvent.keyboard('{arrowleft}');
  expect(getCellsAtRowIndex(4)[1]).toHaveAttribute('aria-selected', 'false');
  expect(getCellsAtRowIndex(4)[0]).toHaveAttribute('aria-selected', 'true');

  // if the first cell is selected then arrowleft should select the row
  userEvent.keyboard('{arrowleft}');
  expect(getCellsAtRowIndex(4)[0]).toHaveAttribute('aria-selected', 'false');
  expect(JSON.parse(screen.getByTestId('selectedPosition').textContent!)).toStrictEqual({
    rowIdx: 3,
    idx: -1
  });
  expect(getRows()[3]).toHaveFocus();

  // if the row is selected then arrowright should select the first cell on the same row
  userEvent.keyboard('{arrowright}');
  expect(getCellsAtRowIndex(4)[0]).toHaveAttribute('aria-selected', 'true');

  userEvent.keyboard('{arrowleft}{arrowup}');

  expect(getRows()).toHaveLength(5);

  // left arrow should collapse the group
  userEvent.keyboard('{arrowleft}');
  expect(getRows()).toHaveLength(4);

  // right arrow should expand the group
  userEvent.keyboard('{arrowright}');
  expect(getRows()).toHaveLength(5);

  // left arrow on a collapsed group should select the parent group
  userEvent.keyboard('{arrowleft}{arrowleft}');
  expect(JSON.parse(screen.getByTestId('selectedPosition').textContent!)).toStrictEqual({
    rowIdx: 0,
    idx: -1
  });

  // collpase parent group
  userEvent.keyboard('{arrowleft}');
  expect(screen.queryByRole('gridcell', { name: '2021' })).not.toBeInTheDocument();
  expect(getRows()).toHaveLength(2);
});

test('onFill is not supported when grouping is enabled', () => {
  setup(['year']);
  userEvent.click(screen.getByRole('gridcell', { name: '2021' }));
  userEvent.click(screen.getByRole('gridcell', { name: 'USA' }));
  expect(document.querySelector('.rdg-cell-drag-handle')).not.toBeInTheDocument();
});

test('copy/paste when grouping is enabled', () => {
  setup(['year']);
  userEvent.click(screen.getByRole('gridcell', { name: '2021' }));
  userEvent.click(screen.getByRole('gridcell', { name: 'USA' }));
  copySelectedCell();
  expect(getSelectedCell()).toHaveClass('rdg-cell-copied');
  userEvent.keyboard('{arrowdown}');
  expect(getSelectedCell()).toHaveTextContent('Canada');
  pasteSelectedCell();
  expect(getSelectedCell()).toHaveTextContent('USA');
});

test('update row using formatter', () => {
  setup(['year']);
  userEvent.click(screen.getByRole('gridcell', { name: '2021' }));
  userEvent.click(screen.getByRole('gridcell', { name: 'USA' }));
  userEvent.keyboard('{arrowright}{arrowright}');
  expect(getSelectedCell()).toHaveTextContent('value: 2');
  userEvent.click(screen.getByText('value: 2'));
  expect(getSelectedCell()).toHaveTextContent('value: 12');
});
