import { getGridState, getRenderedColumnCount, getVisibleBoundaries, getNonLockedVisibleColStartIdx } from '../viewportUtils';

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

  describe('getRenderedColumnCount', () => {
    const fakeGetDOMNodeOffsetWidth = jasmine.createSpy('getDOMNodeOffsetWidth').and.returnValue(100);
    const verifyRenderedColumnCount = (width, extraColumns = [], colVisibleStartIdx = 0) => {
      const columns = [...[
        { key: 'col1', width: 10 },
        { key: 'col2', width: 10 }
      ], ...extraColumns];
      const columnMetrics = {
        columns,
        totalWidth: 0
      };
      return getRenderedColumnCount(columnMetrics, fakeGetDOMNodeOffsetWidth, colVisibleStartIdx, width);
    };

    beforeEach(() => {
      fakeGetDOMNodeOffsetWidth.calls.reset();
    });

    it('correctly set rendered columns count if width is 0', () => {
      const count = verifyRenderedColumnCount(0);
      expect(fakeGetDOMNodeOffsetWidth).toHaveBeenCalled();
      expect(count).toBe(2);
    });

    it('correctly set rendered columns count if width is greater than 0', () => {
      const count = verifyRenderedColumnCount(11);
      expect(fakeGetDOMNodeOffsetWidth).not.toHaveBeenCalled();
      expect(count).toBe(2);
    });

    it('can handle variable column widths', () => {
      const columns = [{ key: 'col3', width: 70 }, { key: 'col4', width: 5 }, { key: 'col3', width: 2 }, { key: 'col3', width: 1 }];
      const count = verifyRenderedColumnCount(100, columns);
      expect(fakeGetDOMNodeOffsetWidth).not.toHaveBeenCalled();
      expect(count).toBe(6);
    });

    it('can handle when grid is scrolled', () => {
      const columns = [{ key: 'col3', width: 70 }, { key: 'col4', width: 5 }, { key: 'col3', width: 2 }, { key: 'col3', width: 1 }];
      const count = verifyRenderedColumnCount(100, columns, 4);
      expect(fakeGetDOMNodeOffsetWidth).not.toHaveBeenCalled();
      expect(count).toBe(2);
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

    describe('getNonLockedVisibleColStartIdx', () => {

      const getColumns = () => [{width: 100, left: 0}, {width: 100, left: 200}, {width: 100, left: 300}, {width: 100, left: 400}, {width: 100, left: 500}, {width: 100, left: 600}];

      it('should return 0 if no locked columns and grid not scrolled left', () => {
        const scrollLeft = 0;
        const colVisibleStartIdx = getNonLockedVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(0);
      });

      it('should return first fully visible column when scrolled left', () => {
        const scrollLeft = 100;
        const colVisibleStartIdx = getNonLockedVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(1);
      });

      it('should return first partially visible column when scrolled left (left bound)', () => {
        const scrollLeft = 99;
        const colVisibleStartIdx = getNonLockedVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(0);
      });

      it('should return first partially visible column when scrolled left (right bound)', () => {
        const scrollLeft = 101;
        const colVisibleStartIdx = getNonLockedVisibleColStartIdx(getColumns(), scrollLeft);
        expect(colVisibleStartIdx).toBe(1);
      });

      const expectIdxWhenColumsLocked = (scrollLeft) => {
        const columns = getColumns();
        columns[1].locked = true;
        const colVisibleStartIdx = getNonLockedVisibleColStartIdx(columns, scrollLeft);
        return expect(colVisibleStartIdx);
      };

      it('should return first non locked column that appears after last locked column', () => {
        const scrollLeft = 0;
        expectIdxWhenColumsLocked(scrollLeft).toBe(2);
      });

      it('should return first fully visible non locked column that appears after last locked column when scrolled left', () => {
        const scrollLeft = 200;
        expectIdxWhenColumsLocked(scrollLeft).toBe(4);
      });

      it('should return first partially visible non locked column that appears after last locked column when scrolled left', () => {
        const scrollLeft = 201;
        expectIdxWhenColumsLocked(scrollLeft).toBe(4);
      });

      it('should return first partially visible non locked column that appears after last locked column when scrolled left', () => {
        const scrollLeft = 199;
        expectIdxWhenColumsLocked(scrollLeft).toBe(3);
      });
    });
  });
});
