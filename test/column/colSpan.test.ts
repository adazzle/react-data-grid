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
    setup({ columns, rows, bottomSummaryRows: [1, 2], topSummaryRows: [1, 2] });
  }

  it('should merges cells', () => {
    setupColSpanGrid();
    // header
    expect(getHeaderCells()).toHaveLength(13);

    // top summary rows
    const topSummarryRow1 = getCellsAtRowIndex(0);
    expect(topSummarryRow1).toHaveLength(14);
    // 7th-8th cells are merged
    expect(topSummarryRow1[7]).toHaveAttribute('aria-colindex', '8');
    expect(topSummarryRow1[7]).toHaveAttribute('aria-colspan', '2');
    expect(topSummarryRow1[7]).toHaveStyle({
      'grid-column-start': '8',
      'grid-column-end': 'span 2'
    });
    expect(getCellsAtRowIndex(1)).toHaveLength(15);

    // rows
    const row1 = getCellsAtRowIndex(3);
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
    const row2 = getCellsAtRowIndex(4);
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

    expect(getCellsAtRowIndex(6)).toHaveLength(14); // colSpan 6 won't work as there are 5 frozen columns
    expect(getCellsAtRowIndex(7)).toHaveLength(10);

    // bottom summary row
    expect(getCellsAtRowIndex(12)).toHaveLength(14);
    expect(getCellsAtRowIndex(13)).toHaveLength(15);
  });

  it('should navigate between merged cells', async () => {
    setupColSpanGrid();
    // header row
    await userEvent.click(getHeaderCells()[7]);
    validateCellPosition(7, 0);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(8, 0);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(11, 0);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(12, 0);
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPosition(7, 0);

    // top summary rows
    await userEvent.click(getCellsAtRowIndex(0)[6]);
    validateCellPosition(6, 1);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(7, 1);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(9, 1);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(10, 1);
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPosition(6, 1);

    // viewport rows
    await userEvent.click(getCellsAtRowIndex(3)[1]);
    validateCellPosition(1, 4);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(2, 4);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(3, 4);
    await userEvent.keyboard('{arrowdown}');
    validateCellPosition(2, 5);
    await userEvent.keyboard('{arrowleft}');
    validateCellPosition(1, 5);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(2, 5);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(5, 5);
    await userEvent.keyboard('{arrowleft}');
    validateCellPosition(2, 5);
    await userEvent.keyboard('{arrowdown}');
    validateCellPosition(2, 6);
    await userEvent.keyboard('{arrowdown}{arrowdown}');
    validateCellPosition(0, 8);
    await userEvent.keyboard('{arrowLeft}');
    validateCellPosition(0, 8);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(5, 8);
    await userEvent.tab({ shift: true });
    await userEvent.tab({ shift: true });
    validateCellPosition(14, 7);
    await userEvent.tab();
    validateCellPosition(0, 8);
    await userEvent.click(getCellsAtRowIndex(10)[11]);
    validateCellPosition(11, 11);
    await userEvent.tab();
    validateCellPosition(12, 11);
    await userEvent.tab();
    validateCellPosition(0, 12);
    await userEvent.tab({ shift: true });
    validateCellPosition(12, 11);

    // bottom summary rows
    await userEvent.click(getCellsAtRowIndex(12)[6]);
    validateCellPosition(6, 13);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(7, 13);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(9, 13);
    await userEvent.keyboard('{arrowright}');
    validateCellPosition(10, 13);
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPosition(6, 13);
  });

  it('should scroll to the merged cell when selected', async () => {
    setupColSpanGrid(30);
    await userEvent.click(getCellsAtRowIndex(10)[23]); // last visible cell (1920/80)
    const spy = jest.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
    const testScrollIntoView = () => {
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
    };
    await navigate(3);
    testScrollIntoView();
    await navigate(1);
    testScrollIntoView(); // should bring the merged cell into view
    validateCellPosition(27, 11);
    await navigate(7);
    testScrollIntoView();
    validateCellPosition(6, 12); // should navigate to the next row
    await navigate(7, true);
    testScrollIntoView();
    validateCellPosition(27, 11); // should navigate to the previous row
    await navigate(27);
    testScrollIntoView();
    await navigate(1);
    testScrollIntoView(); // should only bring 1 cell into view

    async function navigate(count: number, shift = false) {
      for (let i = 0; i < count; i++) {
        await userEvent.tab({ shift });
      }
    }
  });
});
