import {getFlattenedGroupedRows} from './RowGrouper';
import {getFilteredRows} from './RowFilterer';

const DataView = {

  getSize(rows, options) {
    return this.getRows(rows, options).length;
  },

  getRows(rows, options) {
    let dataviewRows = rows;
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
