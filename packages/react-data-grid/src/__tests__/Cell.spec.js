import React from 'react';
import Cell from '../Cell';
import { shallow } from 'enzyme';
import helpers from '../helpers/test/GridPropHelpers';
import sinon from 'sinon';
import CellAction from '../CellAction';
import SimpleCellFormatter from '../formatters/SimpleCellFormatter';

const testCellMetaData = {
  selected: {idx: 2, rowIdx: 3},
  dragged: null,
  onCellClick: function() {},
  onCellFocus: function() {},
  onCellContextMenu: function() {},
  onCellDoubleClick: function() {},
  onCommit: function() {},
  onCommitCancel: function() {},
  copied: null,
  handleDragEnterRow: function() {},
  handleTerminateDrag: function() {},
  onColumnEvent: function() {}
};

const testProps = {
  rowIdx: 0,
  idx: 1,
  column: {name: 'col1'},
  value: 'Wicklow',
  isExpanded: false,
  expandableOption: {},
  cellMetaData: testCellMetaData,
  handleDragStart: () => {},
  rowData: {name: 'Johnny Test', location: 'Wicklow', likesTesting: 'Absolutely'},
  height: 40,
  name: 'JT'
};

const renderComponent = (extraProps) => {
  return shallow(<Cell {...testProps} {...extraProps} />);
};

describe('Cell Tests', () => {
  it('should render a SimpleCellFormatter with value', () => {
    const wrapper = renderComponent();
    const formatter = wrapper.find(SimpleCellFormatter);
    expect(formatter.props().value).toEqual('Wicklow');
  });

  it('should render a custom formatter when specified on column', () => {
    const CustomFormatter = () => <div>Custom</div>;

    const column = {
      formatter: CustomFormatter
    };

    const wrapper = renderComponent({ column });
    const formatterInstance = wrapper.find(CustomFormatter);
    expect(formatterInstance.props().value).toEqual('Wicklow');
  });

  it('should render children when those are passed', () => {
    const wrapper = renderComponent({ children: (<div>Child</div>)});
    expect(wrapper.children().text()).toBe('Child');
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
        onCellFocus: jasmine.createSpy(),
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
      ref: () => {},
      column: helpers.columns[1],
      value: 'allValue',
      isExpanded: true,
      isRowSelected: false,
      cellMetaData: {
        selected: {idx: 2, rowIdx: 3},
        dragged: null,
        onCellClick: jasmine.createSpy(),
        onCellFocus: jasmine.createSpy(),
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

  describe('CellActions', () => {
    const setup = (propsOverride = {}) => {
      const props = Object.assign({}, {
        rowIdx: 18,
        idx: 19,
        column: helpers.columns[0],
        row: {key: 'value'},
        value: 'requiredValue',
        cellMetaData: {
          selected: {idx: 2, rowIdx: 3},
          dragged: null,
          onCellClick: jasmine.createSpy(),
          onCellFocus: jasmine.createSpy(),
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
      }, propsOverride);

      const wrapper = shallow(<Cell {...props} />);
      return {
        wrapper,
        props
      };
    };

    describe('when getCellActions is in cellMetadata', () => {
      it('should render some CellActions', () => {
        const action = {icon: 'glpyhicon glyphicon-link', callback: sinon.spy()};
        const {wrapper} = setup({
          cellMetaData: {
            selected: {idx: 2, rowIdx: 3},
            dragged: null,
            onCellClick: jasmine.createSpy(),
            onCellFocus: jasmine.createSpy(),
            onCellContextMenu: jasmine.createSpy(),
            onCellDoubleClick: jasmine.createSpy(),
            onCommit: jasmine.createSpy(),
            onCommitCancel: jasmine.createSpy(),
            copied: null,
            handleDragEnterRow: jasmine.createSpy(),
            handleTerminateDrag: jasmine.createSpy(),
            onColumnEvent: jasmine.createSpy(),
            getCellActions: sinon.stub().returns([action])
          }
        });

        const renderedCellActions = wrapper.find(CellAction);

        expect(renderedCellActions.length).toBe(1);
        expect(renderedCellActions.props()).toEqual({
          action,
          isFirst: true
        });
      });
    });

    describe('when getCellActions is not in cellMetadata', () => {
      it('should not render any CellActions', () => {
        const {wrapper} = setup();

        const renderedCellActions = wrapper.find(CellAction);

        expect(renderedCellActions.length).toBe(0);
      });
    });
  });
});
