'use strict';
var React         = require('react');
var rewire = require('rewire');
var ColumnMetrics = rewire('../ColumnMetrics');
var Immutable = window.Immutable = require('Immutable');
Object.assign = require('object-assign');

describe('Column Metrics Tests', () => {

  describe('Creating metrics', () => {

    describe('When column width not set for all columns', () =>{

      var columns = [
      {
        key   : 'id',
        name  : 'ID',
        width : 60
      },
      {
        key: 'title',
        name: 'Title'
      },
      {
        key: 'count',
        name: 'Count'
      }];

      if('should set the unset column widths based on the total width', () => {
        var metrics = recalculate({column : columns, totalWidth: 300, minColumnWidth: 50})
        expect(metrics.columns[0].width).toEqual(60);
        expect(metrics.columns[1].width).toEqual(120);
        expect(metrics.columns[2].width).toEqual(120);

      });

      if('should set the column left based on the column widths', () => {
        var metrics = recalculate({column : columns, totalWidth: 300, minColumnWidth: 50})
        expect(metrics.columns[0].left).toEqual(0);
        expect(metrics.columns[1].left).toEqual(60);
        expect(metrics.columns[2].left).toEqual(180);

      });

      describe('When column data is immutable js object', () => {
        var immutableColumns = new Immutable.List(columns);

        if('should set the unset column widths based on the total width', () => {
          var metrics = recalculate({column : immutableColumns, totalWidth: 300, minColumnWidth: 50})
          expect(metrics.columns[0].get('width')).toEqual(60);
          expect(metrics.columns[1].get('width')).toEqual(120);
          expect(metrics.columns[2].get('width')).toEqual(120);

        });

        if('should set the column left based on the column widths', () => {
          var metrics = recalculate({column : immutableColumns, totalWidth: 300, minColumnWidth: 50})
          expect(metrics.columns[0].get('left')).toEqual(0);
          expect(metrics.columns[1].get('left')).toEqual(60);
          expect(metrics.columns[2].get('left')).toEqual(180);

        });
      });

    })
  });

  describe('Comparing Columns', () => {

    describe('Using array of object literals', () => {

      beforeEach(() => {
        var helpers = require('./GridPropHelpers');
        this.prevColumns = helpers.columns;
        this.nextColumns = helpers.columns.map(c => {
          return Object.assign({}, c);
        });
      });

      it('columns with same properties should be equal', () => {
        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBe(true);
      });

      it('changing a single property in one column will make columns unequal', () => {
        this.nextColumns[0].width = 101;
        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBe(false);
      });

      it('should call compareEachColumn when comparing columns', () => {
        var compareEachColumnSpy = jasmine.createSpy();
        ColumnMetrics.__set__('compareEachColumn', compareEachColumnSpy);
        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(compareEachColumnSpy).toHaveBeenCalled();
        expect(compareEachColumnSpy.callCount).toEqual(1);
      });

    });

    describe('Using ImmutableJs Lists', () => {

      beforeEach(() => {
        var helpers = require('./GridPropHelpers');
        this.prevColumns = new Immutable.List(helpers.columns);
        this.nextColumns = this.prevColumns;
      });

      it('columns with same memory reference are equal', () => {

        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBe(true);
      });

      it('columns with same properties are not equal when objects have different memory reference', () => {
        var firstColWidth = this.prevColumns.get(0).width;

        this.nextColumns = this.nextColumns.update(0, (c) => {
          c.width = firstColWidth;
        });
        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBe(false);
      });

      it('changing a single property in one column will make columns unequal', () => {
        this.nextColumns = this.nextColumns.update(0, (c) => {
          c.width = 101;
        });
        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(areColumnsEqual).toBe(false);
      });

      it('should not call compareEachColumn when comparing columns', () => {
        var compareEachColumnSpy = jasmine.createSpy();
        ColumnMetrics.__set__('compareEachColumn', compareEachColumnSpy);
        var areColumnsEqual = ColumnMetrics.sameColumns(this.prevColumns, this.nextColumns, ColumnMetrics.sameColumn);
        expect(compareEachColumnSpy).not.toHaveBeenCalled();
        expect(compareEachColumnSpy.callCount).toEqual(0);
      });

    });

  });






});
