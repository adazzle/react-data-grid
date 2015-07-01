'use strict';
var React         = require('react');
var rewire        = require('rewire');
var Header        = rewire('../Header');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");
var helpers       = require('./GridPropHelpers');

describe('Header Unit Tests', () => {
  var header;
  // Configure local variable replacements for the module.
  var HeaderRowStub = StubComponent('HeaderRow');

  rewireModule(Header, {
    HeaderRow    : HeaderRowStub
  });

  var testProps = {
    columnMetrics : {
      columns : helpers.columns,
      minColumnWidth: 80,
      totalWidth: true,
      width: 2600
    },
    totalWidth : 1000,
    height : 50,
    headerRows : [{height : 50, ref : 'row'}],
    onColumnResize : function(){}
  }

  beforeEach(() => {
    header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
  });

  it('should create a new instance of Header', () => {
    expect(header).toBeDefined();
  });

  it('should initialize the state correctly', () => {
    expect(header.state.resizing).toEqual(null);
  });


  it('should render a default header row', () => {
    var headerRows = TestUtils.scryRenderedComponentsWithType(header, HeaderRowStub);
    expect(headerRows.length).toEqual(1);
  });


  it('header row drag end should trigger onColumnResize callback', () => {
    var resizeColIdx = 1;
    spyOn(testProps, 'onColumnResize');
    header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    var headerRow = TestUtils.findRenderedComponentWithType(header, HeaderRowStub);
    headerRow.props.onColumnResizeEnd(helpers.columns[resizeColIdx], 200);
    expect(testProps.onColumnResize).toHaveBeenCalled();
    expect(testProps.onColumnResize.mostRecentCall.args[0]).toEqual(resizeColIdx);
    expect(testProps.onColumnResize.mostRecentCall.args[1]).toEqual(200);
  });

});
