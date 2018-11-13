import getScrollbarSize from '../getScrollbarSize';
const ColumnMetrics = require('../ColumnMetrics');

const getAvailableWidthPerColumn = (totalWidth, consumedWidth, numberOfcolumns) => {
  let availableWidth = totalWidth - getScrollbarSize() - consumedWidth;
  availableWidth = availableWidth % numberOfcolumns === 0 ? availableWidth : availableWidth - 1;

  return availableWidth / numberOfcolumns;
};

describe('Column Metrics Tests', () => {
  describe('Creating metrics', () => {
    describe('When column width not set for all columns', () => {
      const totalWidth = 300;
      const getInitialColumns = () => [{
        key: 'id',
        name: 'ID',
        width: 60
      }, {
        key: 'title',
        name: 'Title'
      }, {
        key: 'count',
        name: 'Count'
      }];

      it('should set the unset column widths based on the total width', () => {
        const columns = getInitialColumns();
        const metrics = ColumnMetrics.recalculate({ columns, totalWidth, minColumnWidth: 50 });
        const expectedCalculatedWidth = getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

        expect(metrics.columns[0].width).toEqual(60);
        expect(metrics.columns[1].width).toEqual(expectedCalculatedWidth);
        expect(metrics.columns[2].width).toEqual(expectedCalculatedWidth);
      });

      it('should set the column left based on the column widths', () => {
        const columns = getInitialColumns();
        const metrics = ColumnMetrics.recalculate({ columns, totalWidth, minColumnWidth: 50 });
        const expectedLeftValue = columns[0].width + getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

        expect(metrics.columns[0].left).toEqual(0);
        expect(metrics.columns[1].left).toEqual(columns[0].width);
        expect(metrics.columns[2].left).toEqual(expectedLeftValue);
      });

      it('should shift all frozen columns to the start of column metrics array', () => {
        const firstFrozenColumn =  {key: 'frozenColumn1', name: 'frozenColumn1', frozen: true};
        const secondFrozenColumn =  {key: 'frozenColumn2', name: 'frozenColumn2', frozen: true};
        const thirdFrozenColumn =  {key: 'frozenColumn3', name: 'frozenColumn3', frozen: true};
        const columns = [...getInitialColumns(), secondFrozenColumn, thirdFrozenColumn];
        columns.splice(2, 0, firstFrozenColumn);
        const metrics = ColumnMetrics.recalculate({ columns, totalWidth, minColumnWidth: 50 });
        expect(metrics.columns[0]).toEqual(jasmine.objectContaining(firstFrozenColumn));
        expect(metrics.columns[1]).toEqual(jasmine.objectContaining(secondFrozenColumn));
        expect(metrics.columns[2]).toEqual(jasmine.objectContaining(thirdFrozenColumn));
      });

      describe('When column data is immutable js object', () => {
        const immutableColumns = new Immutable.List(getInitialColumns());

        it('should set the unset column widths based on the total width', () => {
          const columns = getInitialColumns();
          const metrics = ColumnMetrics.recalculate({ columns: immutableColumns, totalWidth: 300, minColumnWidth: 50 });
          const expectedCalculatedWidth = getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

          expect(metrics.columns.get(0).width).toEqual(60);
          expect(metrics.columns.get(1).width).toEqual(expectedCalculatedWidth);
          expect(metrics.columns.get(2).width).toEqual(expectedCalculatedWidth);
        });

        it('should set the column left based on the column widths', () => {
          const columns = getInitialColumns();
          const metrics = ColumnMetrics.recalculate({ columns: immutableColumns, totalWidth: 300, minColumnWidth: 50 });
          const expectedLeftValue = columns[0].width + getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

          expect(metrics.columns.get(0).left).toEqual(0);
          expect(metrics.columns.get(1).left).toEqual(columns[0].width);
          expect(metrics.columns.get(2).left).toEqual(expectedLeftValue);
        });
      });
    });
  });
});
