import {getFlattenedGroupedRows} from './RowGrouper';
import {getFilteredRows} from './RowFilterer';
import { createSelector } from 'reselect';

const getRows = createSelector([getFilteredRows, getFlattenedGroupedRows], (rows, rows1, rows2) => {

});

const DataView = {

  getSize(rows, options) {
    return this.getRows(rows, options).length;
  },

  getRows(rows, options) {
    let dataviewRows = [];
    let groupedColumns = options.groupBy;
    let filters = options.filters;
    if (groupedColumns && groupedColumns.length > 0) {
      let expandedRows = options.expandedRows;
      dataviewRows = getFlattenedGroupedRows({rows, groupedColumns, expandedRows});
    }
    if (filters) {
      dataviewRows = getFilteredRows({dataviewRows, filters});
    }
    return dataviewRows;
  }
};

module.exports = DataView;
