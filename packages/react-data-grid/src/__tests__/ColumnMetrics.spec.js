import getScrollbarSize from '../getScrollbarSize';
const rewire = require('rewire');
const ColumnMetrics = rewire('../ColumnMetrics');
const Immutable = window.Immutable = require('immutable');

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

      it('should shift all locked columns to the start of column metrics array', () => {
        const firstLockedColumn =  {key: 'lockedColumn1', name: 'lockedColumn1', locked: true};
        const secondLockedColumn =  {key: 'lockedColumn2', name: 'lockedColumn2', locked: true};
        const thirdLockedColumn =  {key: 'lockedColumn3', name: 'lockedColumn3', locked: true};
        const columns = [...getInitialColumns(), secondLockedColumn, thirdLockedColumn];
        columns.splice(2, 0, firstLockedColumn);
        const metrics = ColumnMetrics.recalculate({ columns, totalWidth, minColumnWidth: 50 });
        expect(metrics.columns[0]).toEqual(jasmine.objectContaining(firstLockedColumn));
        expect(metrics.columns[1]).toEqual(jasmine.objectContaining(secondLockedColumn));
        expect(metrics.columns[2]).toEqual(jasmine.objectContaining(thirdLockedColumn));
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
