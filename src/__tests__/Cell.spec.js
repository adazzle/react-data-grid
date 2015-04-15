'use strict';
var React        = require('react');
var rewire       = require('rewire');
var Cell         = rewire('../Cell');
var TestUtils    = require('react/lib/ReactTestUtils');
var rewireModule = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");

describe('Cell Tests', () => {
  var component;
  var ExcelColumnStub = StubComponent('ExcelColumn');
  var EditorContainerStub = StubComponent('EditorContainer');
  // Configure local variable replacements for the module.
  rewireModule(Cell, {
    ExcelColumn     : ExcelColumnStub,
    EditorContainer : EditorContainerStub
  });


  var testCellMetaData = {
      selected : {idx : 2, rowIdx : 3},
      dragged : null,
      onCellClick : function(){},
      onCellDoubleClick : function(){},
      onCommit : function(){},
      onCommitCancel : function(){},
      copied : null,
      handleDragEnterRow : function(){},
      handleTerminateDrag : function(){}
  }
  var testProps = {
    rowIdx : 0,
    idx : 1,
    tabIndex : 1,
    column: {},
    value: 'Dublin',
    isExpanded: false,
    cellMetaData: testCellMetaData,
    handleDragStart: function(){}
  }

  beforeEach(() => {
    var rowsCount = 1000;
    component = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
  });

  it('should create a new instance of Cell', () => {
    expect(component).toBeDefined();
  });


});
