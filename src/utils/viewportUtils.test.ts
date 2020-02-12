import {
  getVerticalRangeToRender,
  getHorizontalRangeToRender,
  HorizontalRangeToRenderParams
} from './viewportUtils';
import { ValueFormatter } from '../formatters';
import { ColumnMetrics } from '../common/types';

interface Row {
  [key: string]: React.ReactNode;
}

interface VerticalRangeToRenderParams {
  height: number;
  rowHeight: number;
  scrollTop: number;
  rowsCount: number;
}

describe('getVerticalRangeToRender', () => {
  function getRange({
    height = 500,
    rowHeight = 50,
    scrollTop = 200,
    rowsCount = 1000
  }: Partial<VerticalRangeToRenderParams>) {
    return getVerticalRangeToRender(height, rowHeight, scrollTop, rowsCount);
  }

  it('should use rowHeight to calculate the range', () => {
    expect(getRange({ rowHeight: 50 })).toStrictEqual([0, 24]);
  });

  it('should use height to calculate the range', () => {
    expect(getRange({ height: 250 })).toStrictEqual([0, 16]);
  });

  it('should use scrollTop to calculate the range', () => {
    expect(getRange({ scrollTop: 500 })).toStrictEqual([0, 24]);
  });

  it('should use rowsCount to calculate the range', () => {
    expect(getRange({ rowsCount: 5, scrollTop: 0 })).toStrictEqual([0, 4]);
  });
});

describe('getHorizontalRangeToRender', () => {
  function getColumnMetrics(): ColumnMetrics<Row, unknown> {
    const columns = [...Array(500).keys()].map(i => ({
      idx: i,
      key: `col${i}`,
      name: `col${i}`,
      width: 100,
      left: i * 100,
      formatter: ValueFormatter
    }));
    return {
      columns,
      viewportWidth: 1000,
      totalColumnWidth: 200,
      lastFrozenColumnIndex: -1
    };
  }

  function getRange<K extends keyof HorizontalRangeToRenderParams<Row, unknown>>(overrides: Pick<HorizontalRangeToRenderParams<Row, unknown>, K>) {
    return getHorizontalRangeToRender({
      columnMetrics: getColumnMetrics(),
      scrollLeft: 200,
      ...overrides
    });
  }

  it('should use scrollLeft to calculate the range', () => {
    expect(getRange({ scrollLeft: 300 })).toStrictEqual([2, 13]);
  });

  it('should account for large columns', () => {
    const columnMetrics = getColumnMetrics();
    columnMetrics.columns[0].width = 500;
    columnMetrics.columns.forEach((c, i) => {
      if (i !== 0) c.left += 400;
    });
    expect(getRange({ scrollLeft: 400, columnMetrics })).toStrictEqual([0, 10]);
  });

  it('should use viewportWidth to calculate the range', () => {
    const columnMetrics = getColumnMetrics();
    columnMetrics.viewportWidth = 500;
    expect(getHorizontalRangeToRender({
      columnMetrics,
      scrollLeft: 200
    })).toStrictEqual([1, 7]);
  });

  it('should use frozen columns to calculate the range', () => {
    const columnMetrics = getColumnMetrics();
    columnMetrics.columns[0].frozen = true;
    columnMetrics.columns[1].frozen = true;
    columnMetrics.columns[2].frozen = true;
    columnMetrics.lastFrozenColumnIndex = 2;

    expect(getRange({ scrollLeft: 500, columnMetrics })).toStrictEqual([7, 15]);
  });
});
