'use strict';
var React        = require('react');
var rewire       = require('rewire');
var Grid         =  rewire('../grids/ReactDataGrid.js');
var TestUtils    = require('react/lib/ReactTestUtils');
var rewireModule = require("../../../test/rewireModule");
var StubComponent = require("../../../test/StubComponent");

var columns = [
{
  key   : 'id',
  name  : 'ID',
  width : 100
},
{
  key: 'title',
  name: 'Title',
  width : 100
},
{
  key: 'count',
  name: 'Count',
  width : 100
},
]


var _rows = [];
for (var i = 0; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

var rowGetter = function(i){
  return _rows[i];
}

describe('Grid', () => {
  var component;

  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    BaseGrid : StubComponent('BaseGrid')
  });

  beforeEach(() => {
    var rowsCount = 1000;
    component = TestUtils.renderIntoDocument(<Grid
      columns={columns}
      rowGetter={rowGetter}
      rowsCount={_rows.length}
      width={300}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(component).toBeDefined();
  });




});
