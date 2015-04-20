'use strict';
var React         = require('react');
var rewire        = require('rewire');
var Grid          = rewire('../Grid');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");
var helpers       = require('./GridPropHelpers');

describe('Base Grid Tests', () => {
  var testElement;
  var headerScrollLeft
  var HeaderStub = React.createClass({
    setScrollLeft(scroll){
    },
    render(){
      return(<div></div>)
    }
  });
  var ViewportStub = React.createClass({
    setScrollLeft(scroll){
    },
    getScroll(){
      return {scrollLeft : 0}
    },
    render(){
      return(<div></div>)
    }
  });

  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    Header   : HeaderStub,
    Viewport : ViewportStub
  });

  var testProps = {
    columns: helpers.columns,
    headerRows : [],
    rowsCount : helpers.rowsCount(),
    rowGetter : helpers.rowGetter,
    rowOffsetHeight : 50,
    selectedRows : [],
    minHeight : 600,
    onViewportKeydown : function(){},
    onViewportDragStart : function(){},
    onViewportDragEnd : function(){},
    onViewportDoubleClick : function(){}
  }

  beforeEach(() => {
    var rowsCount = 1000;
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(testElement).toBeDefined();
  });


  it("keyboard input in viewport should call props.onViewportKeydown", () => {
    spyOn(testProps, 'onViewportKeydown');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    var viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.keyDown(viewportContainerNode, {key: "Enter"});
    expect(testProps.onViewportKeydown).toHaveBeenCalled();
  });

  it("doubleclick in viewport should call props.onViewportDoubleClick" ,() => {
    spyOn(testProps, 'onViewportDoubleClick');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    var viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.doubleClick(viewportContainerNode);
    expect(testProps.onViewportDoubleClick).toHaveBeenCalled();
  });

  it("dragstart in viewport should call props.onViewportDoubleClick" ,() => {
    spyOn(testProps, 'onViewportDragStart');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    var viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.dragStart(viewportContainerNode);
    expect(testProps.onViewportDragStart).toHaveBeenCalled();
  });

  it("dragend in viewport should call props.onViewportDragEnd" ,() => {
    spyOn(testProps, 'onViewportDragEnd');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    var viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.dragEnd(viewportContainerNode);
    expect(testProps.onViewportDragEnd).toHaveBeenCalled();
  });




});
