import {groupBy} from 'lodash';
import { createSelector } from 'reselect';
const getInputRows = (state) => state.rows;
const getGroupedColumns = (state) => state.groupedColumns;
const getExpandedRows = (state) => state.expandedRows;

export default class RowGrouper {

  constructor(columns, expandedRows) {
    this.columns = columns.slice(0);
    this.expandedRows = expandedRows;
  }

  isRowExpanded(columnName) {
    let isExpanded = true;
    expandedRowGroup = expandedRows[columnName];
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
      let rowGroupHeader = {name: r, __metaData: {isGroup: true, treeDepth: columnIndex, isExpanded: this.isRowExpanded(columnName), columnGroupName: columnName}};
      dataviewRows.push(rowGroupHeader);
      nextColumnIndex = columnIndex + 1;
      if (this.columns.length > nextColumnIndex) {
        dataviewRows = dataviewRows.concat(this.groupRowsByColumn(groupedRows[r], nextColumnIndex));
        nextColumnIndex = columnIndex - 1;
      } else {
        dataviewRows = dataviewRows.concat(groupedRows[r]);
      }
    });
    return dataviewRows;
  }
}

export const getFlattenedGroupedRows = createSelector([getInputRows, getGroupedColumns, getExpandedRows], (rows, groupedColumns) => {
  let rowGrouper = new RowGrouper(groupedColumns, expandedRows);
  return rowGrouper.groupRowsByColumn(rows, 0);
});
