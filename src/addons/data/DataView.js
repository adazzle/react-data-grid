import {groupBy} from 'lodash';

const DataView = {

  getSize(rows, options) {
    return this.getRows(rows, options).length;
  },

  getRows(rows, options) {
    let dataviewRows = rows;
    let groupedColumns = options.groupBy;
    if (groupBy && groupBy.length > 0) {
      dataviewRows = this.getFlattenedGroupedRows(rows, groupedColumns);
    }
    return dataviewRows;
  },

  getFlattenedGroupedRows(rows, groupedColumns) {
    let dataviewRows = [];
    let groupedRows = groupBy(rows, groupedColumns[0]);
    Object.keys(groupedRows).forEach(r => {
      let rowGroupHeader = {name: r, __metaData: {isGroup: true, treeDepth: 0, isExpanded: true, columnGroupName: groupedColumns[0]}};
      dataviewRows.push(rowGroupHeader);
      dataviewRows = dataviewRows.concat(groupedRows[r]);
    });
    return dataviewRows;
  }
};

module.exports = DataView;
