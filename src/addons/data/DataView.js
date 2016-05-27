import {getFlattenedGroupedRows} from './RowGrouper';

const DataView = {

  getSize(rows, options) {
    return this.getRows(rows, options).length;
  },

  getRows(rows, options) {
    let dataviewRows = rows;
    let groupedColumns = options.groupBy;
    if (groupedColumns && groupedColumns.length > 0) {
      let expandedRows = options.expandedRows;
      dataviewRows = getFlattenedGroupedRows({rows, groupedColumns, expandedRows});
    }
    return dataviewRows;
  }
};

module.exports = DataView;
