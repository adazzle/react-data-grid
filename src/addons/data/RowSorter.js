const sortRows = (rows, sortColumn, sortDirection) => {
  let sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  let comparer = (a, b) => {
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirectionSign;
    } else if (a[sortColumn] < b[sortColumn]) {
      return -sortDirectionSign;
    }
    return 0;
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.sort(comparer);
};

module.exports = sortRows;
