import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import type { Column } from '../src';
import { setup, getSelectedCell } from './utils';

type Row = undefined;

const rows: readonly Row[] = Array(100);

const columns: readonly Column<Row>[] = [
  { key: 'col1', name: 'col1' },
  { key: 'col2', name: 'col2' },
  { key: 'col3', name: 'col3' },
  { key: 'col4', name: 'col4' },
  { key: 'col5', name: 'col5' },
  { key: 'col6', name: 'col6' },
  { key: 'col7', name: 'col7' }
];

function validateCellPosition(x: number, y: number) {
  const cell = getSelectedCell();
  expect(cell).toHaveAttribute('aria-colindex', `${x + 1}`);
  expect(cell!.parentNode).toHaveAttribute('aria-rowindex', `${y + 2}`);
}

test('basic keyboard navigation', () => {
  setup({ columns, rows });

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
  userEvent.type(document.activeElement!, '{arrowdown}');
  validateCellPosition(0, 1);
  userEvent.type(document.activeElement!, '{arrowright}');
  validateCellPosition(1, 1);
  userEvent.type(document.activeElement!, '{arrowup}');
  validateCellPosition(1, 0);
  userEvent.type(document.activeElement!, '{arrowleft}');
  validateCellPosition(0, 0);

  // page {up,down}/home/end navigation
  fireEvent.keyDown(document.activeElement!, { key: 'PageDown' });
  validateCellPosition(0, 29);
  fireEvent.keyDown(document.activeElement!, { key: 'PageDown' });
  validateCellPosition(0, 58);
  fireEvent.keyDown(document.activeElement!, { key: 'PageUp' });
  validateCellPosition(0, 29);
  fireEvent.keyDown(document.activeElement!, { key: 'End' });
  validateCellPosition(6, 29);
  fireEvent.keyDown(document.activeElement!, { key: 'Home' });
  validateCellPosition(0, 29);
  fireEvent.keyDown(document.activeElement!, { key: 'End', ctrlKey: true });
  validateCellPosition(6, 99);
  fireEvent.keyDown(document.activeElement!, { key: 'Home', ctrlKey: true });
  validateCellPosition(0, 0);
});

test('at-bounds basic keyboard navigation', () => {
  setup({ columns, rows });

  // tab into the grid
  userEvent.tab();
  validateCellPosition(0, 0);

  // arrow navigation
  userEvent.type(document.activeElement!, '{arrowup}');
  validateCellPosition(0, 0);
  userEvent.type(document.activeElement!, '{arrowleft}');
  validateCellPosition(0, 0);
  fireEvent.keyDown(document.activeElement!, { key: 'End', ctrlKey: true });
  validateCellPosition(6, 99);
  userEvent.type(document.activeElement!, '{arrowdown}');
  validateCellPosition(6, 99);
  userEvent.type(document.activeElement!, '{arrowright}');
  validateCellPosition(6, 99);

  // page {up,down}/home/end navigation
  fireEvent.keyDown(document.activeElement!, { key: 'End' });
  validateCellPosition(6, 99);
  fireEvent.keyDown(document.activeElement!, { key: 'End', ctrlKey: true });
  validateCellPosition(6, 99);
  fireEvent.keyDown(document.activeElement!, { key: 'PageDown' });
  validateCellPosition(6, 99);
  fireEvent.keyDown(document.activeElement!, { key: 'Home', ctrlKey: true });
  validateCellPosition(0, 0);
  fireEvent.keyDown(document.activeElement!, { key: 'Home' });
  validateCellPosition(0, 0);
  fireEvent.keyDown(document.activeElement!, { key: 'Home', ctrlKey: true });
  validateCellPosition(0, 0);
  fireEvent.keyDown(document.activeElement!, { key: 'PageUp' });
  validateCellPosition(0, 0);

  // shift+tab tabs out of the grid
  userEvent.tab({ shift: true });
  expect(document.body).toHaveFocus();

  // tab at the end of a row selects the first cell on the next row
  userEvent.tab();
  fireEvent.keyDown(document.activeElement!, { key: 'End' });
  userEvent.tab();
  validateCellPosition(0, 1);

  // tab at the end of the grid tabs out of the grid
  fireEvent.keyDown(document.activeElement!, { key: 'End', ctrlKey: true });
  userEvent.tab();
  expect(document.body).toHaveFocus();
});
