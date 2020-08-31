/* eslint-disable jest/no-commented-out-tests */
import { getVerticalRangeToRender } from './viewportUtils';

// interface Row {
//   [key: string]: React.ReactNode;
// }

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

// describe('getHorizontalRangeToRender', () => {
//   function getColumns(): CalculatedColumn<Row, unknown>[] {
//     return [...Array(500).keys()].map(i => ({
//       idx: i,
//       key: `col${i}`,
//       name: `col${i}`,
//       width: 100,
//       left: i * 100,
//       resizable: false,
//       sortable: false,
//       formatter: ValueFormatter
//     }));
//   }

//   it('should use scrollLeft to calculate the range', () => {
//     expect(getHorizontalRangeToRender(
//       getColumns(),
//       -1,
//       1000,
//       300
//     )).toStrictEqual([2, 13]);
//   });

//   it('should account for large columns', () => {
//     const columns = getColumns();
//     columns[0].width = 500;
//     columns.forEach((c, i) => {
//       if (i !== 0) c.left += 400;
//     });
//     expect(getHorizontalRangeToRender(
//       columns,
//       -1,
//       1000,
//       400
//     )).toStrictEqual([0, 10]);
//   });

//   it('should use viewportWidth to calculate the range', () => {
//     const columns = getColumns();
//     expect(getHorizontalRangeToRender(
//       columns,
//       -1,
//       500,
//       200
//     )).toStrictEqual([1, 7]);
//   });

//   it('should use frozen columns to calculate the range', () => {
//     const columns = getColumns();
//     columns[0].frozen = true;
//     columns[1].frozen = true;
//     columns[2].frozen = true;

//     expect(getHorizontalRangeToRender(
//       columns,
//       2,
//       1000,
//       500
//     )).toStrictEqual([7, 15]);
//   });
// });
