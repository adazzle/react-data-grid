/* @flow */
/**
 * @jsx React.DOM


 */
"use strict";

var shallowCloneObject            = require('./shallowCloneObject');
var merge                         = require('./merge');
var isValidElement = require('react/addons').isValidElement;
var sameColumn = require('./ColumnComparer');

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

/**
 * Update column metrics calculation.
 *
 * @param {ColumnMetricsType} metrics
 */
function calculate(metrics: ColumnMetricsType): ColumnMetricsType {
  var width = 0;
  var unallocatedWidth = metrics.totalWidth;

  var deferredColumns = [];
  var columns = metrics.columns.map(shallowCloneObject);

  var i, len, column;

  // compute width for columns which specify width
  for (i = 0, len = columns.length; i < len; i++) {
    column = columns[i];

    if (column.width) {
      if (/^([0-9]+)%$/.exec(column.width.toString())) {
        column.width = Math.floor(
          column.width / 100 * metrics.totalWidth);
      }
      unallocatedWidth -= column.width;
      width += column.width;
    } else {
      deferredColumns.push(column);
    }

  }

  // compute width for columns which doesn't specify width
  for (i = 0, len = deferredColumns.length; i < len; i++) {
    column = deferredColumns[i];

    if (unallocatedWidth <= 0) {
      column.width = metrics.minColumnWidth;
    } else {
      column.width = Math.floor(unallocatedWidth / deferredColumns.length);
    }
    width += column.width;
  }

  // compute left offset
  var left = 0;
  for (i = 0, len = columns.length; i < len; i++) {
    column = columns[i];
    column.left = left;
    left += column.width;
  }

  return {
    columns,
    width,
    totalWidth: metrics.totalWidth,
    minColumnWidth: metrics.minColumnWidth
  };
}

/**
 * Update column metrics calculation by resizing a column.
 *
 * @param {ColumnMetricsType} metrics
 * @param {Column} column
 * @param {number} width
 */
function resizeColumn(metrics: ColumnMetricsType, index: number, width: number): ColumnMetricsType {
  var column = metrics.columns[index];
  metrics = shallowCloneObject(metrics);
  metrics.columns = metrics.columns.slice(0);

  var updatedColumn = shallowCloneObject(column);
  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

  metrics.columns.splice(index, 1, updatedColumn);

  return calculate(metrics);
}

function sameColumns(prevColumns: Array<Column>, nextColumns: Array<Column>, sameColumn: (a: Column, b: Column) => boolean): boolean {
  var i, len, column;
  var prevColumnsByKey: { [key:string]: Column } = {};
  var nextColumnsByKey: { [key:string]: Column } = {};


  if(prevColumns.length !== nextColumns.length){
    return false;
  }

  for (i = 0, len = prevColumns.length; i < len; i++) {
    column = prevColumns[i];
    prevColumnsByKey[column.key] = column;
  }

  for (i = 0, len = nextColumns.length; i < len; i++) {
    column = nextColumns[i];
    nextColumnsByKey[column.key] = column;
    var prevColumn = prevColumnsByKey[column.key];
    if (prevColumn === undefined || !sameColumn(prevColumn, column)) {
      return false;
    }
  }

  for (i = 0, len = prevColumns.length; i < len; i++) {
    column = prevColumns[i];
    var nextColumn = nextColumnsByKey[column.key];
    if (nextColumn === undefined) {
      return false;
    }
  }

  return true;
}

module.exports = { calculate, resizeColumn, sameColumn, sameColumns };
