import groupBy from 'lodash/groupby';

class RowGrouper {

  constructor(columns, expandedRows) {
    this.columns = columns.slice(0);
    this.expandedRows = expandedRows;
  }

  isRowExpanded(columnName, name) {
    let isExpanded = true;
    let expandedRowGroup = this.expandedRows[columnName];
    if (expandedRowGroup && expandedRowGroup[name]) {
      isExpanded = expandedRowGroup[name].isExpanded;
    }
    return isExpanded;
  }

  groupRowsByColumn(rows, columnIndex = 0) {
    let nextColumnIndex = columnIndex;
    let dataviewRows = [];
    let columnName = this.columns[columnIndex];
    let groupedRows = groupBy(rows, columnName);
    Object.keys(groupedRows).forEach(r => {
      let isExpanded = this.isRowExpanded(columnName, r);
      let rowGroupHeader = {name: r, __metaData: {isGroup: true, treeDepth: columnIndex, isExpanded: isExpanded, columnGroupName: columnName}};
      dataviewRows.push(rowGroupHeader);
      if (isExpanded) {
        nextColumnIndex = columnIndex + 1;
        if (this.columns.length > nextColumnIndex) {
          dataviewRows = dataviewRows.concat(this.groupRowsByColumn(groupedRows[r], nextColumnIndex));
          nextColumnIndex = columnIndex - 1;
        } else {
          dataviewRows = dataviewRows.concat(groupedRows[r]);
        }
      }
    });
    return dataviewRows;
  }
}

const groupRows = (rows, groupedColumns, expandedRows) => {
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows);
  return rowGrouper.groupRowsByColumn(rows, 0);
};

module.exports = groupRows;

