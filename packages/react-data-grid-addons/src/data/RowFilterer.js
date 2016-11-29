import getMixedTypeValueRetriever from '../utils/mixedTypeValueRetriever';
import isImmutableCollection from '../utils/isImmutableCollection';

const filterRows = (filters, rows = []) => {
  const retriever = getMixedTypeValueRetriever(isImmutableCollection(rows));
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
          let rowValue = retriever.getValue(r, columnKey);
          if (rowValue) {
            if (rowValue.toString().toLowerCase().indexOf(colFilter.filterTerm.toLowerCase()) === -1) {
              include = false;
            }
          } else {
            include = false;
          }
        }
      }
    }
    return include;
  });
};

module.exports = filterRows;
