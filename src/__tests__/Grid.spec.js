/*eslint no-var:0, no-console:0 */
'use strict';
var React         = require('react');
var rewire        = require('rewire');
var Grid          = rewire('../Grid');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require('../../test/rewireModule');
var helpers       = require('./GridPropHelpers');

var testElement;
var HeaderStub = React.createClass({
  render() {
    return (<div></div>);
  },
  setScrollLeft(scroll) {
    console.log('setScrollLeft: ', scroll);
  }
});
var ViewportStub = React.createClass({
  getScroll() {
    return {scrollLeft: 0};
  },
  render() {
    return (<div></div>);
  },
  setScrollLeft(scroll) {
    console.log('setScrollLeft: ', scroll);
  }
});

describe('Base Grid Tests', () => {
  var testProps = {
    columnMetrics: {
      columns: helpers.columns,
      minColumnWidth: 80,
      totalWidth: true,
      width: 2600
    },
    headerRows: [],
    rowsCount: helpers.rowsCount(),
    rowGetter: helpers.rowGetter,
    rowOffsetHeight: 50,
    selectedRows: [],
    minHeight: 600,
    onViewportKeydown: function() {},
    onViewportDragStart: function() {},
    onViewportDragEnd: function() {},
    onViewportDoubleClick: function() {}
  };

  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    Header: HeaderStub,
    Viewport: ViewportStub
  });

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(testElement).toBeDefined();
  });


  it('keyboard input in viewport should call props.onViewportKeydown', () => {
    var viewportContainerNode;
    spyOn(testProps, 'onViewportKeydown');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.keyDown(viewportContainerNode, {key: 'Enter'});
    expect(testProps.onViewportKeydown).toHaveBeenCalled();
  });

  it('doubleclick in viewport should call props.onViewportDoubleClick', () => {
    var viewportContainerNode;
    spyOn(testProps, 'onViewportDoubleClick');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.doubleClick(viewportContainerNode);
    expect(testProps.onViewportDoubleClick).toHaveBeenCalled();
  });

  it('dragstart in viewport should call props.onViewportDoubleClick', () => {
    var viewportContainerNode;
    spyOn(testProps, 'onViewportDragStart');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.dragStart(viewportContainerNode);
    expect(testProps.onViewportDragStart).toHaveBeenCalled();
  });

  it('dragend in viewport should call props.onViewportDragEnd', () => {
    var viewportContainerNode;
    spyOn(testProps, 'onViewportDragEnd');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = testElement.refs.viewPortContainer.getDOMNode();
    TestUtils.Simulate.dragEnd(viewportContainerNode);
    expect(testProps.onViewportDragEnd).toHaveBeenCalled();
  });
});

describe('Empty Grid Tests', () => {
  var EmptyRowsView = React.createClass({
    render: function() {
      return (<div>Nothing to show</div>);
    }
  });

  var testProps = {
    columnMetrics: {
      columns: helpers.columns
    },
    headerRows: [],
    rowsCount: 0,
    rowGetter: function() {
      return [];
    },
    minHeight: 600,
    emptyRowsView: EmptyRowsView
  };
  rewireModule(Grid, {
    Header: HeaderStub
  });

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(testElement).toBeDefined();
  });

  it('should not have any viewport', () => {
    expect(testElement.refs.viewPortContainer).not.toBeDefined();
    expect(testElement.refs.emptyView).toBeDefined();
  });
});
