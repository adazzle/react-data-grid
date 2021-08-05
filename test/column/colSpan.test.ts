import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { setup, getCellsAtRowIndex, getHeaderCells, validateCellPosition } from '../utils';

describe('colSpan', () => {
  function setupColSpanGrid(colCount = 15) {
    const columns: Column<Row>[] = [];
    type Row = number;
    const rows: readonly Row[] = [...Array(10).keys()];

    for (let i = 0; i < colCount; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        width: 80,
        frozen: i < 5,
        colSpan(args) {
          if (args.type === 'ROW') {
            if (key === '2' && args.row === 2) return 3;
            if (key === '4' && args.row === 4) return 6; // Will not work as colspan includes both frozen and regular columns
            if (key === '0' && args.row === 5) return 5;
            if (key === `${colCount - 3}` && args.row === 8) return 3;
            if (key === '6' && args.row < 8) return 2;
          }
          if (args.type === 'HEADER' && key === '8') {
            return 3;
          }
          return undefined;
        }
      });
    }
    setup({ columns, rows });
  }

  it('should merges cells', () => {
    setupColSpanGrid();
    // header
    expect(getHeaderCells()).toHaveLength(13);

    // rows
    const row1 = getCellsAtRowIndex(1);
    expect(row1).toHaveLength(14);
    // 7th-8th cells are merged
    expect(row1[6]).toHaveAttribute('aria-colindex', '7');
    expect(row1[6]).toHaveAttribute('aria-colspan', '2');
    expect(row1[6]).toHaveStyle({
      'grid-column-start': '7',
      'grid-column-end': 'span 2'
    });
    expect(row1[7]).toHaveAttribute('aria-colindex', '9');
    expect(row1[7]).not.toHaveAttribute('aria-colspan');

    // 3rd-5th, 7th-8th cells are merged
    const row2 = getCellsAtRowIndex(2);
    expect(row2).toHaveLength(12);
    expect(row2[2]).toHaveAttribute('aria-colindex', '3');
    expect(row2[2]).toHaveStyle({
      'grid-column-start': '3',
      'grid-column-end': 'span 3'
    });
    expect(row2[2]).toHaveAttribute('aria-colspan', '3');
    expect(row2[3]).toHaveAttribute('aria-colindex', '6');
    expect(row2[4]).toHaveAttribute('aria-colindex', '7');
    expect(row2[4]).toHaveStyle({
      'grid-column-start': '7',
      'grid-column-end': 'span 2'
    });
    expect(row2[5]).toHaveAttribute('aria-colindex', '9');

    expect(getCellsAtRowIndex(4)).toHaveLength(14); // colSpan 6 won't work as there are 5 frozen columns
    expect(getCellsAtRowIndex(5)).toHaveLength(10);
  });

  it('should navigate between merged cells', () => {
    setupColSpanGrid();
    userEvent.click(getCellsAtRowIndex(1)[1]);
    validateCellPosition(1, 1);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(2, 1);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(3, 1);
    userEvent.keyboard('{arrowdown}');
    validateCellPosition(2, 2);
    userEvent.keyboard('{arrowleft}');
    validateCellPosition(1, 2);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(2, 2);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(5, 2);
    userEvent.keyboard('{arrowleft}');
    validateCellPosition(2, 2);
    userEvent.keyboard('{arrowdown}');
    validateCellPosition(2, 3);
    userEvent.keyboard('{arrowdown}{arrowdown}');
    validateCellPosition(0, 5);
    userEvent.keyboard('{arrowLeft}');
    validateCellPosition(0, 5);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(5, 5);
    userEvent.tab({ shift: true });
    userEvent.tab({ shift: true });
    validateCellPosition(14, 4);
    userEvent.tab();
    validateCellPosition(0, 5);
    userEvent.click(getCellsAtRowIndex(8)[11]);
    validateCellPosition(11, 8);
    userEvent.tab();
    validateCellPosition(12, 8);
    userEvent.tab();
    validateCellPosition(0, 9);
    userEvent.tab({ shift: true });
    validateCellPosition(12, 8);
  });

  it('should scroll to the merged cell when selected', () => {
    setupColSpanGrid(30);
    const grid = screen.getByRole('grid');
    userEvent.click(getCellsAtRowIndex(8)[23]); // last visible cell (1920/80)
    navigate(3);
    expect(grid.scrollLeft).toBe(240);
    navigate(1);
    expect(grid.scrollLeft).toBe(480); // should bring the merged cell into view
    validateCellPosition(27, 8);
    navigate(7);
    expect(grid.scrollLeft).toBe(0);
    validateCellPosition(6, 9); // should navigate to the next row
    navigate(7, true);
    expect(grid.scrollLeft).toBe(480);
    validateCellPosition(27, 8); // should navigate to the previous row
    navigate(27);
    expect(grid.scrollLeft).toBe(240);
    navigate(1);
    expect(grid.scrollLeft).toBe(320); // should only bring 1 cell into view

    function navigate(count: number, shift = false) {
      for (let i = 0; i < count; i++) {
        userEvent.tab({ shift });
      }
    }
  });
});
