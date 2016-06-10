const React         = require('react');
const rewire        = require('rewire');
const HeaderCell    = rewire('../HeaderCell');
const TestUtils     = require('react/lib/ReactTestUtils');
const rewireModule  = require('../../test/rewireModule');
const StubComponent = require('../../test/StubComponent');

describe('Header Cell Tests', () => {
  // Configure local constiable replacements for the module.
  let ResizeHandleStub = new StubComponent('ResizeHandle');
  let headerCell;
  rewireModule(HeaderCell, {
    ResizeHandle: ResizeHandleStub
  });

  let testProps = {
    column: {
      width: 150,
      left: 300,
      name: 'bla',
      key: 'bla'
    },
    onResize: function() {
    },
    onResizeEnd: function() {
    },
    height: 50,
    name: 'bla'
  };

  beforeEach(() => {
    headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
  });

  it('should create a new instance of HeaderCell', () => {
    expect(headerCell).toBeDefined();
  });

  it('should initialize the state correctly', () => {
    expect(headerCell.state).toEqual(
      {resizing: false}
    );
  });

  describe('When custom render is supplied', () => {
    it('will render', () => {
      let CustomRenderer = new StubComponent('CustomRenderer');
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps} renderer={<CustomRenderer/>}/>);
      expect(TestUtils.findRenderedComponentWithType(headerCell, CustomRenderer)).toBeDefined();
    });

    it('will have height passed in props', () => {
      let CustomRenderer = new StubComponent('CustomRenderer');
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps} renderer={<CustomRenderer/>}/>);
      let cr = TestUtils.findRenderedComponentWithType(headerCell, CustomRenderer);
      expect(cr).toBeDefined();
      expect(cr.props.height).toBe(testProps.height);
    });
  });

  describe('When column is resizable', () => {
    beforeEach(() => {
      testProps.column.resizable = true;
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
    });

    afterEach(() => {
      testProps.column.resizable = false;
    });

    it('should render a resize handle', () => {
      let resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      expect(resizeHandle).toBeDefined();
    });

    it('start dragging handle should set resizing state to be true', () => {
      let resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      resizeHandle.props.onDragStart();
      expect(headerCell.state.resizing).toBe(true);
    });

    it('dragging handle should call onResize callback with width and column', () => {
      // arrange
      let dragLength = 200;
      spyOn(testProps, 'onResize');
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
      let resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      let fakeEvent = {pageX: dragLength};
      // act
      resizeHandle.props.onDrag(fakeEvent);
      // assert
      expect(testProps.onResize).toHaveBeenCalled();
      expect(testProps.onResize.mostRecentCall.args[0]).toEqual(testProps.column);
      expect(testProps.onResize.mostRecentCall.args[1]).toEqual(dragLength);
    });

    function simulateDragEnd(dragLength) {
      let fakeEvent = {pageX: dragLength};
      let resizeHandle = TestUtils.findRenderedComponentWithType(headerCell, ResizeHandleStub);
      resizeHandle.props.onDragEnd(fakeEvent);
    }

    it('finish dragging should reset resizing state', () => {
      headerCell.setState({resizing: true});
      simulateDragEnd(250);
      expect(headerCell.state.resizing).toBe(false);
    });

    it('finish dragging should call onResizeEnd with correct params', () => {
      spyOn(testProps, 'onResizeEnd');
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...testProps}/>);
      simulateDragEnd(250);
      expect(testProps.onResizeEnd).toHaveBeenCalled();
      expect(testProps.onResizeEnd.mostRecentCall.args[0]).toEqual(testProps.column);
      expect(testProps.onResizeEnd.mostRecentCall.args[1]).toEqual(250);
    });
  });
});
