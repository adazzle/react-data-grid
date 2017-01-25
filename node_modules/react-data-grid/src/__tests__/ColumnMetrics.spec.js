import getScrollbarSize from '../getScrollbarSize';
import GridPropHelpers from '../helpers/test/GridPropHelpers';
const rewire = require('rewire');
const ColumnMetrics = rewire('../ColumnMetrics');
const Immutable = window.Immutable = require('immutable');
Object.assign = require('object-assign');

const getAvailableWidthPerColumn = (totalWidth, consumedWidth, numberOfcolumns) => {
  let availableWidth = totalWidth - getScrollbarSize() - consumedWidth;
  availableWidth = availableWidth % numberOfcolumns === 0 ? availableWidth : availableWidth - 1;

  return availableWidth / numberOfcolumns;
};

describe('Column Metrics Tests', () => {
  describe('Creating metrics', () => {
    describe('When column width not set for all columns', () =>{
      const totalWidth = 300;
      let columns = [{
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
        let metrics = ColumnMetrics.recalculate({ columns, totalWidth, minColumnWidth: 50 });
        let expectedCalculatedWidth = getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

        expect(metrics.columns[0].width).toEqual(60);
        expect(metrics.columns[1].width).toEqual(expectedCalculatedWidth);
        expect(metrics.columns[2].width).toEqual(expectedCalculatedWidth);
      });

      it('should set the column left based on the column widths', () => {
        let metrics = ColumnMetrics.recalculate({ columns, totalWidth, minColumnWidth: 50 });
        let expectedLeftValue = columns[0].width + getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

        expect(metrics.columns[0].left).toEqual(0);
        expect(metrics.columns[1].left).toEqual(columns[0].width);
        expect(metrics.columns[2].left).toEqual(expectedLeftValue);
      });

      describe('When column data is immutable js object', () => {
        let immutableColumns = new Immutable.List(columns);

        it('should set the unset column widths based on the total width', () => {
          let metrics = ColumnMetrics.recalculate({ columns: immutableColumns, totalWidth: 300, minColumnWidth: 50 });
          let expectedCalculatedWidth = getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

          expect(metrics.columns.get(0).width).toEqual(60);
          expect(metrics.columns.get(1).width).toEqual(expectedCalculatedWidth);
          expect(metrics.columns.get(2).width).toEqual(expectedCalculatedWidth);
        });

        it('should set the column left based on the column widths', () => {
          let metrics = ColumnMetrics.recalculate({ columns: immutableColumns, totalWidth: 300, minColumnWidth: 50 });
          let expectedLeftValue = columns[0].width + getAvailableWidthPerColumn(totalWidth, columns[0].width, 2);

          expect(metrics.columns.get(0).left).toEqual(0);
          expect(metrics.columns.get(1).left).toEqual(columns[0].width);
          expect(metrics.columns.get(2).left).toEqual(expectedLeftValue);
        });
      });
    });
  });

  describe('Comparing Columns', () => {
    describe('Using array of object literals', () => {
      let prevColumns;
      let nextColumns;
      beforeEach(() => {
        prevColumns = GridPropHelpers.columns;
        nextColumns = GridPropHelpers.columns.map(c => {
          return Object.assign({}, c);
        });
      });

      it('columns with same properties should be equal', () => {
        let areColumnsEqual = ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBeTruthy();
      });

      it('changing a single property in one column will make columns unequal', () => {
        nextColumns[0].width = 101;
        let areColumnsEqual = ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBeFalsy();
      });

      it('should call compareEachColumn when comparing columns', () => {
        let compareEachColumnSpy = jasmine.createSpy();
        ColumnMetrics.__set__('compareEachColumn', compareEachColumnSpy);
        ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(compareEachColumnSpy).toHaveBeenCalled();
        expect(compareEachColumnSpy.calls.count()).toEqual(1);
      });
    });

    describe('Using ImmutableJs Lists', () => {
      let prevColumns;
      let nextColumns;

      beforeEach(() => {
        prevColumns = new Immutable.List(GridPropHelpers.columns);
        nextColumns = prevColumns;
      });

      it('columns with same memory reference are equal', () => {
        let areColumnsEqual = ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBeTruthy();
      });

      it('columns with same properties are not equal when objects have different memory reference', () => {
        let firstColWidth = prevColumns.get(0).width;

        nextColumns = nextColumns.update(0, (c) => {
          c.width = firstColWidth;
        });
        let areColumnsEqual = ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBeFalsy();
      });

      it('changing a single property in one column will make columns unequal', () => {
        nextColumns = nextColumns.update(0, (c) => {
          c.width = 101;
        });
        let areColumnsEqual = ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBeFalsy();
      });

      it('should not call compareEachColumn when comparing columns', () => {
        let compareEachColumnSpy = jasmine.createSpy();
        ColumnMetrics.__set__('compareEachColumn', compareEachColumnSpy);
        ColumnMetrics.sameColumns(prevColumns, nextColumns, ColumnMetrics.sameColumn);
        expect(compareEachColumnSpy).not.toHaveBeenCalled();
        expect(compareEachColumnSpy.calls.count()).toEqual(0);
      });
    });
  });
});
