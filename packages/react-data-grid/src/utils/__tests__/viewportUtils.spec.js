import columnUtils from '../../ColumnUtils';
import { getGridState, getNextScrollState, getRenderedColumnCount } from '../viewportUtils';

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
      const fakeGetSize = spyOn(columnUtils, 'getSize').and.returnValue(15);
      const { state, props } = getState();

      expect(fakeGetSize).toHaveBeenCalledWith(props.columnMetrics.columns);
      expect(state.colVisibleEnd).toBe(15);
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
        visibleStart: 2,
        visibleEnd: 15,
        displayStart: 1,
        displayEnd: 25,
        colDisplayStart: 0,
        colDisplayEnd: 2
      }));
    });
  });
});
