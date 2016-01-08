var mergeInto = require("../../src/mergeInto");
var Grid = require('../../src/Grid');
var ReactDOM = require('react-dom');

var data = [];
for (var i = 0; i < 2000; i++) {
  data.push({
    'key': i,
    'supplier':{'value':'Supplier ' + i, 'editing':true},
    'format': 'fmt ' + i,
    'start':'start',
    'end':'end',
    'price':i });
};


function rows(start, end) {
  return data.slice(start, end);
}

var columns = [

  {
    idx: 0,
    name: 'Supplier',
    key: 'supplier',
    width: 300,
    locked: true,
  },
  {
    idx: 1,
    name: 'Format',
    key: 'format',
    width: 350,
  },
  {
    idx: 2,
    name: 'Start',
    key: 'start',
    width: 250,
  },
  {
    idx: 3,
    name: 'End',
    key: 'end',
    width: 250,
  },
  {
    idx: 4,
    name: 'Cost',
    key: 'cost',
    width: 200,
  }
];

var getGrid = function(args) {
  args = args || {};
  mergeInto(args, {
    columns: columns,
    rows: rows,
    removeFreezeCols: false,
    dataLength: data.length,
    rowHeight:40
  });
  return Grid({columns:args.columns, rows: args.rows, length: args.dataLength, height: args.height});
};
var renderGrid = function(args) {
    return ReactDOM.render(getGrid(args),
      document.getElementById(args.containerId));
};
module.exports = {
  getGrid: getGrid,
  renderGrid: renderGrid
};
