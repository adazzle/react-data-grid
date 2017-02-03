import { utils } from 'react-data-grid';
const { getMixedTypeValueRetriever, isImmutableCollection } = utils;

const filterRows = (filters, rows = []) => {
  return rows.filter(r => {
    const retriever = getMixedTypeValueRetriever(isImmutableCollection(r));
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
