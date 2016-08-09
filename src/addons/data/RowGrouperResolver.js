import {List} from 'immutable';
import groupBy from 'lodash/groupBy';
import ValueRetriever from '../utils/mixedTypeValueRetriever';

export default class RowGrouperResolver {

  constructor(isImmutable) {
    const retriever = new ValueRetriever(isImmutable);

    this.isImmutable = isImmutable;
    this.dataviewRows = isImmutable ? new List() : [];
    this.getRowObj = retriever.getValue;
  }

  getGroupedRows(rows, columnName) {
    return this.isImmutable ? rows.groupBy(x => x.get(columnName)) : groupBy(rows, columnName);
  }

  getGroupKeys(groupedRows) {
    let getKeys = Object.keys;
    if (this.isImmutable) {
      getKeys = (col) => {
        let keys = [];
        let iterator = col.keys();
        let item = iterator.next();

        while (!item.done) {
          keys.push(item.value);
          item = iterator.next();
        }
        return keys;
      };
    }
    return getKeys(groupedRows);
  }

  addHeaderRow(rowGroupHeader) {
    let dvRows = this.dataviewRows.push(rowGroupHeader);
    if (this.isImmutable) {
      this.dataviewRows = dvRows;
    }
  }

  addRows(rows) {
    this.dataviewRows = this.dataviewRows.concat(rows);
  }
}
