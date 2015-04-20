'use strict';
var React         = require('react');
var rewire        = require('rewire');
var HeaderCell    = rewire('../HeaderCell');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");

describe('Header Cell Tests', () => {
  var headerCell;
  var ResizeHandleStub = StubComponent('ResizeHandle');

  // Configure local variable replacements for the module.
  rewireModule(HeaderCell, {
    ResizeHandle    : ResizeHandleStub
  });

  var testProps = {
    column : {
      width : 150,
      left : 300
    },
    onResize : function(){

    },
    height :50
  }

  beforeEach(() => {
    headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
  });

  it('should create a new instance of HeaderCell', () => {
    expect(headerCell).toBeDefined();
  });


  describe("When column is resizeable", () => {

    beforeEach(() => {
      testProps.column.resizeable = true;
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
    });

    afterEach(() => {
      testProps.column.resizeable = false;
    });

    it("should render a resize handle", () => {

      var resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      expect(resizeHandle).toBeDefined();
    });

  });





});
