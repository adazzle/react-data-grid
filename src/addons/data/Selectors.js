import { createSelector } from 'reselect';
import isEmptyObject from '../utils/isEmptyObject';
const RowGrouper = require('./RowGrouper');
const filterRows = require('./RowFilterer');

const getInputRows = (state) => state.rows;
const getFilters = (state) => state.filters;
const getFilteredRows = createSelector([ getFilters, getInputRows ], (filters, rows = []) => {
  if (!filters || isEmptyObject(filters)) {
    return rows;
  }
  return filterRows(filters, rows);
});


const getGroupedColumns = (state) => state.groupedColumns;
const getExpandedRows = (state) => state.expandedRows;
const getFlattenedGroupedRows = createSelector([getFilteredRows, getGroupedColumns, getExpandedRows], (rows, groupedColumns, expandedRows) => {
  if (!groupedColumns || isEmptyObject(groupedColumns)) {
    return rows;
  }
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows);
  return rowGrouper.groupRowsByColumn(rows, 0);
});

const Selectors = {
  getRows: getFlattenedGroupedRows
};
module.exports = Selectors;
