import groupBy from 'lodash/groupby';
import isImmutableCollection from '../utils/isImmutableCollection';
import {List} from 'immutable';

class RowGrouper {

  constructor(columns, expandedRows) {
    this.columns = columns.slice(0);
    this.expandedRows = expandedRows;
    this.isImmutable = null;
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
    if (!this.isImmutable) { this.isImmutable = isImmutableCollection(rows); }

    let dataviewRows = this.isImmutable ? new List() : [];
    let nextColumnIndex = columnIndex;
    let columnName = this.columns[columnIndex];
    let groupedRows = this.isImmutable ? rows.groupBy(x => x.get(columnName)) : groupBy(rows, columnName);
    let keysCollection = this.isImmutable ? groupedRows.keys() : Object.keys(groupedRows);

    for(const key of keysCollection) {
      let isExpanded = this.isRowExpanded(columnName, key);
      let rowGroupHeader = {name: key, __metaData: {isGroup: true, treeDepth: columnIndex, isExpanded: isExpanded, columnGroupName: columnName}};

      if (!this.isImmutable) {
        dataviewRows.push(rowGroupHeader);
      } else {
        dataviewRows = dataviewRows.push(rowGroupHeader);
      }

      if (isExpanded) {
        nextColumnIndex = columnIndex + 1;
        if (this.columns.length > nextColumnIndex) {
          dataviewRows = dataviewRows.concat(this.groupingFunc(this.isImmutable ? groupedRows.get(key) : groupedRows[key], nextColumnIndex));
          nextColumnIndex = columnIndex - 1;
        } else {
          dataviewRows = dataviewRows.concat(this.isImmutable ? groupedRows.get(key) : groupedRows[key]);
        }
      }
    }
    return dataviewRows;
  }
}

const groupRows = (rows, groupedColumns, expandedRows) => {
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows);
  return rowGrouper.groupRowsByColumn(rows, 0);
};

module.exports = groupRows;

