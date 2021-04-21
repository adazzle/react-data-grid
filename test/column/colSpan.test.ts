import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { setup, getRows, getHeaderCells, getSelectedCell } from '../utils';

describe('colSpan', () => {
  function setupColSpanGrid() {
    const columns: Column<Row>[] = [];
    type Row = number;
    const rows: readonly Row[] = [...Array(10).keys()];

    for (let i = 0; i < 15; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        frozen: i < 5,
        colSpan(args) {
          if (args.type === 'ROW') {
            if (key === '2' && args.row === 2) return 3;
            if (key === '4' && args.row === 4) return 6; // Will not work as colspan includes both frozen and regular columns
            if (key === '0' && args.row === 5) return 5;
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
    const gridRows = getRows();
    const getCells = (rowIdx: number) => within(gridRows[rowIdx]).getAllByRole('gridcell');
    expect(getCells(1)).toHaveLength(14);
    // 7th-8th cells are merged
    expect(getCells(1)[6]).toHaveAttribute('aria-colindex', '7');
    expect(getCells(1)[7]).toHaveAttribute('aria-colindex', '9');
    expect(getCells(1)[6]).toHaveStyle({
      'grid-column-start': '7',
      'grid-column-end': 'span 2'
    });

    // 3rd-5th, 7th-8th cells are merged
    expect(getCells(2)).toHaveLength(12);
    expect(getCells(2)[2]).toHaveAttribute('aria-colindex', '3');
    expect(getCells(2)[3]).toHaveAttribute('aria-colindex', '6');
    expect(getCells(2)[2]).toHaveStyle({
      'grid-column-start': '3',
      'grid-column-end': 'span 3'
    });

    expect(getCells(2)[4]).toHaveAttribute('aria-colindex', '7');
    expect(getCells(2)[5]).toHaveAttribute('aria-colindex', '9');
    expect(getCells(2)[4]).toHaveStyle({
      'grid-column-start': '7',
      'grid-column-end': 'span 2'
    });

    expect(getCells(4)).toHaveLength(14); // colSpan 6 won't work as there are 5 frozen columns
    expect(getCells(5)).toHaveLength(10);
  });

  it('should navigate between merged cells', () => {
    setupColSpanGrid();
    userEvent.click(within(getRows()[1]).getAllByRole('gridcell')[1]);
    testSelectedCell(1, 1);
    userEvent.type(document.activeElement!, '{arrowright}');
    testSelectedCell(1, 2);
    userEvent.type(document.activeElement!, '{arrowright}');
    testSelectedCell(1, 3);
    userEvent.type(document.activeElement!, '{arrowdown}');
    testSelectedCell(2, 2);
    userEvent.type(document.activeElement!, '{arrowleft}');
    testSelectedCell(2, 1);
    userEvent.type(document.activeElement!, '{arrowright}');
    testSelectedCell(2, 2);
    userEvent.type(document.activeElement!, '{arrowright}');
    testSelectedCell(2, 5);
    userEvent.type(document.activeElement!, '{arrowleft}');
    testSelectedCell(2, 2);
    userEvent.type(document.activeElement!, '{arrowdown}');
    testSelectedCell(3, 2);
    userEvent.type(document.activeElement!, '{arrowdown}{arrowdown}');
    testSelectedCell(5, 0);
    userEvent.type(document.activeElement!, '{arrowLeft}');
    testSelectedCell(5, 0);
    userEvent.type(document.activeElement!, '{arrowright}');
    testSelectedCell(5, 5);


    function testSelectedCell(expectedRowIdx: number, expectedColIdx: number) {
      const selectedCell = getSelectedCell();
      expect(selectedCell).toHaveAttribute('aria-colindex', `${expectedColIdx + 1}`);
      expect(selectedCell!.parentElement).toHaveAttribute('aria-rowindex', `${expectedRowIdx + 2}`); // +1 to account for the header row
    }
  });
});
