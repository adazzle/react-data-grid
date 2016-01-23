const React        = require('react');
const rewire       = require('rewire');
const Cell         = rewire('../Cell');
const TestUtils    = require('react/lib/ReactTestUtils');
const rewireModule = require('../../test/rewireModule');
const StubComponent = require('../../test/StubComponent');

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
      width: 0
    },
    value: 'Wicklow',
    isExpanded: false,
    cellMetaData: testCellMetaData,
    handleDragStart: function() {},
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
      expect(editorContainerInstance.props).toEqual({
        value: 'Wicklow',
        column: testProps.column,
        isExpanded: false,
        rowData: testProps.rowData,
        rowIdx: testProps.rowIdx,
        idx: testProps.idx,
        cellMetaData: testProps.cellMetaData,
        height: testProps.height,
        dependentVlaues: undefined
      });
    });

    it('should append the update cell class to the dom node if present and cell is updated', () => {
      let updateClass = 'highlight-cell';
      testProps.column.getUpdateCellClass = () => updateClass;
      let cellInstance = TestUtils.renderIntoDocument(<Cell {...testProps}/>);
      // force update
      cellInstance.setProps({rowData: {}, selectedColumn: testProps.column});
      let cellHasUpdateClass = cellInstance.getDOMNode().getAttribute('class').indexOf(updateClass) > -1;
      expect(cellHasUpdateClass).toBe(true);
    });
  });
});
