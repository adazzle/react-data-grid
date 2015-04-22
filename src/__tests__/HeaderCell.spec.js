'use strict';
var React         = require('react');
var rewire        = require('rewire');
var HeaderCell    = rewire('../HeaderCell');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");
var ResizeHandle  = require('../ResizeHandle');
var Draggable     = require('../Draggable');

describe('Header Cell Tests', () => {
  var headerCell;
  // Configure local variable replacements for the module.
  var ResizeHandleStub = StubComponent('ResizeHandle');

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
    onResizeEnd : function(){

    },
    height :50
  }

  beforeEach(() => {
    headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
  });

  it('should create a new instance of HeaderCell', () => {
    expect(headerCell).toBeDefined();
  });

  it('should initialize the state correctly', () => {
    expect(headerCell.state).toEqual(
      {resizing : false}
    );
  });

  it('will render a custom renderer if supplied', () => {
    var CustomRenderer = StubComponent('CustomRenderer');
    headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps} renderer={CustomRenderer}/>);
    expect(TestUtils.findRenderedComponentWithType(headerCell, CustomRenderer)).toBeDefined();
  });


  describe("When column is resizable", () => {

    beforeEach(() => {
      testProps.column.resizable = true;
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
    });

    afterEach(() => {
      testProps.column.resizable = false;
    });

    it("should render a resize handle", () => {
      var resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      expect(resizeHandle).toBeDefined();
    });

    it("start dragging handle should set resizing state to be true", () => {
      var resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      resizeHandle.props.onDragStart();
      expect(headerCell.state.resizing).toBe(true);
    });

    it("dragging handle should call onResize callback with width and column", () => {
      //arrange
      var dragLength = 200;
      spyOn(testProps, 'onResize');
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
      var resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      var fakeEvent = {pageX : dragLength};
      //act
      resizeHandle.props.onDrag(fakeEvent);
      //assert
      expect(testProps.onResize).toHaveBeenCalled();
      expect(testProps.onResize.mostRecentCall.args[0]).toEqual(testProps.column);
      expect(testProps.onResize.mostRecentCall.args[1]).toEqual(dragLength);
    });

    function SimulateDragEnd(dragLength){
      var dragLength = dragLength;
      var fakeEvent = {pageX : dragLength};
      var resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      resizeHandle.props.onDragEnd(fakeEvent);
    };

    it("finish dragging should reset resizing state", () => {
      headerCell.setState({resizing : true});
      SimulateDragEnd(250);
      expect(headerCell.state.resizing).toBe(false);
    });

    it("finish dragging should call onResizeEnd with correct params", () => {
      spyOn(testProps, 'onResizeEnd');
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
      SimulateDragEnd(250);
      expect(testProps.onResizeEnd).toHaveBeenCalled();
      expect(testProps.onResizeEnd.mostRecentCall.args[0]).toEqual(testProps.column);
      expect(testProps.onResizeEnd.mostRecentCall.args[1]).toEqual(250);
    });

  });





});
