const sortRows = (rows, sortColumn, sortDirection) => {
  let comparer = (a, b) => {
    if (sortDirection === 'ASC') {
      return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
    } else if (sortDirection === 'DESC') {
      return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
    }
  };
  if (sortDirection === 'NONE') {
    return rows;
  }
  return rows.sort(comparer);
};

module.exports = sortRows;
