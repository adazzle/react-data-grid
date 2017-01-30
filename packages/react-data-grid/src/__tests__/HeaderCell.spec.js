const React         = require('react');
const rewire        = require('rewire');
const HeaderCell    = rewire('../HeaderCell');
const TestUtils     = require('react-addons-test-utils');
const rewireModule  = require('../../../../test/rewireModule');
const StubComponent = require('../../../../test/StubComponent');
import SortableHeaderCell from '../cells/headerCells/SortableHeaderCell';

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
      expect(testProps.onResize.calls.mostRecent().args[0]).toEqual(testProps.column);
      expect(testProps.onResize.calls.mostRecent().args[1]).toEqual(dragLength);
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
      expect(testProps.onResizeEnd.calls.mostRecent().args[0]).toEqual(testProps.column);
      expect(testProps.onResizeEnd.calls.mostRecent().args[1]).toEqual(250);
    });
  });

  describe('getCell method', () => {
    it('pass the column as property to cell renderer if it is a function', () => {
      let rendererFunction = jasmine.createSpy();
      let props = Object.assign({}, testProps, {renderer: rendererFunction});
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...props}/>);
      headerCell.getCell();
      expect(rendererFunction.calls.argsFor(0)[0]).toEqual({column: props.column});
    });
    it('should not pass the column as property to cell renderer if it is an HTML element', () => {
      let renderer = <div>Value</div>;
      let props = Object.assign({}, testProps, {renderer: renderer});
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...props}/>);
      let cell = headerCell.getCell();
      expect(cell.props.column).toBeUndefined();
    });
    it('should pass the column as property to cell renderer if it is a React class', () => {
      let renderer = <SortableHeaderCell columnKey="colKey" onSort={jasmine.createSpy()} />;
      let props = Object.assign({}, testProps, {renderer: renderer});
      headerCell = TestUtils.renderIntoDocument(<HeaderCell {...props}/>);
      let cell = headerCell.getCell();
      expect(cell.props.column).toBe(props.column);
    });
  });
});
