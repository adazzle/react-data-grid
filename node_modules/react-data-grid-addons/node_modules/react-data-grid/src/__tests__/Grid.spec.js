const React         = require('react');
const ReactDOM = require('react-dom');
const rewire        = require('rewire');
const Grid          = rewire('../Grid');
const TestUtils     = require('react-addons-test-utils');
const helpers       = require('../helpers/test/GridPropHelpers');
const rewireModule = require('../../../../test/rewireModule');
import { shallow } from 'enzyme';
import { ContextMenu } from 'react-contextmenu';

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

describe('Rendering Grid component', () => {
  const renderComponent = (props) => {
    const wrapper = shallow(<Grid {...props} />);
    return wrapper;
  };

  const allProperties = () => {
    return {
      rowGetter: jasmine.createSpy(),
      columns: helpers.columns,
      columnMetrics: {
        columns: helpers.columns,
        width: 1200
      },
      minHeight: 500,
      totalWidth: 700,
      headerRows: [],
      rowHeight: 50,
      rowRenderer: jasmine.createSpy(),
      emptyRowsView: jasmine.createSpy(),
      expandedRows: jasmine.createSpy(),
      selectedRows: jasmine.createSpy(),
      rowSelection: {isSelectedKey: 'selectedKey'},
      rowsCount: 14,
      onRows: jasmine.createSpy(),
      sortColumn: 'sortColumn',
      sortDirection: 'ASC',
      rowOffsetHeight: 100,
      onViewportKeydown: jasmine.createSpy(),
      onViewportKeyup: jasmine.createSpy(),
      onViewportDragStart: jasmine.createSpy(),
      onViewportDragEnd: jasmine.createSpy(),
      onViewportDoubleClick: jasmine.createSpy(),
      onColumnResize: jasmine.createSpy(),
      onSort: jasmine.createSpy(),
      cellMetaData: {
        selected: {idx: 2, rowIdx: 3},
        dragged: null,
        onCellClick: jasmine.createSpy(),
        onCellContextMenu: jasmine.createSpy(),
        onCellDoubleClick: jasmine.createSpy(),
        onCommit: jasmine.createSpy(),
        onCommitCancel: jasmine.createSpy(),
        copied: null,
        handleDragEnterRow: jasmine.createSpy(),
        handleTerminateDrag: jasmine.createSpy(),
        onColumnEvent: jasmine.createSpy()
      },
      rowKey: 'rowKeyValue',
      rowScrollTimeout: 300,
      contextMenu: <ContextMenu />,
      getSubRowDetails: jasmine.createSpy(),
      draggableHeaderCell: jasmine.createSpy(),
      getValidFilterValues: jasmine.createSpy(),
      rowGroupRenderer: jasmine.createSpy(),
      overScan: {key: 'value'}
    };
  };
  it('passes classname property', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.hasClass('react-grid-Grid'));
  });
  it('passes style property', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().style).toBeDefined();
  });
  it('does not pass unknown properties to the div', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().rowGetter).toBeUndefined();
    expect(draggableDiv.props().columns).toBeUndefined();
    expect(draggableDiv.props().columnMetrics).toBeUndefined();
    expect(draggableDiv.props().minHeight).toBeUndefined();
    expect(draggableDiv.props().totalWidth).toBeUndefined();
    expect(draggableDiv.props().headerRows).toBeUndefined();
    expect(draggableDiv.props().rowHeight).toBeUndefined();
    expect(draggableDiv.props().rowRenderer).toBeUndefined();
    expect(draggableDiv.props().emptyRowsView).toBeUndefined();
    expect(draggableDiv.props().expandedRows).toBeUndefined();
    expect(draggableDiv.props().selectedRows).toBeUndefined();
    expect(draggableDiv.props().rowSelection).toBeUndefined();
    expect(draggableDiv.props().rowsCount).toBeUndefined();
    expect(draggableDiv.props().onRows).toBeUndefined();
    expect(draggableDiv.props().sortColumn).toBeUndefined();
    expect(draggableDiv.props().sortDirection).toBeUndefined();
    expect(draggableDiv.props().rowOffsetHeight).toBeUndefined();
    expect(draggableDiv.props().onViewportKeydown).toBeUndefined();
    expect(draggableDiv.props().onViewportKeyup).toBeUndefined();
    expect(draggableDiv.props().onViewportDragStart).toBeUndefined();
    expect(draggableDiv.props().onViewportDragEnd).toBeUndefined();
    expect(draggableDiv.props().onViewportDoubleClick).toBeUndefined();
    expect(draggableDiv.props().onColumnResize).toBeUndefined();
    expect(draggableDiv.props().onSort).toBeUndefined();
    expect(draggableDiv.props().cellMetaData).toBeUndefined();
    expect(draggableDiv.props().rowKey).toBeUndefined();
    expect(draggableDiv.props().rowScrollTimeout).toBeUndefined();
    expect(draggableDiv.props().contextMenu).toBeUndefined();
    expect(draggableDiv.props().getSubRowDetails).toBeUndefined();
    expect(draggableDiv.props().draggableHeaderCell).toBeUndefined();
    expect(draggableDiv.props().getValidFilterValues).toBeUndefined();
    expect(draggableDiv.props().rowGroupRenderer).toBeUndefined();
    expect(draggableDiv.props().overScan).toBeUndefined();
  });
});
