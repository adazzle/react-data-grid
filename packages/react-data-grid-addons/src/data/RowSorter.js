import {getMixedTypeValueRetriever, isImmutableCollection} from 'common/utils';

const comparer = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
};

const sortRows = (rows, sortColumn, sortDirection) => {
  const retriever = getMixedTypeValueRetriever(isImmutableCollection(rows));
  let sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  let rowComparer = (a, b) => {
    return sortDirectionSign * comparer(retriever.getValue(a, sortColumn), retriever.getValue(b, sortColumn));
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.slice().sort(rowComparer);
};

module.exports = sortRows;
module.exports.comparer = comparer;
