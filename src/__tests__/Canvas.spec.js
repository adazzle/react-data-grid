'use strict';
var React        = require('react');
var rewire       = require('rewire');
var Canvas         = rewire('../Canvas');
var TestUtils    = require('react/lib/ReactTestUtils');
var rewireModule = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");
var jasmineReact = require("jasmine-react-helpers");

describe('Canvas Tests', () => {
  var testElement;

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
    jasmineReact.spyOnClass(Canvas, "setScrollLeft");
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    expect(jasmineReact.classPrototype(Canvas).setScrollLeft).not.toHaveBeenCalled();
  });

  it('Should not call setScroll on update', () => {
    jasmineReact.spyOnClass(Canvas, "setScrollLeft");
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    //force an update
    testElement.componentDidUpdate(testProps);
    expect(jasmineReact.classPrototype(Canvas).setScrollLeft).not.toHaveBeenCalled();
  });


});
