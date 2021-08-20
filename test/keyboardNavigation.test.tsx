import userEvent from '@testing-library/user-event';
import type { Column } from '../src';
import { SelectColumn } from '../src';
import { setup, getSelectedCell, validateCellPosition, getCellsAtRowIndex, getGrid } from './utils';

type Row = undefined;

const rows: readonly Row[] = Array(100);
const summaryRows: readonly Row[] = [undefined, undefined];

const columns: readonly Column<Row>[] = [
  SelectColumn,
  { key: 'col2', name: 'col2' },
  { key: 'col3', name: 'col3' },
  { key: 'col4', name: 'col4' },
  { key: 'col5', name: 'col5' },
  { key: 'col6', name: 'col6' },
  { key: 'col7', name: 'col7' }
];

test('keyboard navigation', () => {
  setup({ columns, rows, summaryRows });

  // no initial selection
  expect(getSelectedCell()).not.toBeInTheDocument();

  // tab into the grid
  userEvent.tab();
  validateCellPosition(0, 0);

  // tab to the next cell
  userEvent.tab();
  validateCellPosition(1, 0);

  // tab back to the previous cell
  userEvent.tab({ shift: true });
  validateCellPosition(0, 0);

  // arrow navigation
  userEvent.keyboard('{arrowdown}');
  validateCellPosition(0, 1);
  userEvent.keyboard('{arrowright}');
  validateCellPosition(1, 1);
  userEvent.keyboard('{arrowup}');
  validateCellPosition(1, 0);
  userEvent.keyboard('{arrowleft}');
  validateCellPosition(0, 0);

  // page {up,down}
  userEvent.keyboard('{PageDown}');
  validateCellPosition(0, 27);
  userEvent.keyboard('{PageDown}');
  validateCellPosition(0, 54);
  userEvent.keyboard('{PageUp}');
  validateCellPosition(0, 27);

  // home/end navigation
  userEvent.keyboard('{end}');
  validateCellPosition(6, 27);
  userEvent.keyboard('{home}');
  validateCellPosition(0, 27);
  userEvent.keyboard('{ctrl}{end}');
  validateCellPosition(6, 99);
  userEvent.keyboard('{arrowdown}');
  validateCellPosition(6, 99);
  userEvent.keyboard('{arrowright}');
  validateCellPosition(6, 99);
  userEvent.keyboard('{end}');
  validateCellPosition(6, 99);
  userEvent.keyboard('{ctrl}{end}');
  validateCellPosition(6, 99);
  userEvent.keyboard('{PageDown}');
  validateCellPosition(6, 99);
  userEvent.keyboard('{ctrl}{home}');
  validateCellPosition(0, 0);
  userEvent.keyboard('{home}');
  validateCellPosition(0, 0);
  userEvent.keyboard('{ctrl}{home}');
  validateCellPosition(0, 0);
  userEvent.keyboard('{PageUp}');
  validateCellPosition(0, 0);

  // tab at the end of a row selects the first cell on the next row
  userEvent.keyboard('{end}');
  userEvent.tab();
  validateCellPosition(0, 1);

  // shift tab should select the last cell of the previous row
  userEvent.tab({ shift: true });
  validateCellPosition(6, 0);
});

test('grid enter/exit', () => {
  setup({ columns, rows: Array(5), summaryRows });

  // no initial selection
  expect(getSelectedCell()).not.toBeInTheDocument();

  // tab into the grid
  userEvent.tab();
  validateCellPosition(0, 0);

  // shift+tab tabs out of the grid if we are at the first cell
  userEvent.tab({ shift: true });
  expect(document.body).toHaveFocus();

  userEvent.tab();
  validateCellPosition(0, 0);

  userEvent.keyboard('{arrowdown}{arrowdown}');
  validateCellPosition(0, 2);

  // tab should select the last selected cell
  // click outside the grid
  userEvent.click(document.body);
  userEvent.tab();
  userEvent.keyboard('{arrowdown}');
  validateCellPosition(0, 3);

  // shift+tab should select the last selected cell
  userEvent.click(document.body);
  userEvent.tab({ shift: true });
  userEvent.keyboard('{arrowup}');
  validateCellPosition(0, 2);

  // tab tabs out of the grid if we are at the last cell
  userEvent.keyboard('{ctrl}{end}');
  userEvent.tab();
  expect(document.body).toHaveFocus();
});

test('navigation with focusable formatter', () => {
  setup({ columns, rows: Array(1), summaryRows });
  userEvent.tab();
  validateCellPosition(0, 0);

  // cell should not set tabIndex to 0 if it contains a focusable formatter
  expect(getSelectedCell()).toHaveAttribute('tabIndex', '-1');
  const checkbox = getSelectedCell()!.querySelector('input');
  expect(checkbox).toHaveFocus();
  expect(checkbox).toHaveAttribute('tabIndex', '0');

  userEvent.tab();
  validateCellPosition(1, 0);
  // cell should set tabIndex to 0 if it does not have focusable formatter
  expect(getSelectedCell()).toHaveAttribute('tabIndex', '0');
});

test('navigation when header and summary rows have focusable elements', () => {
  const columns: readonly Column<Row>[] = [
    SelectColumn,
    {
      key: 'col2',
      name: 'col2',
      headerRenderer() {
        return <input id="header-filter1" />;
      },
      summaryFormatter() {
        return <input id="summary-formatter1" />;
      }
    },
    {
      key: 'col3',
      name: 'col3',
      headerRenderer() {
        return <input id="header-filter2" />;
      },
      summaryFormatter() {
        return <input id="summary-formatter2" />;
      }
    }
  ];

  setup({ columns, rows: Array(2), summaryRows });
  userEvent.tab();
  // should set focus on the header filter
  expect(document.getElementById('header-filter1')).toHaveFocus();

  userEvent.tab();
  expect(document.getElementById('header-filter2')).toHaveFocus();

  userEvent.tab();
  validateCellPosition(0, 0);

  userEvent.tab({ shift: true });
  expect(document.getElementById('header-filter2')).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(document.getElementById('header-filter1')).toHaveFocus();

  userEvent.tab();
  userEvent.tab();
  userEvent.keyboard('{ctrl}{end}');
  validateCellPosition(2, 1);

  userEvent.tab();
  expect(document.getElementById('summary-formatter1')).toHaveFocus();

  userEvent.tab();
  expect(document.getElementById('summary-formatter2')).toHaveFocus();

  userEvent.tab({ shift: true });
  userEvent.tab({ shift: true });
  validateCellPosition(2, 1);
  expect(getSelectedCell()).toHaveFocus();
});

test('navigation when selected cell not in the viewport', () => {
  const columns: Column<Row>[] = [SelectColumn];
  for (let i = 0; i < 99; i++) {
    columns.push({ key: `col${i}`, name: `col${i}`, frozen: i < 5 });
  }
  setup({ columns, rows, summaryRows });
  userEvent.tab();
  validateCellPosition(0, 0);

  const grid = getGrid();
  userEvent.keyboard('{ctrl}{end}');
  validateCellPosition(99, 99);
  expect(getCellsAtRowIndex(99)).not.toHaveLength(1);

  grid.scrollTop = 0;
  expect(getCellsAtRowIndex(99)).toHaveLength(1);
  userEvent.keyboard('{arrowup}');
  validateCellPosition(99, 98);
  expect(getCellsAtRowIndex(99)).not.toHaveLength(1);

  grid.scrollLeft = 0;
  userEvent.keyboard('{arrowdown}');
  validateCellPosition(99, 99);

  userEvent.keyboard(
    '{home}{arrowright}{arrowright}{arrowright}{arrowright}{arrowright}{arrowright}{arrowright}'
  );
  validateCellPosition(7, 99);
  grid.scrollLeft = 2000;
  userEvent.keyboard('{arrowleft}');
  validateCellPosition(6, 99);
});
