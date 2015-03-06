/* @flow */
var Row = require('../build/ReactGrid').Row;
module.exports = function(start: number, end: number): Array<Row> {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
};
