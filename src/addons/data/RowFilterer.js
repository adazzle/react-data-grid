import { createSelector } from 'reselect';

const getFilter = (state) => state.filters;
const getRows = (state) => state.rows;

export const getFilteredRows = createSelector(
  [ getFilter, getRows ],
  (filters, rows = []) => {
    return rows.filter(r => {
      let include = true;
      for (let columnKey in filters) {
        if (filters.hasOwnProperty(columnKey)) {
          if (!r[columnKey]) {
            include = false;
          } else {
            let rowValue = r[columnKey].toString().toLowerCase();
            if (rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
              include = false;
            }
          }
        }
      }
      return include;
    });
  }
);
