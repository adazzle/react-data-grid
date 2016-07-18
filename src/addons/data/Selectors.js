import { createSelector } from 'reselect';
import isEmptyObject from '../utils/isEmptyObject';
import isEmptyArray from '../utils/isEmptyArray';
const groupRows = require('./RowGrouper');
const filterRows = require('./RowFilterer');

const getInputRows = (state) => state.rows;
const getFilters = (state) => state.filters;
const getFilteredRows = createSelector([getFilters, getInputRows], (filters, rows = []) => {
  if (!filters || isEmptyObject(filters)) {
    return rows;
  }
  return filterRows(filters, rows);
});

const getGroupedColumns = (state) => state.groupBy;
const getExpandedRows = (state) => state.expandedRows;
const getFlattenedGroupedRows = createSelector([getFilteredRows, getGroupedColumns, getExpandedRows], (rows, groupedColumns, expandedRows = {}) => {
  if (!groupedColumns || isEmptyObject(groupedColumns) || isEmptyArray(groupedColumns)) {
    return rows;
  }
  return groupRows(rows, groupedColumns, expandedRows);
});

const Selectors = {
  getRows: getFlattenedGroupedRows
};
module.exports = Selectors;
