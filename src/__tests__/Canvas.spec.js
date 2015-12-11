'use strict';
var React        = require('react');
var rewire       = require('rewire');
var Canvas         = rewire('../Canvas');
var TestUtils    = require('react/lib/ReactTestUtils');
var rewireModule = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");

ddescribe('Canvas Tests', () => {
  var testElement;
  // Configure local variable replacements for the module.
  var setScrollLeftSpy = jasmine.createSpy('setScrollLeftSpy')
  rewireModule(Canvas, {
    setScrollLeft: setScrollLeftSpy
  });


  var testProps = {
    rowHeight: 25,
    height: 200,
    displayStart: 1,
    displayEnd: 10,
    rowsCount: 1,
    columns: [],
    rowGetter: function() { return [] },
    cellMetaData: {}
  }

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
  });

  it('should create a new instance of Canvas', () => {
    expect(testElement).toBeDefined();
  });

  it('Should not call setScroll on render', () => {
    setScrollLeftSpy.reset();
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    expect(setScrollLeftSpy).not.toHaveBeenCalled();
  });

  it('Should not call setScroll on update', () => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    spyOn(testElement, 'setScrollLeft');
    //force an update
    testElement.componentDidUpdate(testProps);
    expect(testElement.setScrollLeft).not.toHaveBeenCalled();
  });


});
