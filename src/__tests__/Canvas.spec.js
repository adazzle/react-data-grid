'use strict';
var React        = require('react');
var rewire       = require('rewire');
var Canvas         = rewire('../Canvas');
var TestUtils    = require('react/lib/ReactTestUtils');
var rewireModule = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");

describe('Canvas Tests', () => {
  var testElement;
  // Configure local variable replacements for the module.
  rewireModule(Canvas, {

  });



  var testProps = {
    rowHeight: 25,
    height: 200,
    displayStart: 1,
    displayEnd: 10,
    rowsCount: 1,
    columns: [],
    rowGetter: function() { return [] }
  }

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
  });

  it('should create a new instance of Cell', () => {
    expect(testElement).toBeDefined();
  });

  it('Should not call setScroll on render', () => {
    spyOn(Canvas, 'setScrollLeft');
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    expect(Canvas.setScrollLeft).not.toHaveBeenCalled();
  });


});
