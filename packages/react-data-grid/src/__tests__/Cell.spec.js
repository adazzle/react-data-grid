let React        = require('react');
let rewire       = require('rewire');
let Cell         = rewire('../Cell');
let rewireModule = require('../../../../test/rewireModule');
let StubComponent = require('../../../../test/StubComponent');
import { mount, shallow } from 'enzyme';
import _ from 'underscore';
Object.assign = require('object-assign');
import helpers from '../helpers/test/GridPropHelpers';

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

const renderComponent = (extraProps) => {
  const wrapper = mount(<Cell {...testProps} {...extraProps} />);

  return wrapper;
};

const onCellClick = jasmine.createSpy();
const onDragHandleDoubleClick = jasmine.createSpy();
const onCellContextMenu = jasmine.createSpy();
const onCellDoubleClick = jasmine.createSpy();
const DEFAULT_NEXT_PROPS = {
  cellMetaData: { }
};

const getCellMetaDataWithEvents = () => {
  return Object.assign(
    { },
    testCellMetaData,
    {
      onCellClick,
      onDragHandleDoubleClick,
      onCellContextMenu,
      onCellDoubleClick
    });
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
    testElement = renderComponent();
  });

  it('should create a new instance of Cell', () => {
    expect(testElement).toBeDefined();
  });

  it('should render a SimpleCellFormatter with value', () => {
    let formatter = testElement.find(SimpleCellFormatterStub);

    expect(testElement).toBeDefined();
    expect(formatter.props().value).toEqual('Wicklow');
  });

  it('should render a custom formatter when specified on column', () => {
    let CustomFormatter = new StubComponent('CustomFormatter');
    let column = {
      formatter: CustomFormatter
    };

    testElement = renderComponent({ column });
    let formatterInstance = testElement.find(CustomFormatter);
    expect(testElement).toBeDefined();
    expect(formatterInstance.props().value).toEqual('Wicklow');
  });

  describe('isDraggedCellChanging tests', () => {
    it('should be false if no cell was dragged', () => {
      testElement = renderComponent({
        cellMetaData: {
          dragged: undefined
        }
      });

      expect(testElement.node.isDraggedCellChanging(DEFAULT_NEXT_PROPS)).toBeFalsy();
    });

    it('should be true if the cell is about to be dragged', () => {
      testElement = renderComponent({
        cellMetaData: {
          dragged: { }
        }
      });

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, {
        cellMetaData: {
          dragged: {
            idx: testProps.idx
          }
        }
      });

      expect(testElement.node.isDraggedCellChanging(nextProps)).toBeTruthy();
    });

    it('should be true if the cell is currently dragged ', () => {
      testElement = renderComponent({
        cellMetaData: {
          dragged: {
            idx: testProps.idx
          }
        }
      });

      expect(testElement.node.isDraggedCellChanging(DEFAULT_NEXT_PROPS)).toBeTruthy();
    });

    it('should be false if the cell is not currently dragged and not about to be dragged', () => {
      testElement = renderComponent({
        cellMetaData: {
          dragged: {
            idx: testProps.idx + 1
          }
        }
      });

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, {
        cellMetaData: {
          dragged: {
            idx: testProps.idx - 1
          }
        }
      });

      expect(testElement.node.isDraggedCellChanging(nextProps)).toBeFalsy();
    });

    it('should render null when hidden', () => {
      let column = { hidden: true };
      testElement = renderComponent({ column });
      expect(testElement.html()).toBe(null);
    });
  });

  describe('hasChangedDependentValues tests', () => {
    describe('when column getRowMetaData is not defined', () => {
      it('should return false', () => {
        expect(testElement.node.hasChangedDependentValues()).toBeFalsy();
      });
    });

    describe('when column getRowMetaData is defined', () => {
      const getRowMetaData = rowData => rowData;
      let columnWithGetRowMetaData = { column: { getRowMetaData }};
      let propsWithColumnGetRowMetaData = Object.assign({}, testProps, columnWithGetRowMetaData);

      beforeEach(() => {
        testElement = renderComponent(columnWithGetRowMetaData);
      });

      it('should return false when the dependentValues are equal', () => {
        let nextProps = propsWithColumnGetRowMetaData;

        expect(testElement.node.hasChangedDependentValues(nextProps)).toBeFalsy();
      });

      it('should return true when the dependentValues are different', () => {
        let nextProps = Object.assign(
          {},
          propsWithColumnGetRowMetaData,
          { rowData: { name: 'Johnny Test', location: 'Wicklow', likesTesting: 'Every Day!' }});

        expect(testElement.node.hasChangedDependentValues(nextProps)).toBeTruthy();
      });
    });
  });

  describe('isCellSelectionChanging tests', () => {
    const getSelectedCellMetadata = (selected) => {
      return {
        cellMetaData: {
          selected
        }
      };
    };

    it('should be true if no cell is selected', () => {
      testElement = renderComponent(getSelectedCellMetadata(undefined));

      expect(testElement.node.isCellSelectionChanging(DEFAULT_NEXT_PROPS)).toBeTruthy();
    });

    it('should be false if no cell will be selected', () => {
      testElement = renderComponent(getSelectedCellMetadata({ idx: testProps.idx }));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getSelectedCellMetadata(undefined));

      expect(testElement.node.isCellSelectionChanging(nextProps)).toBeTruthy();
    });

    it('should be true when the next selected cell is the current cell', () => {
      testElement = renderComponent(getSelectedCellMetadata({ idx: testProps.idx + 1 }));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getSelectedCellMetadata({ idx: testProps.idx }));

      expect(testElement.node.isCellSelectionChanging(nextProps)).toBeTruthy();
    });

    it('should be true when the current cell is selected', () => {
      testElement = renderComponent(getSelectedCellMetadata({ idx: testProps.idx }));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getSelectedCellMetadata({ idx: testProps.idx }));

      expect(testElement.node.isCellSelectionChanging(nextProps)).toBeTruthy();
    });

    it('should be false when current cell is not selected and is not going to be selected', () => {
      testElement = renderComponent(getSelectedCellMetadata({ idx: testProps.idx + 1}));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getSelectedCellMetadata({ idx: testProps.idx - 1}));

      expect(testElement.node.isCellSelectionChanging(nextProps)).toBeFalsy();
    });
  });

  describe('isCopyCellChanging tests', () => {
    const getCopiedCellMetadata = (copied) => {
      return {
        cellMetaData: {
          copied
        }
      };
    };

    it('should be false if there is no copied cell', () => {
      testElement = renderComponent(getCopiedCellMetadata(undefined));

      expect(testElement.node.isCopyCellChanging(DEFAULT_NEXT_PROPS)).toBeFalsy();
    });

    it('should be true if the next copied cell is the current cell', () => {
      testElement = renderComponent(getCopiedCellMetadata({ idx: testProps.idx + 1}));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getCopiedCellMetadata({ idx: testProps.idx }));

      expect(testElement.node.isCopyCellChanging(nextProps)).toBeTruthy();
    });

    it('should be true if the current cell is copied', () => {
      testElement = renderComponent(getCopiedCellMetadata({ idx: testProps.idx }));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getCopiedCellMetadata({ idx: testProps.idx + 1}));

      expect(testElement.node.isCopyCellChanging(nextProps)).toBeTruthy();
    });

    it('should be false if the current cell is not copied and is not about to be copied', () => {
      testElement = renderComponent(getCopiedCellMetadata({ idx: testProps.idx + 1}));

      let nextProps = Object.assign({}, DEFAULT_NEXT_PROPS, getCopiedCellMetadata({ idx: testProps.idx + 1}));

      expect(testElement.node.isCopyCellChanging(nextProps)).toBeFalsy();
    });
  });

  describe('When cell is active', () => {
    const ACTIVE_CELL_METADATA_PROPS = Object.assign(
      { },
      testCellMetaData,
      {
        selected: {
          idx: testProps.idx,
          rowIdx: testProps.rowIdx,
          active: true
        }
      });

    beforeEach(() => {
      testElement = renderComponent({ cellMetaData: ACTIVE_CELL_METADATA_PROPS });
    });

    beforeEach(() => {
      onCellClick.calls.reset();
      onCellDoubleClick.calls.reset();
      onCellContextMenu.calls.reset();
      onDragHandleDoubleClick.calls.reset();
    });

    it('should render an EditorContainer instead of a formatter', () => {
      let editorContainerInstance = testElement.find(EditorContainerStub);
      expect(editorContainerInstance).toBeDefined();

      let props = {
        value: 'Wicklow',
        column: testProps.column,
        isExpanded: false,
        rowData: testProps.rowData,
        rowIdx: testProps.rowIdx,
        idx: testProps.idx,
        cellMetaData: ACTIVE_CELL_METADATA_PROPS,
        height: testProps.height,
        dependentValues: undefined
      };

      let editorContainerInstanceProps = editorContainerInstance.props();

      expect(_.isEqual(props, editorContainerInstanceProps)).toBeTruthy();
    });

    it('should append the update cell class to the dom node if present and cell is updated', () => {
      const UPDATE_CLASS = 'highlight-cell';

      let column = {
        getUpdateCellClass: () => UPDATE_CLASS
      };

      testElement = renderComponent({ column });

      // force update
      let newValue = 'London';
      testElement.setProps({ value: newValue, selectedColumn: testProps.column });
      let cellHasUpdateClass = testElement.find('.react-grid-Cell').hasClass(UPDATE_CLASS);
      expect(cellHasUpdateClass).toBeTruthy();
    });

    describe('Default events', () => {
      let cellEvents;

      beforeEach(() => {
        cellEvents = testElement.node.getEvents();
      });

      it('should have a onClick event associated', () => {
        expect(cellEvents.hasOwnProperty('onClick')).toBeTruthy();
      });

      it('should have a onDoubleClick event associated', () => {
        expect(cellEvents.hasOwnProperty('onDoubleClick')).toBeTruthy();
      });

      it('should have a onDragOver event associated', () => {
        expect(cellEvents.hasOwnProperty('onDragOver')).toBeTruthy();
      });

      describe('Cell Metadata', () => {
        beforeEach(() => {
          let cellMetaData = getCellMetaDataWithEvents();

          testElement = renderComponent({ cellMetaData });
        });

        describe('When Action is defined on CellMetaData', () => {
          it('should call metaData onCellClick when it is defined', () => {
            testElement.simulate('click');

            expect(onCellClick).toHaveBeenCalled();
          });

          it('should call metaData onDragHandleDoubleClick when it is defined', () => {
            let cellInstance = testElement.node;

            cellInstance.onDragHandleDoubleClick(document.createEvent('Event'));

            expect(onDragHandleDoubleClick).toHaveBeenCalled();
          });

          it('should call metaData onCellContextMenu if defined', () => {
            let cellInstance = testElement.node;

            cellInstance.onCellContextMenu();

            expect(onCellContextMenu).toHaveBeenCalled();
          });

          it('should call metaData onCellDoubleClick if defined', () => {
            testElement.simulate('doubleClick');

            expect(onCellDoubleClick).toHaveBeenCalled();
          });
        });
      });
    });

    describe('Column events', () => {
      let cellEvents;
      const columnEventOnClick = jasmine.createSpy();
      const columnEventOnDoubleClick = jasmine.createSpy();
      const columnEventOnKeyPress = jasmine.createSpy();

      let column = {
        events: {
          onClick: columnEventOnClick,
          onDoubleClick: columnEventOnDoubleClick,
          onKeyPress: columnEventOnKeyPress
        }
      };

      const COLUMN_ON_KEY_PRESS_EVENT_KEY = 'onKeyPress';

      beforeEach(() => {
        let cellMetaData = Object.assign({}, getCellMetaDataWithEvents(), {
          onColumnEvent: (ev, colEvent) => {
            let eventArgs = {
              rowIdx: testProps.rowIdx,
              idx: testProps.idx,
              column
            };

            column.events[colEvent.name](ev, eventArgs);
          }
        });

        testElement = renderComponent({ column, cellMetaData });
        cellEvents = testElement.node.getEvents();
      });

      afterEach(() => {
        columnEventOnClick.calls.reset();
        columnEventOnDoubleClick.calls.reset();
        columnEventOnKeyPress.calls.reset();
      });

      it('should contain the default grid events', () => {
        expect(cellEvents.hasOwnProperty('onClick')).toBeTruthy();
        expect(cellEvents.hasOwnProperty('onDoubleClick')).toBeTruthy();
        expect(cellEvents.hasOwnProperty('onDragOver')).toBeTruthy();
      });

      it('should add the column events to cell events', () => {
        expect(cellEvents.hasOwnProperty(COLUMN_ON_KEY_PRESS_EVENT_KEY)).toBeTruthy();
      });

      it('should not add any extra keys', () => {
        expect(Object.keys(cellEvents).length).toBe(5);
      });

      it('should call onKeyPress column event', () => {
        testElement.simulate('keyPress', {
          key: 'Enter'
        });

        expect(columnEventOnKeyPress).toHaveBeenCalled();
      });

      it('should support cell and column events at the same time', () => {
        testElement.simulate('click');

        expect(onCellClick).toHaveBeenCalled();
        expect(columnEventOnClick).toHaveBeenCalled();

        testElement.simulate('doubleClick');
        expect(onCellDoubleClick).toHaveBeenCalled();
        expect(columnEventOnDoubleClick).toHaveBeenCalled();
      });

      it('should call a column events with the correct params', () => {
        testElement.simulate('click');

        let eventArgs = columnEventOnClick.calls.first().args;

        expect(eventArgs[1]).toEqual({
          column,
          rowIdx: testProps.rowIdx,
          idx: testProps.idx
        });
      });
    });
  });

  describe('Rendering Cell component', () => {
    const shallowRenderComponent = (props) => {
      const wrapper = shallow(<Cell {...props} />);
      return wrapper;
    };

    const requiredProperties = {
      rowIdx: 18,
      idx: 19,
      column: helpers.columns[0],
      row: {key: 'value'},
      value: 'requiredValue',
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
      rowData: helpers.rowGetter(11),
      expandableOptions: {key: 'reqValue'},
      isScrolling: false
    };

    const allProperties = {
      rowIdx: 20,
      idx: 21,
      selected: {idx: 18},
      height: 35,
      tabIndex: 12,
      ref: 'cellRef',
      column: helpers.columns[1],
      value: 'allValue',
      isExpanded: true,
      isRowSelected: false,
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
      handleDragStart: jasmine.createSpy(),
      className: 'a-class-name',
      cellControls: 'something',
      rowData: helpers.rowGetter(10),
      extraClasses: 'extra-classes',
      forceUpdate: false,
      expandableOptions: {key: 'value'},
      isScrolling: true
    };


    it('passes classname property', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.hasClass('react-grid-Cell'));
    });
    it('passes style property', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().style).toBeDefined();
    });
    it('passes height property if available from props', () => {
      const wrapper = shallowRenderComponent(allProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().height).toBe(35);
    });
    it('does not pass height property if not available from props', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().height).toBeUndefined();
    });
    it('passes tabIndex property if available from props', () => {
      const wrapper = shallowRenderComponent(allProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().tabIndex).toBe(12);
    });
    it('passes tabIndex if not available from props, because it is set as a default', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().tabIndex).toBe(-1);
    });
    it('passes value property', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().value).toBe('requiredValue');
    });
    it('does not pass unknown properties to the div', () => {
      const wrapper = shallowRenderComponent(allProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().rowIdx).toBeUndefined();
      expect(cellDiv.props().idx).toBeUndefined();
      expect(cellDiv.props().selected).toBeUndefined();
      expect(cellDiv.props().selectedColumn).toBeUndefined();
      expect(cellDiv.props().ref).toBeUndefined();
      expect(cellDiv.props().column).toBeUndefined();
      expect(cellDiv.props().isExpanded).toBeUndefined();
      expect(cellDiv.props().isRowSelected).toBeUndefined();
      expect(cellDiv.props().cellMetaData).toBeUndefined();
      expect(cellDiv.props().handleDragStart).toBeUndefined();
      expect(cellDiv.props().cellControls).toBeUndefined();
      expect(cellDiv.props().rowData).toBeUndefined();
      expect(cellDiv.props().forceUpdate).toBeUndefined();
      expect(cellDiv.props().expandableOptions).toBeUndefined();
      expect(cellDiv.props().isScrolling).toBeUndefined();
    });
  });
});
