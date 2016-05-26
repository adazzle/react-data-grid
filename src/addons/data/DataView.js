import {getFlattenedGroupedRows} from './RowGrouper';

const DataView = {

  getSize(rows, options) {
    return this.getRows(rows, options).length;
  },

  getRows(rows, options) {
    let dataviewRows = rows;
    let groupedColumns = options.groupBy;
    if (groupedColumns && groupedColumns.length > 0) {
      dataviewRows = getFlattenedGroupedRows({rows, groupedColumns});
    }
    return dataviewRows;
  }
};

module.exports = DataView;
