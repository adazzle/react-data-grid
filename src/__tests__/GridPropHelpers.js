let _rows = [];
for (let i = 0; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}
module.exports = {
  columns: [{
    key: 'id',
    name: 'ID',
    width: 100
  },
  {
    key: 'title',
    name: 'Title',
    width: 100
  },
  {
    key: 'count',
    name: 'Count',
    width: 100
  }
  ],
  rowGetter: function(i) {
    return _rows[i];
  },
  rowsCount: function() {
    return _rows.length;
  }
};
