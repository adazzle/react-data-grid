let React        = require('react');
let ReactDOM     = require('react-dom');
let rewire       = require('rewire');
let Cell         = rewire('../Cell');
let TestUtils    = require('react-addons-test-utils');
let rewireModule = require('../../test/rewireModule');
let StubComponent = require('../../test/StubComponent');

describe('Cell Tests', () => {
  let testElement;
  let ExcelColumnStub = new StubComponent('ExcelColumn');
  let EditorContainerStub = new StubComponent('EditorContainer');
  let SimpleCellFormatterStub = new StubComponent('SimpleCellFormatter');
  // Configure local letiable replacements for the module.
  rewireModule(Cell, {
    ExcelColumn: ExcelColumnStub,
    EditorContainer: EditorContainerStub,
    SimpleCellFormatter: SimpleCellFormatterStub
  });

  let testCellMetaData = {
    selected: {idx: 2, rowIdx: 3},
    dragged: null,
    onCellClick: function() {},
    onCellDoubleClick: function() {},
    onCommit: function() {},
    onCommitCancel: function() {},
    copied: null,
    handleDragEnterRow: function() {},
    handleTerminateDrag: function() {}
  };

  let testProps = {
    rowIdx: 0,
    idx: 1,
    tabIndex: 1,
    column: {
      name: 'name',
      key: 'key',
      width: 0,
      someRandomAttachedData: "yeah, it happens"
    },
    value: 'Wicklow',
    isExpanded: false,
    cellMetaData: testCellMetaData,
    handleDragStart: () => {},
    rowData: {name: 'Johnny Test', location: 'Wicklow', likesTesting: 'Absolutely'},
    height: 40,
    name: 'JT'
  };

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
  });

  it('should create a new instance of Cell', () => {
    expect(testElement).toBeDefined();
  });

  it('should render a SimpleCellFormatter with value', () => {
    let formatter = TestUtils.findRenderedComponentWithType(testElement, SimpleCellFormatterStub );
    expect(testElement).toBeDefined();
    expect(formatter.props.value).toEqual('Wicklow');
  });

  it('should render a custom formatter when specified on column', () => {
    let CustomFormatter = new StubComponent('CustomFormatter');
    testProps.column.formatter = CustomFormatter;
    testElement = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
    let formatterInstance = TestUtils.findRenderedComponentWithType(testElement, CustomFormatter);
    expect(testElement).toBeDefined();
    expect(formatterInstance.props.value).toEqual('Wicklow');
    expect(formatterInstance.props.column.key).toEqual("key")
    expect(formatterInstance.props.rowData.name).toEqual("Johnny Test");
    expect(formatterInstance.props.column.someRandomAttachedData).toEqual("yeah, it happens")
  });

  describe('When cell is active', () => {
    beforeEach(() => {
      testCellMetaData.selected = {
        idx: testProps.idx,
        rowIdx: testProps.rowIdx,
        active: true
      };
      testElement = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
    });

    it('should render an EditorContainer instead of a formatter', () => {
      testElement = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
      let editorContainerInstance = TestUtils.findRenderedComponentWithType(testElement, EditorContainerStub);
      expect(editorContainerInstance).toBeDefined();
      let props = {
        value: 'Wicklow',
        column: testProps.column,
        isExpanded: false,
        rowData: testProps.rowData,
        rowIdx: testProps.rowIdx,
        idx: testProps.idx,
        cellMetaData: testProps.cellMetaData,
        height: testProps.height,
        dependentValues: undefined
      };

      expect(Object.keys(props).sort())
        .toEqual(Object.keys(editorContainerInstance.props).sort());

      Object.keys(props).forEach(k => {
        expect(props[k]).toEqual(editorContainerInstance.props[k]);
      });
    });

    it('should append the update cell class to the dom node if present and cell is updated', () => {
      let updateClass = 'highlight-cell';
      testProps.column.getUpdateCellClass = () => updateClass;
      let cellInstance = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
      // force update
      cellInstance.setProps({rowData: {}, selectedColumn: testProps.column});
      let cellHasUpdateClass = ReactDOM.findDOMNode(cellInstance).getAttribute('class').indexOf(updateClass) > -1;
      expect(cellHasUpdateClass).toBe(true);
    });
  });
});
