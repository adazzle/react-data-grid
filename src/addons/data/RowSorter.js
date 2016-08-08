import isImmutableCollection from '../utils/isImmutableCollection';

const sortRows = (rows, sortColumn, sortDirection) => {
  const isImmutable = isImmutableCollection(rows);
  const retriever = (x, sCol) => { return x[sCol]; };
  const immutableRetriever =  (x, sCol) => { return x.get(sCol); };
  const valRetriever = !isImmutable ? retriever : immutableRetriever;

  let comparer = (a, b) => {
    if (sortDirection === 'ASC') {
      return (valRetriever(a, sortColumn) > valRetriever(b, sortColumn)) ? 1 : -1;
    } else if (sortDirection === 'DESC') {
      return (valRetriever(a, sortColumn) < valRetriever(b, sortColumn)) ? 1 : -1;
    }
    return true;
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.sort(comparer);
};

module.exports = sortRows;
