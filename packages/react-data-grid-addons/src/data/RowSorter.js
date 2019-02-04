import { getMixedTypeValueRetriever, isImmutableCollection } from 'common/utils';

export const comparer = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
};

const sortRows = (rows, sortColumn, sortDirection) => {
  const retriever = getMixedTypeValueRetriever(isImmutableCollection(rows));
  const sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  const rowComparer = (a, b) => {
    return sortDirectionSign * comparer(retriever.getValue(a, sortColumn), retriever.getValue(b, sortColumn));
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.slice().sort(rowComparer);
};

export default sortRows;


