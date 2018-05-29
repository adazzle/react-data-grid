import { utils } from 'react-data-grid';
import Resolver from './RowGrouperResolver';
const { isImmutableCollection } = utils;

class RowGrouper {

  constructor(columns, expandedRows, isImmutable = false) {
    this.columns = columns.slice(0);
    this.expandedRows = expandedRows;
    this.resolver = new Resolver(isImmutable);
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
    let columnName = this.columns.length > 0 && typeof this.columns[columnIndex] === 'string' ? this.columns[columnIndex] : this.columns[columnIndex].key;
    let groupedRows = this.resolver.getGroupedRows(rows, columnName);
    let keys = this.resolver.getGroupKeys(groupedRows);
    let dataviewRows = this.resolver.initRowsCollection();

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let count = 0;
      let isExpanded = this.isRowExpanded(columnName, key);
      if (groupedRows) {
        count = groupedRows[key] ? groupedRows[key].length : 0;
      }
      let rowGroupHeader = { name: key, groupedRowCount: count, __metaData: { isGroup: true, treeDepth: columnIndex, isExpanded: isExpanded, columnGroupName: columnName } };

      dataviewRows = this.resolver.addHeaderRow(rowGroupHeader, dataviewRows);

      if (isExpanded) {
        nextColumnIndex = columnIndex + 1;
        if (this.columns.length > nextColumnIndex) {
          dataviewRows = dataviewRows.concat(this.groupRowsByColumn(this.resolver.getRowObj(groupedRows, key), nextColumnIndex));
          nextColumnIndex = columnIndex - 1;
        } else {
          dataviewRows = dataviewRows.concat(this.resolver.getRowObj(groupedRows, key));
        }
      }
    }
    return dataviewRows;
  }
}

const groupRows = (rows, groupedColumns, expandedRows) => {
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows, isImmutableCollection(rows));
  return rowGrouper.groupRowsByColumn(rows, 0);
};

module.exports = groupRows;
