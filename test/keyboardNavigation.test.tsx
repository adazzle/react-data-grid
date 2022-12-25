import { StrictMode } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Column } from '../src';
import DataGrid, { SelectColumn } from '../src';
import { useFocusRef } from '../src/hooks';
import { setup, getSelectedCell, validateCellPosition, getCellsAtRowIndex, getGrid } from './utils';

type Row = undefined;

const rows: readonly Row[] = Array(100);
const topSummaryRows: readonly Row[] = [undefined];
const bottomSummaryRows: readonly Row[] = [undefined, undefined];

const columns: readonly Column<Row>[] = [
  SelectColumn,
  { key: 'col2', name: 'col2' },
  { key: 'col3', name: 'col3' },
  { key: 'col4', name: 'col4' },
  { key: 'col5', name: 'col5' },
  { key: 'col6', name: 'col6' },
  { key: 'col7', name: 'col7' }
];

test('keyboard navigation', async () => {
  setup({ columns, rows, topSummaryRows, bottomSummaryRows });

  // no initial selection
  expect(getSelectedCell()).not.toBeInTheDocument();

  // tab into the grid
  await userEvent.tab();
  validateCellPosition(0, 0);

  // tab to the next cell
  await userEvent.tab();
  validateCellPosition(1, 0);

  // tab back to the previous cell
  await userEvent.tab({ shift: true });
  validateCellPosition(0, 0);

  // arrow navigation
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(0, 1);
  await userEvent.keyboard('{arrowright}');
  validateCellPosition(1, 1);
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(1, 2);
  await userEvent.keyboard('{arrowleft}');
  validateCellPosition(0, 2);
  await userEvent.keyboard('{arrowup}');
  validateCellPosition(0, 1);
  await userEvent.keyboard('{arrowup}');
  validateCellPosition(0, 0);

  // page {up,down}
  await userEvent.keyboard('{PageDown}');
  validateCellPosition(0, 26);
  await userEvent.keyboard('{PageDown}');
  validateCellPosition(0, 52);
  await userEvent.keyboard('{PageUp}');
  validateCellPosition(0, 26);

  // home/end navigation
  await userEvent.keyboard('{end}');
  validateCellPosition(6, 26);
  await userEvent.keyboard('{home}');
  validateCellPosition(0, 26);
  await userEvent.keyboard('{Control>}{end}');
  validateCellPosition(6, 103);
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(6, 103);
  await userEvent.keyboard('{arrowright}');
  validateCellPosition(6, 103);
  await userEvent.keyboard('{end}');
  validateCellPosition(6, 103);
  await userEvent.keyboard('{Control>}{end}');
  validateCellPosition(6, 103);
  await userEvent.keyboard('{PageDown}');
  validateCellPosition(6, 103);
  await userEvent.keyboard('{Control>}{home}');
  validateCellPosition(0, 0);
  await userEvent.keyboard('{home}');
  validateCellPosition(0, 0);
  await userEvent.keyboard('{Control>}{home}');
  validateCellPosition(0, 0);
  await userEvent.keyboard('{PageUp}');
  validateCellPosition(0, 0);

  // tab at the end of a row selects the first cell on the next row
  await userEvent.keyboard('{end}');
  await userEvent.tab();
  validateCellPosition(0, 1);

  // shift tab should select the last cell of the previous row
  await userEvent.tab({ shift: true });
  validateCellPosition(6, 0);
});

test('arrow and tab navigation', async () => {
  setup({ columns, rows, bottomSummaryRows });

  // pressing arrowleft on the leftmost cell does nothing
  await userEvent.tab();
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(0, 1);
  await userEvent.keyboard('{arrowleft}');
  validateCellPosition(0, 1);

  // pressing arrowright on the rightmost cell does nothing
  await userEvent.keyboard('{end}');
  validateCellPosition(6, 1);
  await userEvent.keyboard('{arrowright}');
  validateCellPosition(6, 1);

  // pressing tab on the rightmost cell navigates to the leftmost cell on the next row
  await userEvent.tab();
  validateCellPosition(0, 2);

  // pressing shift+tab on the leftmost cell navigates to the rightmost cell on the previous row
  await userEvent.tab({ shift: true });
  validateCellPosition(6, 1);
});

test('grid enter/exit', async () => {
  setup({ columns, rows: Array(5), bottomSummaryRows });

  // no initial selection
  expect(getSelectedCell()).not.toBeInTheDocument();

  // tab into the grid
  await userEvent.tab();
  validateCellPosition(0, 0);

  // shift+tab tabs out of the grid if we are at the first cell
  await userEvent.tab({ shift: true });
  expect(document.body).toHaveFocus();

  await userEvent.tab();
  validateCellPosition(0, 0);

  await userEvent.keyboard('{arrowdown}{arrowdown}');
  validateCellPosition(0, 2);

  // tab should select the last selected cell
  // click outside the grid
  await userEvent.click(document.body);
  await userEvent.tab();
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(0, 3);

  // shift+tab should select the last selected cell
  await userEvent.click(document.body);
  await userEvent.tab({ shift: true });
  await userEvent.keyboard('{arrowup}');
  validateCellPosition(0, 2);

  // tab tabs out of the grid if we are at the last cell
  await userEvent.keyboard('{Control>}{end}');
  await userEvent.tab();
  expect(document.body).toHaveFocus();
});

test('navigation with focusable formatter', async () => {
  setup({ columns, rows: Array(1), bottomSummaryRows });
  await userEvent.tab();
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(0, 1);

  // cell should not set tabIndex to 0 if it contains a focusable formatter
  expect(getSelectedCell()).toHaveAttribute('tabIndex', '-1');
  const checkbox = getSelectedCell()!.querySelector('input');
  expect(checkbox).toHaveFocus();
  expect(checkbox).toHaveAttribute('tabIndex', '0');

  await userEvent.tab();
  validateCellPosition(1, 1);
  // cell should set tabIndex to 0 if it does not have focusable formatter
  expect(getSelectedCell()).toHaveAttribute('tabIndex', '0');
});

test('navigation when header and summary rows have focusable elements', async () => {
  function Test({ id, isCellSelected }: { id: string; isCellSelected: boolean }) {
    const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellSelected);

    return <input ref={ref} tabIndex={tabIndex} id={id} />;
  }

  const columns: readonly Column<Row>[] = [
    {
      key: 'col2',
      name: 'col2',
      headerRenderer(p) {
        return <Test id="header-filter1" isCellSelected={p.isCellSelected} />;
      },
      summaryFormatter(p) {
        return <Test id="summary-formatter1" isCellSelected={p.isCellSelected} />;
      }
    },
    {
      key: 'col3',
      name: 'col3',
      headerRenderer(p) {
        return <Test id="header-filter2" isCellSelected={p.isCellSelected} />;
      },
      summaryFormatter(p) {
        return <Test id="summary-formatter2" isCellSelected={p.isCellSelected} />;
      }
    }
  ];

  setup({ columns, rows: Array(2), bottomSummaryRows });
  await userEvent.tab();

  // should set focus on the header filter
  expect(document.getElementById('header-filter1')).toHaveFocus();

  await userEvent.tab();
  expect(document.getElementById('header-filter2')).toHaveFocus();

  await userEvent.tab();
  validateCellPosition(0, 1);

  await userEvent.tab({ shift: true });
  expect(document.getElementById('header-filter2')).toHaveFocus();

  await userEvent.tab({ shift: true });
  expect(document.getElementById('header-filter1')).toHaveFocus();

  await userEvent.tab();
  await userEvent.tab();
  await userEvent.keyboard('{Control>}{end}{arrowup}{arrowup}');
  validateCellPosition(1, 2);

  await userEvent.tab();
  expect(document.getElementById('summary-formatter1')).toHaveFocus();

  await userEvent.tab();
  expect(document.getElementById('summary-formatter2')).toHaveFocus();

  await userEvent.tab({ shift: true });
  await userEvent.tab({ shift: true });
  validateCellPosition(1, 2);
  expect(getSelectedCell()).toHaveFocus();
});

test('navigation when selected cell not in the viewport', async () => {
  const columns: Column<Row>[] = [SelectColumn];
  for (let i = 0; i < 99; i++) {
    columns.push({ key: `col${i}`, name: `col${i}`, frozen: i < 5 });
  }
  setup({ columns, rows, bottomSummaryRows });
  await userEvent.tab();
  validateCellPosition(0, 0);

  const grid = getGrid();
  await userEvent.keyboard('{Control>}{end}{arrowup}{arrowup}');
  validateCellPosition(99, 100);
  expect(getCellsAtRowIndex(100)).not.toHaveLength(1);

  grid.scrollTop = 0;
  expect(getCellsAtRowIndex(99)).toHaveLength(1);
  await userEvent.keyboard('{arrowup}');
  validateCellPosition(99, 99);
  expect(getCellsAtRowIndex(99)).not.toHaveLength(1);

  grid.scrollLeft = 0;
  await userEvent.keyboard('{arrowdown}');
  validateCellPosition(99, 100);

  await userEvent.keyboard(
    '{home}{arrowright}{arrowright}{arrowright}{arrowright}{arrowright}{arrowright}{arrowright}'
  );
  validateCellPosition(7, 100);
  grid.scrollLeft = 2000;
  await userEvent.keyboard('{arrowleft}');
  validateCellPosition(6, 100);
});

test('reset selected cell when column is removed', async () => {
  const columns: readonly Column<Row>[] = [
    { key: '1', name: '1' },
    { key: '2', name: '2' }
  ];
  const rows = [undefined, undefined];

  function Test({ columns }: { columns: readonly Column<Row>[] }) {
    return <DataGrid columns={columns} rows={rows} />;
  }

  const { rerender } = render(
    <StrictMode>
      <Test columns={columns} />
    </StrictMode>
  );

  await userEvent.tab();
  await userEvent.keyboard('{arrowdown}{arrowright}');
  validateCellPosition(1, 1);

  rerender(
    <StrictMode>
      <Test columns={[columns[0]]} />
    </StrictMode>
  );

  expect(getSelectedCell()).not.toBeInTheDocument();
});

test('reset selected cell when row is removed', async () => {
  const columns: readonly Column<Row>[] = [
    { key: '1', name: '1' },
    { key: '2', name: '2' }
  ];
  const rows = [undefined, undefined];

  function Test({ rows }: { rows: readonly undefined[] }) {
    return <DataGrid columns={columns} rows={rows} />;
  }

  const { rerender } = render(
    <StrictMode>
      <Test rows={rows} />
    </StrictMode>
  );

  await userEvent.tab();
  await userEvent.keyboard('{arrowdown}{arrowdown}{arrowright}');
  validateCellPosition(1, 2);

  rerender(
    <StrictMode>
      <Test rows={[rows[0]]} />
    </StrictMode>
  );

  expect(getSelectedCell()).not.toBeInTheDocument();
});

test('should not change the left and right arrow behavior for right to left languages', async () => {
  setup({ rows, columns, direction: 'rtl' });
  await userEvent.tab();
  validateCellPosition(0, 0);
  await userEvent.tab();
  validateCellPosition(1, 0);
  await userEvent.keyboard('{arrowright}');
  validateCellPosition(0, 0);
  await userEvent.keyboard('{arrowright}');
  validateCellPosition(0, 0);
  await userEvent.keyboard('{arrowleft}');
  validateCellPosition(1, 0);
  await userEvent.keyboard('{arrowleft}');
  validateCellPosition(2, 0);
});
