import {isImmutableCollection} from 'common/utils';
import Resolver from './RowGrouperResolver';


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
    const columnGroupDisplayName = this.columns.length > 0 && typeof this.columns[columnIndex] === 'string' ? this.columns[columnIndex] : this.columns[columnIndex].name;
    let groupedRows = this.resolver.getGroupedRows(rows, columnName);
    let keys = this.resolver.getGroupKeys(groupedRows);
    let dataviewRows = this.resolver.initRowsCollection();

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let isExpanded = this.isRowExpanded(columnName, key);
      let rowGroupHeader = {name: key, __metaData: {isGroup: true, treeDepth: columnIndex, isExpanded: isExpanded, columnGroupName: columnName, columnGroupDisplayName}};

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
