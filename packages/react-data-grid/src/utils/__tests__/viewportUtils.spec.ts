import {
  getScrollDirection,
  getVerticalRangeToRender,
  VerticalRangeToRenderParams,
  getHorizontalRangeToRender,
  HorizontalRangeToRenderParams
} from '../viewportUtils';
import { SCROLL_DIRECTION } from '../../common/enums';
import { ColumnMetrics } from '../../common/types';

interface Row {
  [key: string]: unknown;
}

describe('viewportUtils', () => {
  describe('getVerticalRangeToRender', () => {
    function getRange<K extends keyof VerticalRangeToRenderParams>(overrides: Pick<VerticalRangeToRenderParams, K>) {
      return getVerticalRangeToRender({
        height: 500,
        rowHeight: 50,
        scrollTop: 200,
        rowsCount: 1000,
        scrollDirection: SCROLL_DIRECTION.DOWN,
        ...overrides
      });
    }

    it('should use rowHeight to calculate the range', () => {
      expect(getRange({ rowHeight: 50 })).toEqual({
        rowVisibleStartIdx: 4,
        rowVisibleEndIdx: 14,
        rowOverscanStartIdx: 2,
        rowOverscanEndIdx: 16
      });
    });

    it('should use height to calculate the range', () => {
      expect(getRange({ height: 250 })).toEqual({
        rowVisibleStartIdx: 4,
        rowVisibleEndIdx: 9,
        rowOverscanStartIdx: 2,
        rowOverscanEndIdx: 11
      });
    });

    it('should use scrollTop to calculate the range', () => {
      expect(getRange({ scrollTop: 500 })).toEqual({
        rowVisibleStartIdx: 10,
        rowVisibleEndIdx: 20,
        rowOverscanStartIdx: 8,
        rowOverscanEndIdx: 22
      });
    });

    it('should use rowsCount to calculate the range', () => {
      expect(getRange({ rowsCount: 5, scrollTop: 0 })).toEqual({
        rowVisibleStartIdx: 0,
        rowVisibleEndIdx: 5,
        rowOverscanStartIdx: 0,
        rowOverscanEndIdx: 5
      });
    });

    it('should use overscanRowCount to calculate the range', () => {
      expect(getRange({ overscanRowCount: 10 })).toEqual({
        rowVisibleStartIdx: 4,
        rowVisibleEndIdx: 14,
        rowOverscanStartIdx: 2,
        rowOverscanEndIdx: 24
      });
    });

    it('should use scrollDirection to calculate the range', () => {
      expect(getRange({ overscanRowCount: 10, scrollDirection: SCROLL_DIRECTION.UP })).toEqual({
        rowVisibleStartIdx: 4,
        rowVisibleEndIdx: 14,
        rowOverscanStartIdx: 0,
        rowOverscanEndIdx: 16
      });
    });
  });

  describe('getHorizontalRangeToRender', () => {
    function getColumnMetrics(): ColumnMetrics<Row> {
      const columns = [...Array(500).keys()].map(i => ({ idx: i, key: `col${i}`, name: `col${i}`, width: 100, left: i * 100 }));
      return {
        columns,
        width: 0,
        totalColumnWidth: 200,
        totalWidth: 0,
        minColumnWidth: 80,
        lastFrozenColumnIndex: -1
      };
    }

    function getRange<K extends keyof HorizontalRangeToRenderParams<Row>>(overrides: Pick<HorizontalRangeToRenderParams<Row>, K>) {
      return getHorizontalRangeToRender({
        columnMetrics: getColumnMetrics(),
        scrollLeft: 200,
        viewportWidth: 1000,
        scrollDirection: SCROLL_DIRECTION.RIGHT,
        ...overrides
      });
    }

    it('should use scrollLeft to calculate the range', () => {
      expect(getRange({ scrollLeft: 300 })).toEqual({
        colVisibleStartIdx: 3,
        colVisibleEndIdx: 13,
        colOverscanStartIdx: 1,
        colOverscanEndIdx: 15
      });
    });

    it('should use viewportWidth to calculate the range', () => {
      expect(getRange({ viewportWidth: 500 })).toEqual({
        colVisibleStartIdx: 2,
        colVisibleEndIdx: 7,
        colOverscanStartIdx: 0,
        colOverscanEndIdx: 9
      });
    });

    it('should use overscanColumnCount to calculate the range', () => {
      expect(getRange({ overscanColumnCount: 5 })).toEqual({
        colVisibleStartIdx: 2,
        colVisibleEndIdx: 12,
        colOverscanStartIdx: 0,
        colOverscanEndIdx: 17
      });
    });

    it('should use overscanColumnCount to calculate the range', () => {
      expect(getRange({ overscanColumnCount: 5, scrollDirection: SCROLL_DIRECTION.LEFT, scrollLeft: 1000 })).toEqual({
        colVisibleStartIdx: 10,
        colVisibleEndIdx: 20,
        colOverscanStartIdx: 5,
        colOverscanEndIdx: 22
      });
    });

    it('should use frozen columns to calculate the range', () => {
      const columnMetrics = getColumnMetrics();
      columnMetrics.columns[0].frozen = true;
      columnMetrics.columns[1].frozen = true;
      columnMetrics.columns[2].frozen = true;
      columnMetrics.lastFrozenColumnIndex = 2;

      expect(getRange({ scrollLeft: 500, columnMetrics })).toEqual({
        colVisibleStartIdx: 8,
        colVisibleEndIdx: 15,
        colOverscanStartIdx: 6,
        colOverscanEndIdx: 17
      });
    });
  });

  describe('getScrollDirection', () => {
    const prevScroll = { scrollTop: 100, scrollLeft: 100 };
    it('should return SCROLL_DIRECTION.DOWN iF previous scrollTop is less than current scrollTop', () => {
      expect(getScrollDirection(prevScroll, { ...prevScroll, scrollTop: 101 })).toBe(SCROLL_DIRECTION.DOWN);
    });

    it('should return SCROLL_DIRECTION.UP iF previous scrollTop is greater than current scrollTop', () => {
      expect(getScrollDirection(prevScroll, { ...prevScroll, scrollTop: 99 })).toBe(SCROLL_DIRECTION.UP);
    });

    it('should return SCROLL_DIRECTION.RIGHT iF previous scrollLeft is less than current scrollLeft', () => {
      expect(getScrollDirection(prevScroll, { ...prevScroll, scrollLeft: 101 })).toBe(SCROLL_DIRECTION.RIGHT);
    });

    it('should return SCROLL_DIRECTION.LEFT iF previous scrollLeft is greater than current scrollLeft', () => {
      expect(getScrollDirection(prevScroll, { ...prevScroll, scrollLeft: 99 })).toBe(SCROLL_DIRECTION.LEFT);
    });

    it('should return SCROLL_DIRECTION.NONE if current scroll is equal to previous scroll', () => {
      expect(getScrollDirection(prevScroll, { ...prevScroll })).toBe(SCROLL_DIRECTION.NONE);
    });
  });
});
