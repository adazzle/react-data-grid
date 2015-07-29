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
    shouldRenderDefaultRow();
  });

  it('header row drag start should set resize column state ', () => {
    shouldSetResizeState();
  });

  it('header row drag end should trigger onColumnResize callback', () => {
    shouldTriggerOnColumnResize();
  });

  describe('When columns are immutable',  () => {
    beforeEach(() => {
      testProps.columnMetrics.columns = new Immutable.List(helpers.columns);
      header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    });

    it('should render a default header row', () => {
      shouldRenderDefaultRow();
  });

  it('header row drag start should set resize column state ', () => {
                  debugger;
      shouldSetResizeState();
    });

    it('header row drag end should trigger onColumnResize callback', () => {

      shouldTriggerOnColumnResize();
    });
  });

  function shouldRenderDefaultRow() {
    var headerRows = TestUtils.scryRenderedComponentsWithType(header, HeaderRowStub);
    expect(headerRows.length).toEqual(1);
  }

  function shouldSetResizeState() {
    var resizeColIdx = 2;
    var newWidth = 350;
    header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    var headerRow = TestUtils.findRenderedComponentWithType(header, HeaderRowStub);
    headerRow.props.onColumnResize(helpers.columns[resizeColIdx], newWidth);
    expect(header.state.resizing.column.width).toEqual(newWidth);
    expect(header.state.resizing.column.key).toEqual(helpers.columns[resizeColIdx].key);

  }

  function shouldTriggerOnColumnResize() {
    var resizeColIdx = 1;
    spyOn(testProps, 'onColumnResize');
    header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    var headerRow = TestUtils.findRenderedComponentWithType(header, HeaderRowStub);
    headerRow.props.onColumnResizeEnd(helpers.columns[resizeColIdx], 200);
    expect(testProps.onColumnResize).toHaveBeenCalled();
    expect(testProps.onColumnResize.mostRecentCall.args[0]).toEqual(resizeColIdx);
    expect(testProps.onColumnResize.mostRecentCall.args[1]).toEqual(200);

  }
});
