import isImmutableCollection from '../utils/isImmutableCollection';
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
    let columnName = this.columns[columnIndex];
    let groupedRows = this.resolver.getGroupedRows(rows, columnName);
    let keys = this.resolver.getGroupKeys(groupedRows);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let isExpanded = this.isRowExpanded(columnName, key);
      let rowGroupHeader = {name: key, __metaData: {isGroup: true, treeDepth: columnIndex, isExpanded: isExpanded, columnGroupName: columnName}};

      this.resolver.addHeaderRow(rowGroupHeader);

      if (isExpanded) {
        nextColumnIndex = columnIndex + 1;
        if (this.columns.length > nextColumnIndex) {
          this.resolver.addRows(this.groupRowsByColumn(this.resolver.getRowObj(groupedRows, key), nextColumnIndex));
          nextColumnIndex = columnIndex - 1;
        } else {
          this.resolver.addRows(this.resolver.getRowObj(groupedRows, key));
        }
      }
    }
    return this.resolver.dataviewRows;
  }
}

const groupRows = (rows, groupedColumns, expandedRows) => {
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows, isImmutableCollection(rows));
  return rowGrouper.groupRowsByColumn(rows, 0);
};

module.exports = groupRows;
