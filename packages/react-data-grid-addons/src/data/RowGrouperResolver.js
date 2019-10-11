import groupBy from 'lodash/groupBy';
import { getMixedTypeValueRetriever } from '../utils';

export default class RowGrouperResolver {
  constructor() {
    this.getRowObj = getMixedTypeValueRetriever().getValue;
  }

  initRowsCollection() {
    return [];
  }

  getGroupedRows(rows, columnName) {
    return groupBy(rows, columnName);
  }

  getGroupKeys(groupedRows) {
    return Object.keys(groupedRows);
  }

  addHeaderRow(rowGroupHeader, dataviewRows) {
    return [...dataviewRows, rowGroupHeader];
  }
}
