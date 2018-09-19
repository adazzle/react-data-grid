import { createSelector } from 'reselect';
import {isEmptyObject, isEmptyArray} from 'common/utils';
const groupRows = require('./RowGrouper');
const filterRows = require('./RowFilterer');
const sortRows = require('./RowSorter');

const getInputRows = (state) => state.rows;
const getFilters = (state) => state.filters;
const getFilteredRows = createSelector([getFilters, getInputRows], (filters, rows = []) => {
  if (!filters || isEmptyObject(filters)) {
    return rows;
  }
  return filterRows(filters, rows);
});

const getSortColumn = state => state.sortColumn;
const getSortDirection = state => state.sortDirection;
const getSortedRows = createSelector([getFilteredRows, getSortColumn, getSortDirection], (rows, sortColumn, sortDirection) => {
  if (!sortDirection && !sortColumn) {
    return rows;
  }
  return sortRows(rows, sortColumn, sortDirection);
});

const getGroupedColumns = (state) => state.groupBy;
const getExpandedRows = (state) => state.expandedRows;
const getFlattenedGroupedRows = createSelector([getSortedRows, getGroupedColumns, getExpandedRows], (rows, groupedColumns, expandedRows = {}) => {
  if (!groupedColumns || isEmptyObject(groupedColumns) || isEmptyArray(groupedColumns)) {
    return rows;
  }
  return groupRows(rows, groupedColumns, expandedRows);
});

const getSelectedKeys = (state) => state.selectedKeys;
const getRowKey = (state) => state.rowKey;
const getSelectedRowsByKey = createSelector([getRowKey, getSelectedKeys, getInputRows], (rowKey, selectedKeys, rows = []) => {
  return selectedKeys.map(k => {
    return rows.filter(r => {
      return r[rowKey] === k;
    })[0];
  });
});

const Selectors = {
  getRows: getFlattenedGroupedRows,
  getSelectedRowsByKey: getSelectedRowsByKey
};
module.exports = Selectors;
