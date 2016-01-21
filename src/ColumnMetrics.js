/* @flow */
/**
 * @jsx React.DOM


 */
"use strict";

var shallowCloneObject            = require('./shallowCloneObject');
var isValidElement = require('react').isValidElement;
var sameColumn = require('./ColumnComparer');
var ColumnUtils = require('./ColumnUtils');
var getScrollbarSize  = require('./getScrollbarSize');

type ColumnMetricsType = {
    columns: Array<Column>;
    totalWidth: number;
    minColumnWidth: number;
};

type Column = {
  key: string;
  left: number;
  width: number;
};

function isImmutable(value, structure) {
  return typeof Immutable !== 'undefined' &&
         Immutable[structure] !== 'undefined' &&
         (value instanceof Immutable[structure]);
}

/**
 * Update column metrics calculation.
 *
 * @param {ColumnMetricsType} metrics
 */
function recalculate(metrics: ColumnMetricsType): ColumnMetricsType {
    var isImmutableColumns = isImmutable(metrics.columns, 'List');
    var providedColumns = isImmutableColumns ? metrics.columns.toJS() : metrics.columns;

    // compute width for columns which specify width
    var columns = setColumnWidths(providedColumns, metrics.totalWidth);

    var unallocatedWidth = columns.filter(c => c.width).reduce((w, column) => {
      return w - column.width;
    }, metrics.totalWidth);
    unallocatedWidth -= getScrollbarSize();

    var width = columns.filter(c => c.width).reduce((w, column) => {
      return w + column.width;
    }, 0);

    // compute width for columns which doesn't specify width
    columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

    // compute left offset
    columns = setColumnOffsets(columns);

    return {
      columns,
      width,
      totalWidth: metrics.totalWidth,
      minColumnWidth: metrics.minColumnWidth
    };
}

function setColumnOffsets(columns) {
  var left = 0;
  return columns.map(column => {
    column.left = left;
    left += column.width;
    return column;
  });
}

function setColumnWidths(columns, totalWidth) {
  return columns.map(columnData => {
    var column = Object.assign({}, columnData);

    if (column.width && /^([0-9]+)%$/.exec(column.width.toString())) {
      column.width = Math.floor(parseInt(column.width, 10) / 100 * totalWidth);
    }

    return column;
  });
}

function setDefferedColumnWidths(columns, initialUnallocatedWidth, minColumnWidth) {
  var defferedColumns = columns.filter(c => !c.width);
  var deferredColumnsCount = ColumnUtils.getSize(defferedColumns);
  var unallocatedWidth = initialUnallocatedWidth;
  var addColumnToUnallocated = (column) => {
    unallocatedWidth += column.width;
    deferredColumnsCount += 1;
  };
  var removeColumnFromUnallocated = (column) => {
    unallocatedWidth -= column.width;
    deferredColumnsCount -= 1;
  };

  return columns.map((column, i, arr) => {
    var unallocatedColumnWidth = (deferredColumnsCount !== 0) ? Math.floor(unallocatedWidth / deferredColumnsCount) : 0;

    if (column.width && !column.minWidth) return column;

    if (column.minWidth) {
      if (column.width) addColumnToUnallocated(column);
      column.width = Math.max(column.minWidth, unallocatedColumnWidth, column.width || 0);
      removeColumnFromUnallocated(column);
    } else if (unallocatedWidth <= 0) {
      column.width = minColumnWidth;
    } else {
      column.width = unallocatedColumnWidth;
    }

    return column;
  });
}


/**
 * Update column metrics calculation by resizing a column.
 *
 * @param {ColumnMetricsType} metrics
 * @param {Column} column
 * @param {number} width
 */
function resizeColumn(metrics: ColumnMetricsType, index: number, width: number): ColumnMetricsType {
  var column = ColumnUtils.getColumn(metrics.columns, index);
  metrics = shallowCloneObject(metrics);
  metrics.columns = metrics.columns.slice(0);

  var updatedColumn = shallowCloneObject(column);
  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

  metrics = ColumnUtils.spliceColumn(metrics, index, updatedColumn);

  return recalculate(metrics);
}

function areColumnsImmutable(prevColumns: Array<Column>, nextColumns: Array<Column>) {
  return isImmutable(prevColumns, 'List') && isImmutable(nextColumns, 'List');
}

function compareEachColumn(prevColumns: Array<Column>, nextColumns: Array<Column>, sameColumn: (a: Column, b: Column) => boolean) {
  var i, len, column;
  var prevColumnsByKey: { [key:string]: Column } = {};
  var nextColumnsByKey: { [key:string]: Column } = {};


  if(ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)){
    return false;
  }

  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
    column = prevColumns[i];
    prevColumnsByKey[column.key] = column;
  }

  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
    column = nextColumns[i];
    nextColumnsByKey[column.key] = column;
    var prevColumn = prevColumnsByKey[column.key];
    if (prevColumn === undefined || !sameColumn(prevColumn, column)) {
      return false;
    }
  }

  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
    column = prevColumns[i];
    var nextColumn = nextColumnsByKey[column.key];
    if (nextColumn === undefined) {
      return false;
    }
  }
  return true;
}

function sameColumns(prevColumns: Array<Column>, nextColumns: Array<Column>, sameColumn: (a: Column, b: Column) => boolean): boolean {
  if(areColumnsImmutable(prevColumns, nextColumns)) {
    return prevColumns === nextColumns;
  }else{
    return compareEachColumn(prevColumns, nextColumns, sameColumn);
  }
}

module.exports = { recalculate, resizeColumn, sameColumn, sameColumns };
