import ValueRetriever from '../utils/mixedTypeValueRetriever';
import isImmutableCollection from '../utils/isImmutableCollection';

const sortRows = (rows, sortColumn, sortDirection) => {
  const retriever = new ValueRetriever(isImmutableCollection(rows));
  let comparer = (a, b) => {
    if (sortDirection === 'ASC') {
      return (retriever.getValue(a, sortColumn) > retriever.getValue(b, sortColumn)) ? 1 : -1;
    } else if (sortDirection === 'DESC') {
      return (retriever.getValue(a, sortColumn) < retriever.getValue(b, sortColumn)) ? 1 : -1;
    }
    return true;
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.sort(comparer);
};

module.exports = sortRows;
