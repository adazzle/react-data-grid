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
    columns : {
      columns : helpers.columns,
      minColumnWidth: 80,
      totalWidth: true,
      width: 2600
    },
    totalWidth : 1000,
    height : 50,
    headerRows : [{height : 50, ref : 'row'}]
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

});
