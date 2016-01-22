const React         = require('react');
const rewire        = require('rewire');
const Header        = rewire('../Header');
const TestUtils     = require('react/lib/ReactTestUtils');
const rewireModule  = require('../../test/rewireModule');
const StubComponent = require('../../test/StubComponent');
const helpers       = require('./GridPropHelpers');

describe('Header Unit Tests', () => {
  let header;
  // Configure local letiable replacements for the module.
  let HeaderRowStub = new StubComponent('HeaderRow');

  rewireModule(Header, {
    HeaderRow: HeaderRowStub
  });

  let testProps = {
    columnMetrics: {
      columns: helpers.columns,
      minColumnWidth: 80,
      totalWidth: true,
      width: 2600
    },
    totalWidth: 1000,
    height: 50,
    headerRows: [{height: 50, ref: 'row'}],
    onColumnResize: function() {}
  };

  function shouldRenderDefaultRow() {
    let headerRows = TestUtils.scryRenderedComponentsWithType(header, HeaderRowStub);
    expect(headerRows.length).toEqual(1);
  }

  function shouldSetResizeState() {
    let resizeColIdx = 2;
    let newWidth = 350;
    header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    let headerRow = TestUtils.findRenderedComponentWithType(header, HeaderRowStub);
    headerRow.props.onColumnResize(helpers.columns[resizeColIdx], newWidth);
    expect(header.state.resizing.column.width).toEqual(newWidth);
    expect(header.state.resizing.column.key).toEqual(helpers.columns[resizeColIdx].key);
  }

  function shouldTriggerOnColumnResize() {
    let resizeColIdx = 1;
    spyOn(testProps, 'onColumnResize');
    header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    let headerRow = TestUtils.findRenderedComponentWithType(header, HeaderRowStub);
    headerRow.props.onColumnResizeEnd(helpers.columns[resizeColIdx], 200);
    expect(testProps.onColumnResize).toHaveBeenCalled();
    expect(testProps.onColumnResize.mostRecentCall.args[0]).toEqual(resizeColIdx);
    expect(testProps.onColumnResize.mostRecentCall.args[1]).toEqual(200);
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

  it('should render a default header row', () => {
    shouldRenderDefaultRow();
  });

  it('header row drag start should set resize column state ', () => {
    shouldSetResizeState();
  });

  it('header row drag end should trigger onColumnResize callback', () => {
    shouldTriggerOnColumnResize();
  });

  describe('When columns are immutable',  () => {
    beforeEach(() => {
      testProps.columnMetrics.columns = new Immutable.List(helpers.columns);
      header = TestUtils.renderIntoDocument(<Header {...testProps}/>);
    });

    it('should render a default header row', () => {
      shouldRenderDefaultRow();
    });

    it('header row drag start should set resize column state ', () => {
      shouldSetResizeState();
    });

    it('header row drag end should trigger onColumnResize callback', () => {
      shouldTriggerOnColumnResize();
    });
  });
});
