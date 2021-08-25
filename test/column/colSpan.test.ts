import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { setup, getCellsAtRowIndex, getHeaderCells, validateCellPosition } from '../utils';

describe('colSpan', () => {
  function setupColSpanGrid(colCount = 15) {
    type Row = number;
    const columns: Column<Row, Row>[] = [];
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
          if (args.type === 'SUMMARY' && key === '7' && args.row === 1) {
            return 2;
          }
          return undefined;
        }
      });
    }
    setup({ columns, rows, summaryRows: [1, 2] });
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

    // summary row
    expect(getCellsAtRowIndex(10)).toHaveLength(14);
    expect(getCellsAtRowIndex(11)).toHaveLength(15);
  });

  it('should navigate between merged cells', () => {
    setupColSpanGrid();
    // header row
    userEvent.click(getHeaderCells()[7]);
    validateCellPosition(7, 0);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(8, 0);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(11, 0);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(12, 0);
    userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPosition(7, 0);

    // viewport rows
    userEvent.click(getCellsAtRowIndex(1)[1]);
    validateCellPosition(1, 2);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(2, 2);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(3, 2);
    userEvent.keyboard('{arrowdown}');
    validateCellPosition(2, 3);
    userEvent.keyboard('{arrowleft}');
    validateCellPosition(1, 3);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(2, 3);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(5, 3);
    userEvent.keyboard('{arrowleft}');
    validateCellPosition(2, 3);
    userEvent.keyboard('{arrowdown}');
    validateCellPosition(2, 4);
    userEvent.keyboard('{arrowdown}{arrowdown}');
    validateCellPosition(0, 6);
    userEvent.keyboard('{arrowLeft}');
    validateCellPosition(0, 6);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(5, 6);
    userEvent.tab({ shift: true });
    userEvent.tab({ shift: true });
    validateCellPosition(14, 5);
    userEvent.tab();
    validateCellPosition(0, 6);
    userEvent.click(getCellsAtRowIndex(8)[11]);
    validateCellPosition(11, 9);
    userEvent.tab();
    validateCellPosition(12, 9);
    userEvent.tab();
    validateCellPosition(0, 10);
    userEvent.tab({ shift: true });
    validateCellPosition(12, 9);

    // summary rows
    userEvent.click(getCellsAtRowIndex(10)[6]);
    validateCellPosition(6, 11);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(7, 11);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(9, 11);
    userEvent.keyboard('{arrowright}');
    validateCellPosition(10, 11);
    userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPosition(6, 11);
  });

  it('should scroll to the merged cell when selected', () => {
    setupColSpanGrid(30);
    const grid = screen.getByRole('grid');
    userEvent.click(getCellsAtRowIndex(8)[23]); // last visible cell (1920/80)
    navigate(3);
    expect(grid.scrollLeft).toBe(240);
    navigate(1);
    expect(grid.scrollLeft).toBe(480); // should bring the merged cell into view
    validateCellPosition(27, 9);
    navigate(7);
    expect(grid.scrollLeft).toBe(0);
    validateCellPosition(6, 10); // should navigate to the next row
    navigate(7, true);
    expect(grid.scrollLeft).toBe(480);
    validateCellPosition(27, 9); // should navigate to the previous row
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
