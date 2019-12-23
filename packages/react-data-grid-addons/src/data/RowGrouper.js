import Resolver from './RowGrouperResolver';

class RowGrouper {
  constructor(columns, expandedRows) {
    this.columns = columns.slice(0);
    this.expandedRows = expandedRows;
    this.resolver = new Resolver();
  }

  isRowExpanded(columnName, name) {
    const expandedRowGroup = this.expandedRows[columnName];
    if (expandedRowGroup && expandedRowGroup[name]) {
      return expandedRowGroup[name].isExpanded;
    }
    return true;
  }

  groupRowsByColumn(rows, columnIndex = 0) {
    let nextColumnIndex = columnIndex;
    const columnName = this.columns.length > 0 && typeof this.columns[columnIndex] === 'string' ? this.columns[columnIndex] : this.columns[columnIndex].key;
    const columnGroupDisplayName = this.columns.length > 0 && typeof this.columns[columnIndex] === 'string' ? this.columns[columnIndex] : this.columns[columnIndex].name;
    const groupedRows = this.resolver.getGroupedRows(rows, columnName);
    const keys = this.resolver.getGroupKeys(groupedRows);
    let dataviewRows = this.resolver.initRowsCollection();

    for (const key of keys) {
      const isExpanded = this.isRowExpanded(columnName, key);
      const rowGroupHeader = { name: key, __metaData: { isGroup: true, treeDepth: columnIndex, isExpanded, columnGroupName: columnName, columnGroupDisplayName } };

      dataviewRows = this.resolver.addHeaderRow(rowGroupHeader, dataviewRows);

      if (isExpanded) {
        nextColumnIndex = columnIndex + 1;
        if (this.columns.length > nextColumnIndex) {
          dataviewRows = dataviewRows.concat(this.groupRowsByColumn(groupedRows[key], nextColumnIndex));
          nextColumnIndex = columnIndex - 1;
        } else {
          dataviewRows = dataviewRows.concat(groupedRows[key]);
        }
      }
    }
    return dataviewRows;
  }
}

const groupRows = (rows, groupedColumns, expandedRows) => {
  const rowGrouper = new RowGrouper(groupedColumns, expandedRows);
  return rowGrouper.groupRowsByColumn(rows, 0);
};

export default groupRows;
