const React         = require('react');
const ReactDOM = require('react-dom');
const rewire        = require('rewire');
const Grid          = rewire('../Grid');
const TestUtils     = require('react-addons-test-utils');
const helpers       = require('./GridPropHelpers');
const rewireModule = require('../../test/rewireModule');

let testElement;
let HeaderStub = React.createClass({
  setScrollLeft() {
  },
  render() {
    return (<div></div>);
  }
});
let ViewportStub = React.createClass({
  getScroll() {
    return {scrollLeft: 0};
  },
  setScrollLeft() {
  },
  render() {
    return (<div></div>);
  }
});

describe('Base Grid Tests', () => {
  let testProps = {
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

  // Configure local letiable replacements for the module.
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
    let viewportContainerNode;
    spyOn(testProps, 'onViewportKeydown');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = ReactDOM.findDOMNode(testElement.refs.viewPortContainer);
    TestUtils.Simulate.keyDown(viewportContainerNode, {key: 'Enter'});
    expect(testProps.onViewportKeydown).toHaveBeenCalled();
  });

  it('doubleclick in viewport should call props.onViewportDoubleClick', () => {
    let viewportContainerNode;
    spyOn(testProps, 'onViewportDoubleClick');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = ReactDOM.findDOMNode(testElement.refs.viewPortContainer);
    TestUtils.Simulate.doubleClick(viewportContainerNode);
    expect(testProps.onViewportDoubleClick).toHaveBeenCalled();
  });

  it('dragstart in viewport should call props.onViewportDoubleClick', () => {
    let viewportContainerNode;
    spyOn(testProps, 'onViewportDragStart');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = ReactDOM.findDOMNode(testElement.refs.viewPortContainer);
    TestUtils.Simulate.dragStart(viewportContainerNode);
    expect(testProps.onViewportDragStart).toHaveBeenCalled();
  });

  it('dragend in viewport should call props.onViewportDragEnd', () => {
    let viewportContainerNode;
    spyOn(testProps, 'onViewportDragEnd');
    testElement = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
    viewportContainerNode = ReactDOM.findDOMNode(testElement.refs.viewPortContainer);
    TestUtils.Simulate.dragEnd(viewportContainerNode);
    expect(testProps.onViewportDragEnd).toHaveBeenCalled();
  });
});

describe('Empty Grid Tests', () => {
  let EmptyRowsView = React.createClass({
    render: function() {
      return (<div>Nothing to show</div>);
    }
  });

  let testProps = {
    columnMetrics: {
      columns: helpers.columns
    },
    headerRows: [],
    rowsCount: 0,
    rowOffsetHeight: 50,
    rowGetter: function() {
      return [];
    },
    minHeight: 600,
    emptyRowsView: EmptyRowsView,
    onViewportKeydown: () => {},
    onViewportDragStart: () => {},
    onViewportDragEnd: () => {},
    onViewportDoubleClick: () => {}
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
