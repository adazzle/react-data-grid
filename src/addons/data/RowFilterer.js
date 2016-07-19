const filterRows = (filters, rows = []) => {
  return rows.filter(r => {
    let include = true;
    for (let columnKey in filters) {
      if (filters.hasOwnProperty(columnKey) && typeof filters[columnKey] === 'string') {
        let rowValue = r[columnKey].toString().toLowerCase();
        if (rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
          include = false;
        }
      } else if (filters.hasOwnProperty(columnKey) && filters[columnKey] !== undefined && filters[columnKey].length > 0) {
        let rowValue = r[columnKey];
        if (filters[columnKey].indexOf(rowValue) === -1) {
          include = false;
        }
      }
    }
    return include;
  });
};

module.exports = filterRows;
