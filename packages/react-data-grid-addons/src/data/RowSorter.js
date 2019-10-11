export const comparer = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

const sortRows = (rows, sortColumn, sortDirection) => {
  const sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  const rowComparer = (a, b) => {
    return sortDirectionSign * comparer(a[sortColumn], b[sortColumn]);
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.slice().sort(rowComparer);
};

export default sortRows;
