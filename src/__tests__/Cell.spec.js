let React        = require('react');
let ReactDOM     = require('react-dom');
let rewire       = require('rewire');
let Cell         = rewire('../Cell');
let TestUtils    = require('react-addons-test-utils');
let rewireModule = require('../../test/rewireModule');
let StubComponent = require('../../test/StubComponent');
Object.assign = require('object-assign');

let testCellMetaData = {
  selected: {idx: 2, rowIdx: 3},
  dragged: null,
  onCellClick: function() {},
  onCellContextMenu: function() {},
  onCellDoubleClick: function() {},
  onCommit: function() {},
  onCommitCancel: function() {},
  copied: null,
  handleDragEnterRow: function() {},
  handleTerminateDrag: function() {},
  onColumnEvent: function() {}
};

let testProps = {
  rowIdx: 0,
  idx: 1,
  tabIndex: 1,
  column: {},
  value: 'Wicklow',
  isExpanded: false,
  cellMetaData: testCellMetaData,
  handleDragStart: () => {},
  rowData: {name: 'Johnny Test', location: 'Wicklow', likesTesting: 'Absolutely'},
  height: 40,
  name: 'JT'
};

const renderCell = (extraProps) => {
  return TestUtils.renderIntoDocument(<Cell {...testProps} {...extraProps} />);
};

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

  beforeEach(() => {
    testElement = renderCell();
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
    testElement = renderCell();
    let formatterInstance = TestUtils.findRenderedComponentWithType(testElement, CustomFormatter);
    expect(testElement).toBeDefined();
    expect(formatterInstance.props.value).toEqual('Wicklow');
  });

  describe('hasChangedDependentValues tests', () => {
    describe('when column getRowMetaData is not defined', () => {
      it('should return false', () => {
        testElement = renderCell();
        expect(testElement.hasChangedDependentValues()).toBe(false);
      });
    });

    describe('when column getRowMetaData is defined', () => {
      const getRowMetaData = rowData => rowData;
      let columnWithGetRowMetaData = { column: { getRowMetaData }};
      let propsWithColumnGetRowMetaData = Object.assign({}, testProps, columnWithGetRowMetaData);

      beforeEach(() => {
        testElement = renderCell(columnWithGetRowMetaData);
      });

      it('should return false when the dependentValues are equal', () => {
        let nextProps = propsWithColumnGetRowMetaData;

        expect(testElement.hasChangedDependentValues(nextProps)).toBe(false);
      });

      it('should return true when the dependentValues are different', () => {
        let nextProps = Object.assign(
          {},
          propsWithColumnGetRowMetaData,
          { rowData: { name: 'Johnny Test', location: 'Wicklow', likesTesting: 'Every Day!' }});

        expect(testElement.hasChangedDependentValues(nextProps)).toBe(true);
      });
    });
  });

  describe('When cell is active', () => {
    beforeEach(() => {
      testCellMetaData.selected = {
        idx: testProps.idx,
        rowIdx: testProps.rowIdx,
        active: true
      };
      testElement = renderCell();
    });

    it('should render an EditorContainer instead of a formatter', () => {
      testElement = renderCell();
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
      let cellInstance = renderCell();
      // force update
      let newValue = 'London';
      cellInstance.setProps({value: newValue, selectedColumn: testProps.column});
      let cellHasUpdateClass = ReactDOM.findDOMNode(cellInstance).getAttribute('class').indexOf(updateClass) > -1;
      expect(cellHasUpdateClass).toBe(true);
    });

    describe('Default events', () => {
      let cellEvents;

      beforeEach(() => {
        let cellInstance = renderCell();
        cellEvents = cellInstance.getEvents();
      });

      it('should have a onClick event associated', () => {
        expect(cellEvents.hasOwnProperty('onClick')).toBe(true);
      });

      it('should have a onDoubleClick event associated', () => {
        expect(cellEvents.hasOwnProperty('onDoubleClick')).toBe(true);
      });

      it('should have a onDragOver event associated', () => {
        expect(cellEvents.hasOwnProperty('onDragOver')).toBe(true);
      });

      describe('Cell Metadata', () => {
        describe('When Action is defined on CellMetaData', () => {
          it('should call metaData onCellClick when it is defined', () => {
            // Arrange
            testCellMetaData.onCellClick = jasmine.createSpy();
            let cellInstance = renderCell();

            // Act
            cellInstance.onCellClick();

            // Assert
            expect(testCellMetaData.onCellClick).toHaveBeenCalled();
          });

          it('should call metaData onDragHandleDoubleClick when it is defined', () => {
            testCellMetaData.onDragHandleDoubleClick = jasmine.createSpy();
            let cellInstance = renderCell();

            cellInstance.onDragHandleDoubleClick(document.createEvent('Event'));

            expect(testCellMetaData.onDragHandleDoubleClick).toHaveBeenCalled();
          });

          it('should call metaData onCellContextMenu if defined', () => {
            testCellMetaData.onCellContextMenu = jasmine.createSpy();
            let cellInstance = renderCell();

            cellInstance.onCellContextMenu();

            expect(testCellMetaData.onCellContextMenu).toHaveBeenCalled();
          });

          it('should call metaData onCellDoubleClick if defined', () => {
            testCellMetaData.onCellDoubleClick = jasmine.createSpy();
            let cellInstance = renderCell();

            cellInstance.onCellDoubleClick();

            expect(testCellMetaData.onCellDoubleClick).toHaveBeenCalled();
          });
        });
      });
    });

    describe('Column events', () => {
      let cellEvents;
      const COLUMN_ON_KEY_PRESS_EVENT_KEY = 'onKeyPress';

      beforeEach(() => {
        testProps.column.events = {
          [COLUMN_ON_KEY_PRESS_EVENT_KEY]: () => {},
          onClick: () => {},
          onDragOver: () => {}
        };

        let cellInstance = renderCell();
        cellEvents = cellInstance.getEvents();
      });

      it('should contain the default grid events', () => {
        expect(cellEvents.hasOwnProperty('onClick')).toBe(true);
        expect(cellEvents.hasOwnProperty('onDoubleClick')).toBe(true);
        expect(cellEvents.hasOwnProperty('onDragOver')).toBe(true);
      });

      it('should add the column events to cell events', () => {
        expect(cellEvents.hasOwnProperty(COLUMN_ON_KEY_PRESS_EVENT_KEY)).toBe(true);
      });

      it('should not add any extra keys', () => {
        expect(Object.keys(cellEvents).length).toBe(4);
      });

      it('should support cell and column events at the same time', () => {
        // Arrange.
        let cellInstance = renderCell();
        cellInstance.createCellEventCallBack = jasmine.createSpy();

        // Act.
        cellEvents = cellInstance.getEvents();

        // Assert.
        expect(cellInstance.createCellEventCallBack).toHaveBeenCalled();
      });
    });
  });
});
