module.exports = function(stateValues, events) {
  return Object.assign({
    columnMetrics: {
      columns: [{
        key: 'id',
        name: 'ID',
        width: 100,
        left: 0,
        events: events[0]
      }, {
        key: 'title',
        name: 'Title',
        width: 100,
        left: 100
      }, {
        key: 'count',
        name: 'Count',
        width: 100,
        left: 200
      }, {
        key: 'country',
        name: 'Country',
        width: 100,
        left: 300,
        events: events[3]
      }],
      width: 400,
      totalWidth: 0,
      minColumnWidth: 80
    },
    selectedRows: [],
    selected: {
      rowIdx: 0,
      idx: 0
    },
    copied: null,
    canFilter: false,
    expandedRows: [],
    columnFilters: {},
    sortDirection: null,
    sortColumn: null,
    dragged: null,
    scrollOffset: 0,
    lastRowIdxUiSelected: -1
  }, stateValues);
};
