import { createSelector } from 'reselect';
import RowGrouper from './RowGrouper';
import filterRows from '/RowFilterer';

const getInputRows = (state) => state.rows;
const getFilters = (state) => state.filters;
const getFilteredRows = createSelector([ getFilters, getInputRows ], (filters, rows = []) => {
  return filterRows(filters, rows);
});


const getGroupedColumns = (state) => state.groupedColumns;
const getExpandedRows = (state) => state.expandedRows;
const getFlattenedGroupedRows = createSelector([getFilteredRows, getGroupedColumns, getExpandedRows], (rows, groupedColumns, expandedRows) => {
  if (!groupedColumns) {
    return rows;
  }
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows);
  return rowGrouper.groupRowsByColumn(rows, 0);
});

export default getFlattenedGroupedRows;
