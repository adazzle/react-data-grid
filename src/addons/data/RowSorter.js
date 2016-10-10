const sortRows = (rows, sortColumn, sortDirection) => {
  let sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
  let comparer = (a, b) => {
    if (a[sortColumn] === b[sortColumn]) {
      return 0;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirectionSign;
    }
    return -sortDirectionSign;
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.sort(comparer);
};

module.exports = sortRows;
