module.exports = function(stateValues, events) {
  return Object.assign({
    columnMetrics: {
      columns: [{
        idx: 0,
        key: 'id',
        name: 'ID',
        width: 100,
        left: 0,
        events: events[0]
      }, {
        idx: 1,
        key: 'title',
        name: 'Title',
        width: 100,
        left: 100
      }, {
        idx: 2,
        key: 'count',
        name: 'Count',
        width: 100,
        left: 200
      }, {
        idx: 3,
        key: 'country',
        name: 'Country',
        width: 100,
        left: 300,
        events: events[3]
      }],
      width: 400,
      totalWidth: 0,
      totalColumnWidth: 400,
      minColumnWidth: 80
    },
    selectedRows: [],
    canFilter: false,
    expandedRows: [],
    columnFilters: {},
    sortDirection: null,
    sortColumn: null,
    scrollOffset: 0,
    lastRowIdxUiSelected: -1
  }, stateValues);
};
