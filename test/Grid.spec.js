'use strict';
var React = require('react/addons');
var rewire = require('rewire');
var Grid =  rewire('../src/addons/grids/ExcelGrid.js');
var BaseGrid = require('../src/Grid');
var TestUtils = React.addons.TestUtils;
var rewireModule = require("./rewireModule");

var columns = [
{
  key: 'id',
  name: 'ID',
  width: '20%'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count',
  width: '20%'
},
]

var getRows = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
}

describe('Grid', () => {
  var component;
  var ExcelCell = React.createFactory('div');
  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    ExcelCell: ExcelCell
  });

  beforeEach(() => {
    var rowsCount = 1000;
    component = TestUtils.renderIntoDocument(<Grid
      columns={columns}
      rowGetter={getRows(0, rowsCount)}
      rowsCount={rowsCount}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(component).toBeDefined();
  });

  it("should render a base grid with relevant props", () => {
    var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGrid);
    expect(baseGrid).toBeDefined();
  });


});
