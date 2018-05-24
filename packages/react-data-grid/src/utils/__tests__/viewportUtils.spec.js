import { getGridState, getNextScrollState, getRenderedColumnCount, getVisibleBoundaries } from '../viewportUtils';

describe('viewportUtils', () => {
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
      expect(state.displayEnd).toBe(16);
    });

    it('should correctly set visible rows count when rowsCount is less than the rendered rows count', () => {
      const { state } = getState({ rowsCount: 10 });
      expect(state.displayEnd).toBe(10);
    });

    it('should correctly set visible column count', () => {
      const { state, props } = getState();
      expect(state.colVisibleEnd).toBe(props.columnMetrics.columns.length);
    });
  });

  describe('getRenderedColumnCount', () => {
    const fakeGetDOMNodeOffsetWidth = jasmine.createSpy('getDOMNodeOffsetWidth').and.returnValue(50);
    const getColumnCount = (width) => {
      return getRenderedColumnCount({
        columnMetrics: {
          columns: [
            { key: 'col1', width: 5 },
            { key: 'col2', width: 12 }
          ],
          totalWidth: 0
        }
      }, fakeGetDOMNodeOffsetWidth, 0, width);
    };

    beforeEach(() => {
      fakeGetDOMNodeOffsetWidth.calls.reset();
    });

    it('correctly set rendered columns count if width is 0', () => {
      const count = getColumnCount(0);
      expect(fakeGetDOMNodeOffsetWidth).toHaveBeenCalled();
      expect(count).toBe(2);
    });

    it('correctly set rendered columns count if width is greater than 0', () => {
      const count = getColumnCount(4);
      expect(fakeGetDOMNodeOffsetWidth).not.toHaveBeenCalled();
      expect(count).toBe(1);
    });
  });

  describe('getVisibleBoundaries', () => {
    const GRID_HEIGHT = 350;
    const ROW_HEIGHT = 35;
    const TOTAL_ROWS = 100;
    const EXPECTED_NUMBER_VISIBLE_ROWS = 10;

    describe('When scroll top is 0', () => {
      it('should set the visibleStart to be 0', () => {
        const scrollTop = 0;
        const { visibleStart } = getVisibleBoundaries(GRID_HEIGHT, ROW_HEIGHT, scrollTop, TOTAL_ROWS);
        expect(visibleStart).toBe(0);
      });

      it('should set the visibleEnd to be last rendered row', () => {
        const scrollTop = 0;
        const { visibleEnd } = getVisibleBoundaries(GRID_HEIGHT, ROW_HEIGHT, scrollTop, TOTAL_ROWS);
        expect(visibleEnd).toBe(EXPECTED_NUMBER_VISIBLE_ROWS);
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
        it('should increase visibleStart by n rows', () => {
          const getScrollTop = n => n * ROW_HEIGHT;
          scrollDown(getScrollTop, (n, { visibleStart }) => {
            expect(visibleStart).toBe(n);
          });
        });

        it('should increase visibleEnd by (n + total rendered rows)', () => {
          const getScrollTop = n => n * ROW_HEIGHT;
          scrollDown(getScrollTop, (n, { visibleEnd }) => {
            expect(visibleEnd).toBe(EXPECTED_NUMBER_VISIBLE_ROWS + n);
          });
        });
      });

      describe('When incrementing scroll by a decimal number within 0.5 buffer of n*rowHeight', () => {
        it('should increase visibleEnd by (n + total rendered rows)', () => {
          const clientScrollError = 0.5;
          const getScrollTop = n => (n * ROW_HEIGHT) - clientScrollError;
          scrollDown(getScrollTop, (n, { visibleEnd }) => {
            expect(visibleEnd).toBe(EXPECTED_NUMBER_VISIBLE_ROWS + n);
          });
        });

        it('should increase visibleEnd by n rows', () => {
          const clientScrollError = 0.5;
          const getScrollTop = n => (n * ROW_HEIGHT) - clientScrollError;
          scrollDown(getScrollTop, (n, { visibleStart }) => {
            expect(visibleStart).toBe(n);
          });
        });
      });
    });
  });

  describe('getNextScrollState', () => {
    it('should correctly set next scroll state', () => {
      const fakeGetDOMNodeOffsetWidth = () => ({});
      const scrollTop = 100;
      const scrollLeft = 100;
      const height = 500;
      const rowHeight = 40;
      const props = {
        columnMetrics: {
          columns: [
            { key: 'col1', width: 50 },
            { key: 'col2', width: 120 }
          ]
        },
        minHeight: 100,
        rowOffsetHeight: 5,
        rowHeight: 20,
        rowsCount: 100,
        overScan: {
          rowsStart: 1,
          rowsEnd: 10,
          colsStart: 1,
          colsEnd: 10
        }
      };
      const state = getNextScrollState(props, fakeGetDOMNodeOffsetWidth, scrollTop, scrollLeft, height, rowHeight, 50, 60);

      expect(state).toEqual(jasmine.objectContaining({
        isScrolling: true,
        scrollLeft,
        scrollTop,
        visibleStart: 3,
        visibleEnd: 16,
        displayStart: 2,
        displayEnd: 26,
        colDisplayStart: 0,
        colDisplayEnd: 2
      }));
    });
  });
});
