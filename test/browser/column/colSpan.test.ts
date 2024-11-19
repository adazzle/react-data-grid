import { userEvent } from '@vitest/browser/context';

import type { Column } from '../../../src';
import { getCellsAtRowIndexOld, getHeaderCells, setupNew, validateCellPositionOld } from '../utils';

describe('colSpan', () => {
  function setupColSpanGrid(colCount = 15) {
    type Row = number;
    const columns: Column<Row, Row>[] = [];
    const rows: readonly Row[] = Array.from({ length: 10 }, (_, i) => i);

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
    setupNew({ columns, rows, bottomSummaryRows: [1, 2], topSummaryRows: [1, 2] });
  }

  it('should merges cells', () => {
    setupColSpanGrid();
    // header
    expect(getHeaderCells()).toHaveLength(13);

    // top summary rows
    const topSummarryRow1 = getCellsAtRowIndexOld(0);
    expect(topSummarryRow1).toHaveLength(14);
    // 7th-8th cells are merged
    expect(topSummarryRow1[7]).toHaveAttribute('aria-colindex', '8');
    expect(topSummarryRow1[7]).toHaveAttribute('aria-colspan', '2');
    expect(topSummarryRow1[7]).toHaveStyle({
      'grid-column-start': '8',
      'grid-column-end': '10'
    });
    expect(getCellsAtRowIndexOld(1)).toHaveLength(15);

    // rows
    const row1 = getCellsAtRowIndexOld(3);
    expect(row1).toHaveLength(14);
    // 7th-8th cells are merged
    expect(row1[6]).toHaveAttribute('aria-colindex', '7');
    expect(row1[6]).toHaveAttribute('aria-colspan', '2');
    expect(row1[6]).toHaveStyle({
      'grid-column-start': '7',
      'grid-column-end': '9'
    });
    expect(row1[7]).toHaveAttribute('aria-colindex', '9');
    expect(row1[7]).not.toHaveAttribute('aria-colspan');

    // 3rd-5th, 7th-8th cells are merged
    const row2 = getCellsAtRowIndexOld(4);
    expect(row2).toHaveLength(12);
    expect(row2[2]).toHaveAttribute('aria-colindex', '3');
    expect(row2[2]).toHaveStyle({
      'grid-column-start': '3',
      'grid-column-end': '6'
    });
    expect(row2[2]).toHaveAttribute('aria-colspan', '3');
    expect(row2[3]).toHaveAttribute('aria-colindex', '6');
    expect(row2[4]).toHaveAttribute('aria-colindex', '7');
    expect(row2[4]).toHaveStyle({
      'grid-column-start': '7',
      'grid-column-end': '9'
    });
    expect(row2[5]).toHaveAttribute('aria-colindex', '9');

    expect(getCellsAtRowIndexOld(6)).toHaveLength(14); // colSpan 6 won't work as there are 5 frozen columns
    expect(getCellsAtRowIndexOld(7)).toHaveLength(10);

    // bottom summary row
    expect(getCellsAtRowIndexOld(12)).toHaveLength(14);
    expect(getCellsAtRowIndexOld(13)).toHaveLength(15);
  });

  it('should navigate between merged cells', async () => {
    setupColSpanGrid();
    // header row
    await userEvent.click(getHeaderCells()[7]);
    validateCellPositionOld(7, 0);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(8, 0);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(11, 0);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(12, 0);
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPositionOld(7, 0);

    // top summary rows
    await userEvent.click(getCellsAtRowIndexOld(0)[6]);
    validateCellPositionOld(6, 1);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(7, 1);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(9, 1);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(10, 1);
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPositionOld(6, 1);

    // viewport rows
    await userEvent.click(getCellsAtRowIndexOld(3)[1]);
    validateCellPositionOld(1, 4);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(2, 4);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(3, 4);
    await userEvent.keyboard('{arrowdown}');
    validateCellPositionOld(2, 5);
    await userEvent.keyboard('{arrowleft}');
    validateCellPositionOld(1, 5);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(2, 5);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(5, 5);
    await userEvent.keyboard('{arrowleft}');
    validateCellPositionOld(2, 5);
    await userEvent.keyboard('{arrowdown}');
    validateCellPositionOld(2, 6);
    await userEvent.keyboard('{arrowdown}{arrowdown}');
    validateCellPositionOld(0, 8);
    await userEvent.keyboard('{arrowLeft}');
    validateCellPositionOld(0, 8);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(5, 8);
    await userEvent.tab({ shift: true });
    await userEvent.tab({ shift: true });
    validateCellPositionOld(14, 7);
    await userEvent.tab();
    validateCellPositionOld(0, 8);
    await userEvent.click(getCellsAtRowIndexOld(10)[11]);
    validateCellPositionOld(11, 11);
    await userEvent.tab();
    validateCellPositionOld(12, 11);
    await userEvent.tab();
    validateCellPositionOld(0, 12);
    await userEvent.tab({ shift: true });
    validateCellPositionOld(12, 11);

    // bottom summary rows
    await userEvent.click(getCellsAtRowIndexOld(12)[6]);
    validateCellPositionOld(6, 13);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(7, 13);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(9, 13);
    await userEvent.keyboard('{arrowright}');
    validateCellPositionOld(10, 13);
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    validateCellPositionOld(6, 13);
  });

  it('should scroll to the merged cell when selected', async () => {
    setupColSpanGrid(30);
    await userEvent.click(getCellsAtRowIndexOld(10)[23]); // last visible cell (1920/80)
    const spy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
    const testScrollIntoView = () => {
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
    };
    await navigate(3);
    testScrollIntoView();
    await navigate(1);
    testScrollIntoView(); // should bring the merged cell into view
    validateCellPositionOld(27, 11);
    await navigate(7);
    testScrollIntoView();
    validateCellPositionOld(6, 12); // should navigate to the next row
    await navigate(7, true);
    testScrollIntoView();
    validateCellPositionOld(27, 11); // should navigate to the previous row
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
