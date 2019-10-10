import {
  getVerticalRangeToRender,
  VerticalRangeToRenderParams,
  getHorizontalRangeToRender,
  HorizontalRangeToRenderParams
} from '../viewportUtils';
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
        ...overrides
      });
    }

    it('should use rowHeight to calculate the range', () => {
      expect(getRange({ rowHeight: 50 })).toEqual({
        rowOverscanStartIdx: 2,
        rowOverscanEndIdx: 16
      });
    });

    it('should use height to calculate the range', () => {
      expect(getRange({ height: 250 })).toEqual({
        rowOverscanStartIdx: 2,
        rowOverscanEndIdx: 11
      });
    });

    it('should use scrollTop to calculate the range', () => {
      expect(getRange({ scrollTop: 500 })).toEqual({
        rowOverscanStartIdx: 8,
        rowOverscanEndIdx: 22
      });
    });

    it('should use rowsCount to calculate the range', () => {
      expect(getRange({ rowsCount: 5, scrollTop: 0 })).toEqual({
        rowOverscanStartIdx: 0,
        rowOverscanEndIdx: 4
      });
    });
  });

  describe('getHorizontalRangeToRender', () => {
    function getColumnMetrics(): ColumnMetrics<Row> {
      const columns = [...Array(500).keys()].map(i => ({ idx: i, key: `col${i}`, name: `col${i}`, width: 100, left: i * 100 }));
      return {
        columns,
        viewportWidth: 1000,
        totalColumnWidth: 200,
        columnWidths: new Map(),
        minColumnWidth: 80,
        lastFrozenColumnIndex: -1
      };
    }

    function getRange<K extends keyof HorizontalRangeToRenderParams<Row>>(overrides: Pick<HorizontalRangeToRenderParams<Row>, K>) {
      return getHorizontalRangeToRender({
        columnMetrics: getColumnMetrics(),
        scrollLeft: 200,
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

    it('should use account for hidden width for large columns', () => {
      const columnMetrics = getColumnMetrics();
      columnMetrics.columns[0].width = 500;
      expect(getRange({ scrollLeft: 400, columnMetrics })).toEqual({
        colVisibleStartIdx: 0,
        colVisibleEndIdx: 10,
        colOverscanStartIdx: 0,
        colOverscanEndIdx: 12
      });
    });

    it('should use viewportWidth to calculate the range', () => {
      const columnMetrics = getColumnMetrics();
      columnMetrics.viewportWidth = 500;
      expect(getHorizontalRangeToRender({
        columnMetrics,
        scrollLeft: 200
      })).toEqual({
        colVisibleStartIdx: 2,
        colVisibleEndIdx: 7,
        colOverscanStartIdx: 0,
        colOverscanEndIdx: 9
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
});
