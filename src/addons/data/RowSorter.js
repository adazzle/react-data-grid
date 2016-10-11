const comparer = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
};

const sortRows = (rows, sortColumn, sortDirection) => {
  let sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  let rowComparer = (a, b) => {
    return sortDirectionSign * comparer(a[sortColumn], b[sortColumn]);
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.sort(rowComparer);
};

module.exports = sortRows;
module.exports.comparer = comparer;
