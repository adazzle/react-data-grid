import isImmutableCollection from '../utils/isImmutableCollection';

function getRowCellStringValue(isImmutable, r, columnKey) {
  return (isImmutable ? r.get(columnKey) : r[columnKey]).toString().toLowerCase();
}

const filterRows = (filters, rows = []) => {
  const isImmutable = isImmutableCollection(rows);
  return rows.filter(r => {
    let include = true;
    for (let columnKey in filters) {
      if (filters.hasOwnProperty(columnKey)) {
        let colFilter = filters[columnKey];
        // check if custom filter function exists
        if (colFilter.filterValues && typeof colFilter.filterValues === 'function' && !colFilter.filterValues(r, colFilter, columnKey)) {
          include = false;
        } else if (typeof colFilter.filterTerm === 'string') {
          // default filter action
          let rowValue = getRowCellStringValue(isImmutable, r, columnKey);
          if (rowValue.indexOf(colFilter.filterTerm.toLowerCase()) === -1) {
            include = false;
          }
        }
      }
    }
    return include;
  });
};

module.exports = filterRows;
