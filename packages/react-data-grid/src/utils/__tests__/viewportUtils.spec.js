import { getGridState, getNonFrozenRenderedColumnCount, getVisibleBoundaries, getNonFrozenVisibleColStartIdx, getScrollDirection, SCROLL_DIRECTION, getRowOverscanStartIdx, getRowOverscanEndIdx, OVERSCAN_ROWS, getColOverscanStartIdx, getColOverscanEndIdx } from '../viewportUtils';

describe('viewportUtils', () => {
  const getColumns = () => [{ width: 100, left: 0 }, { width: 100, left: 200 }, { width: 100, left: 300 }, { width: 100, left: 400 }, { width: 100, left: 500 }, { width: 100, left: 600 }];
  describe('getGridState', () => {
    const getState = (propsOverrides = {}) => {
      const props = Object.assign({
        columnMetrics: {
          columns: [
            { key: 'col1' },
            { key: 'col2' }
          ]
        },
        minHeight: 100,
        rowOffsetHeight: 5,
        rowHeight: 20,
        rowsCount: 100
      }, propsOverrides);
      const state = getGridState(props);

      return { props, state };
    };

    it('should correctly set canvas height', () => {
      const { state } = getState();
      expect(state.height).toBe(95);
    });

    it('should correctly set visible rows count when rowsCount is greater than the rendered rows count', () => {
      const { state } = getState();
      expect(state.rowOverscanEndIdx).toBe(8);
    });

    it('should correctly set visible rows count when rowsCount is less than the rendered rows count', () => {
      const { state } = getState({ rowsCount: 8 });
      expect(state.rowOverscanEndIdx).toBe(8);
    });

    it('should correctly set visible column count', () => {
      const { state, props } = getState();
      expect(state.colVisibleEndIdx).toBe(props.columnMetrics.columns.length);
    });
  });

  describe('getNonFrozenRenderedColumnCount', () => {
    const viewportWidth = 100;

    const getCols = () => [
      { key: 'col1', width: 20, left: 0 },
      { key: 'col2', width: 20, left: 20 },
      { key: 'col3', width: 20, left: 40 },
      { key: 'col4', width: 20, left: 60 },
      { key: 'col5', width: 20, left: 80 },
      { key: 'col6', width: 1, left: 100 },
      { key: 'col7', width: 1, left: 101 },
      { key: 'col8', width: 1, left: 102 },
      { key: 'col9', width: 1, left: 103 }
    ];

    const verifyNonFrozenRenderedColumnCount = (width = viewportWidth, columns = getCols(), scrollLeft = 0) => {
      const columnMetrics = {
        columns,
        totalWidth: 0
      };
      return getNonFrozenRenderedColumnCount(columnMetrics, width, scrollLeft);
    };

    it('correctly set rendered columns count for a set width', () => {
      const count = verifyNonFrozenRenderedColumnCount();
      expect(count).toBe(5); // col1, col2, col3, col4, col5
    });

    it('should return all columns that fit width after last frozen column', () => {
      const columns = getCols();
      columns[1].frozen = true;
      const count = verifyNonFrozenRenderedColumnCount(100, columns);
      expect(count).toBe(3); // col3, col4, col5
    });

    it('should return all columns that fit width after last frozen column when grid is scrolled', () => {
      // 10 px of first non frozen column are hidden, with remaining 10 px visible
      const scrollLeft = 50;
      // This means that there are 10px of extra space to fill with columns
      const columns =  getCols();
      columns[1].frozen = true;
      const count = verifyNonFrozenRenderedColumnCount(100, columns, scrollLeft);
      expect(count).toBe(5); // col5, col6, col7, col8, col9
    });
  });

  describe('getVisibleBoundaries', () => {
    const GRID_HEIGHT = 350;
    const ROW_HEIGHT = 35;
    const TOTAL_ROWS = 100;
    const EXPECTED_NUMBER_VISIBLE_ROWS = 10;

    describe('When scroll top is 0', () => {
      it('should set the rowVisibleStartIdx to be 0', () => {
        const scrollTop = 0;
        const { rowVisibleStartIdx } = getVisibleBoundaries(GRID_HEIGHT, ROW_HEIGHT, scrollTop, TOTAL_ROWS);
        expect(rowVisibleStartIdx).toBe(0);
      });

      it('should set the rowVisibleEndIdx to be last rendered row', () => {
        const scrollTop = 0;
        const { rowVisibleEndIdx } = getVisibleBoundaries(GRID_HEIGHT, ROW_HEIGHT, scrollTop, TOTAL_ROWS);
        expect(rowVisibleEndIdx).toBe(EXPECTED_NUMBER_VISIBLE_ROWS);
      });
    });

    describe('When scrolling', () => {
      const scrollDown = (getScrollTop, assert) => {
        const NUMBER_OF_TESTS = 10;
        for (let n = 1; n < NUMBER_OF_TESTS; n++) {
          const boundaries = getVisibleBoundaries(GRID_HEIGHT, ROW_HEIGHT, getScrollTop(n), TOTAL_ROWS);
          assert(n, boundaries);
        }
      };
      describe('When incrementing scroll by n*rowHeight', () => {
        it('should increase rowVisibleStartIdx by n rows', () => {
          const getScrollTop = n => n * ROW_HEIGHT;
          scrollDown(getScrollTop, (n, { rowVisibleStartIdx }) => {
            expect(rowVisibleStartIdx).toBe(n);
          });
        });

        it('should increase rowVisibleEndIdx by (n + total rendered rows)', () => {
          const getScrollTop = n => n * ROW_HEIGHT;
          scrollDown(getScrollTop, (n, { rowVisibleEndIdx }) => {
            expect(rowVisibleEndIdx).toBe(EXPECTED_NUMBER_VISIBLE_ROWS + n);
          });
        });
      });

      describe('When incrementing scroll by a decimal number within 0.5 buffer of n*rowHeight', () => {
        it('should increase rowVisibleEndIdx by (n + total rendered rows)', () => {
          const clientScrollError = 0.5;
          const getScrollTop = n => (n * ROW_HEIGHT) - clientScrollError;
          scrollDown(getScrollTop, (n, { rowVisibleEndIdx }) => {
            expect(rowVisibleEndIdx).toBe(EXPECTED_NUMBER_VISIBLE_ROWS + n);
          });
        });

        it('should increase rowVisibleEndIdx by n rows', () => {
          const clientScrollError = 0.5;
          const getScrollTop = n => (n * ROW_HEIGHT) - clientScrollError;
          scrollDown(getScrollTop, (n, { rowVisibleStartIdx }) => {
            expect(rowVisibleStartIdx).toBe(n);
          });
        });
      });
    });

    describe('getNonFrozenVisibleColStartIdx', () => {
      it('should return 0 if no frozen columns and grid not scrolled left', () => {
        const scrollLeft = 0;
        const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(0);
      });

      it('should return first fully visible column when scrolled left', () => {
        const scrollLeft = 100;
        const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(1);
      });

      it('should return first partially visible column when scrolled left (left bound)', () => {
        const scrollLeft = 99;
        const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(0);
      });

      it('should return first partially visible column when scrolled left (right bound)', () => {
        const scrollLeft = 101;
        const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(1);
      });

      const expectIdxWhenColumsFrozen = (scrollLeft) => {
        const columns = getColumns();
        columns[1].frozen = true;
        const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(columns, scrollLeft);
        return expect(colVisibleStartIdx);
      };

      it('should return first non frozen column that appears after last frozen column', () => {
        const scrollLeft = 0;
        expectIdxWhenColumsFrozen(scrollLeft).toBe(2);
      });

      it('should return first fully visible non frozen column that appears after last frozen column when scrolled left', () => {
        const scrollLeft = 200;
        expectIdxWhenColumsFrozen(scrollLeft).toBe(4);
      });

      it('should return first partially visible non frozen column that appears after last frozen column when scrolled left', () => {
        const scrollLeft = 201;
        expectIdxWhenColumsFrozen(scrollLeft).toBe(4);
      });

      it('should return first partially visible non frozen column that appears after last frozen column when scrolled left', () => {
        const scrollLeft = 199;
        expectIdxWhenColumsFrozen(scrollLeft).toBe(3);
      });
    });

    describe('getScrollDirection', () => {
      it('should return SCROLL_DIRECTION.DOWN iF previous scrollTop is less than current scrollTop', () => {
        const prevScroll = { scrollTop: 100 };
        const currentScrollTop = 200;
        const currentScrollLeft = 0;
        expect(getScrollDirection(prevScroll, currentScrollTop, currentScrollLeft)).toBe(SCROLL_DIRECTION.DOWN);
      });

      it('should return SCROLL_DIRECTION.UP iF previous scrollTop is greater than current scrollTop', () => {
        const prevScroll = { scrollTop: 200 };
        const currentScrollTop = 0;
        const currentScrollLeft = 0;
        expect(getScrollDirection(prevScroll, currentScrollTop, currentScrollLeft)).toBe(SCROLL_DIRECTION.UP);
      });

      it('should return SCROLL_DIRECTION.RIGHT iF previous scrollLeft is less than current scrollLeft', () => {
        const prevScroll = { scrollLeft: 200 };
        const currentScrollTop = 0;
        const currentScrollLeft = 400;
        expect(getScrollDirection(prevScroll, currentScrollTop, currentScrollLeft)).toBe(SCROLL_DIRECTION.RIGHT);
      });

      it('should return SCROLL_DIRECTION.LEFT iF previous scrollLeft is greater than current scrollLeft', () => {
        const prevScroll = { scrollLeft: 200 };
        const currentScrollTop = 0;
        const currentScrollLeft = 0;
        expect(getScrollDirection(prevScroll, currentScrollTop, currentScrollLeft)).toBe(SCROLL_DIRECTION.LEFT);
      });

      it('should return SCROLL_DIRECTION.NONE if current scroll is equal to previous scroll', () => {
        const prevScroll = { scrollLeft: 200, scrollTop: 0 };
        const currentScrollTop = 0;
        const currentScrollLeft = 200;
        expect(getScrollDirection(prevScroll, currentScrollTop, currentScrollLeft)).toBe(SCROLL_DIRECTION.NONE);
      });
    });

    describe('getRowOverscanStartIdx', () => {
      const rowVisibleStartIdx = 2;
      it('should return rowVisibleStartIdx - OVERSCAN_ROWS if scroll direction is upwards', () => {
        expect(getRowOverscanStartIdx(SCROLL_DIRECTION.UP, rowVisibleStartIdx)).toBe(rowVisibleStartIdx - OVERSCAN_ROWS);
      });

      it('should return rowVisibleStartIdx if scroll direction is left', () => {
        expect(getRowOverscanStartIdx(SCROLL_DIRECTION.LEFT, rowVisibleStartIdx)).toBe(rowVisibleStartIdx);
      });

      it('should return rowVisibleStartIdx if scroll direction is right', () => {
        expect(getRowOverscanStartIdx(SCROLL_DIRECTION.RIGHT, rowVisibleStartIdx)).toBe(rowVisibleStartIdx);
      });

      it('should return rowVisibleStartIdx if scroll direction is downwards', () => {
        expect(getRowOverscanStartIdx(SCROLL_DIRECTION.DOWN, rowVisibleStartIdx)).toBe(rowVisibleStartIdx);
      });

      it('should return 0 if rowVisibleStartIdx negative', () => {
        expect(getRowOverscanStartIdx(SCROLL_DIRECTION.DOWN, -1)).toBe(0);
      });
    });

    describe('getRowOverscanEndIdx', () => {
      const rowVisibleEndIdx = 20;
      const totalNumberOfRows = 30;
      it('should return rowVisibleStartIdx + OVERSCAN_ROWS if scroll direction is downward', () => {
        expect(getRowOverscanEndIdx(SCROLL_DIRECTION.DOWN, rowVisibleEndIdx, totalNumberOfRows)).toBe(rowVisibleEndIdx + OVERSCAN_ROWS);
      });

      it('should return totalNumberOfRows if scroll direction is downward and rowVisibleEndIdx == totalNumberRows', () => {
        expect(getRowOverscanEndIdx(SCROLL_DIRECTION.DOWN, totalNumberOfRows, totalNumberOfRows)).toBe(totalNumberOfRows);
      });

      it('should return rowVisibleEndIdx if scroll direction is left', () => {
        expect(getRowOverscanEndIdx(SCROLL_DIRECTION.LEFT, rowVisibleEndIdx, totalNumberOfRows)).toBe(rowVisibleEndIdx);
      });

      it('should return rowVisibleEndIdx if scroll direction is right', () => {
        expect(getRowOverscanEndIdx(SCROLL_DIRECTION.RIGHT, rowVisibleEndIdx, totalNumberOfRows)).toBe(rowVisibleEndIdx);
      });

      it('should return rowVisibleEndIdx if scroll direction is upwards', () => {
        expect(getRowOverscanEndIdx(SCROLL_DIRECTION.UP, rowVisibleEndIdx, totalNumberOfRows)).toBe(rowVisibleEndIdx);
      });
    });

    describe('getColOverscanStartIdx', () => {
      const colVisibleStartIdx = 5;
      const lastFrozenColumnIdx = -1;
      it('should return colVisibleStartIdx if scroll direction is downward', () => {
        expect(getColOverscanStartIdx(SCROLL_DIRECTION.DOWN, colVisibleStartIdx, lastFrozenColumnIdx)).toBe(colVisibleStartIdx);
      });

      it('should return colVisibleStartIdx if scroll direction is upwards', () => {
        expect(getColOverscanStartIdx(SCROLL_DIRECTION.UP, colVisibleStartIdx, lastFrozenColumnIdx)).toBe(colVisibleStartIdx);
      });

      it('should return 0 if scroll direction is left', () => {
        expect(getColOverscanStartIdx(SCROLL_DIRECTION.LEFT, colVisibleStartIdx, lastFrozenColumnIdx)).toBe(0);
      });

      it('should return 0 if scroll direction is right', () => {
        expect(getColOverscanStartIdx(SCROLL_DIRECTION.RIGHT, colVisibleStartIdx, lastFrozenColumnIdx)).toBe(0);
      });
    });

    describe('getColOverscanEndIdx', () => {
      const colVisibleEndIdx = 20;
      const totalNumberOfColumns = 30;
      it('should return colVisibleStartIdx if scroll direction is downward', () => {
        expect(getColOverscanEndIdx(SCROLL_DIRECTION.DOWN, colVisibleEndIdx, totalNumberOfColumns)).toBe(colVisibleEndIdx);
      });

      it('should return colVisibleEndIdx if scroll direction is upwards', () => {
        expect(getColOverscanEndIdx(SCROLL_DIRECTION.UP, colVisibleEndIdx, totalNumberOfColumns)).toBe(colVisibleEndIdx);
      });

      it('should return totalNumberOfColumns if scroll direction is left', () => {
        expect(getColOverscanEndIdx(SCROLL_DIRECTION.LEFT, colVisibleEndIdx, totalNumberOfColumns)).toBe(totalNumberOfColumns);
      });

      it('should return totalNumberOfColumns if scroll direction is right', () => {
        expect(getColOverscanEndIdx(SCROLL_DIRECTION.RIGHT, colVisibleEndIdx, totalNumberOfColumns)).toBe(totalNumberOfColumns);
      });
    });
  });
});
