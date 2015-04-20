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
  var ViewportStub = React.createClass({
    getScroll(){
      return {scrollLeft : 0}
    },
    render(){
      return(<div></div>)
    }
  })

  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    Header   : HeaderStub,
    Viewport : ViewportStub
  });

  var testProps = {
    columns: helpers.columns,
    headerRows : [],
    rowsCount : helpers.rowsCount,
    rowGetter : helpers.rowGetter,
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




});
