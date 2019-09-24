import React, { PropsWithChildren } from 'react';
import { mount } from 'enzyme';

import Cell, { CellProps } from '../Cell';
import helpers, { Row } from '../helpers/test/GridPropHelpers';
import CellAction from '../Cell/CellAction';
import { SimpleCellFormatter } from '../formatters';
import { CalculatedColumn, CellMetaData } from '../common/types';

const testCellMetaData: CellMetaData<Row> = {
  rowKey: 'id',
  onCellClick() {},
  onCellContextMenu() {},
  onCellDoubleClick() {},
  onDragEnter() {},
  onCellExpand() {},
  onRowExpandToggle() {}
};

const expandableOptions = {
  canExpand: false,
  field: 'field',
  expanded: false,
  children: [],
  treeDepth: 0,
  subRowDetails: {
    canExpand: false,
    field: 'field',
    expanded: false,
    children: [],
    treeDepth: 0,
    siblingIndex: 0,
    numberSiblings: 0
  }
};

const defaultColumn: CalculatedColumn<Row> = { idx: 0, key: 'description', name: 'Desciption', width: 100, left: 0 };

const testProps: CellProps<Row> = {
  rowIdx: 0,
  idx: 1,
  column: defaultColumn,
  value: 'Wicklow',
  cellMetaData: testCellMetaData,
  rowData: { id: 1, description: 'Wicklow' },
  height: 40,
  isScrolling: false,
  scrollLeft: 0,
  lastFrozenColumnIndex: -1
};

const renderComponent = (extraProps?: PropsWithChildren<Partial<CellProps<Row>>>) => {
  return mount(<Cell<Row> {...testProps} {...extraProps} />);
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
      ...defaultColumn,
      formatter: CustomFormatter
    };

    const wrapper = renderComponent({ column });
    const formatterInstance = wrapper.find(CustomFormatter);
    expect(formatterInstance.prop('value')).toEqual('Wicklow');
  });

  it('should render children when those are passed', () => {
    const wrapper = renderComponent({ children: <div>Child</div> });
    expect(wrapper.children().text()).toBe('Child');
  });

  describe('Rendering Cell component', () => {
    function shallowRenderComponent(props: CellProps<Row>) {
      return mount(<Cell<Row> {...props} />);
    }

    const requiredProperties: CellProps<Row> = {
      rowIdx: 18,
      idx: 19,
      height: 60,
      column: helpers.columns[0],
      value: 'requiredValue',
      cellMetaData: testCellMetaData,
      rowData: helpers.rowGetter(11),
      expandableOptions,
      isScrolling: false,
      scrollLeft: 0,
      lastFrozenColumnIndex: -1
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
    it('does not pass height property if not available from props', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.props().height).toBeUndefined();
    });
  });

  describe('CellActions', () => {
    const setup = (propsOverride: Partial<CellProps<Row>> = {}) => {
      const props: CellProps<Row> = {
        rowIdx: 18,
        idx: 19,
        height: 60,
        column: helpers.columns[0],
        value: 'requiredValue',
        cellMetaData: testCellMetaData,
        rowData: helpers.rowGetter(11),
        expandableOptions,
        isScrolling: false,
        scrollLeft: 0,
        lastFrozenColumnIndex: -1,
        ...propsOverride
      };

      const wrapper = mount(<Cell<Row> {...props} />);
      return {
        wrapper,
        props
      };
    };

    describe('when getCellActions is in cellMetadata', () => {
      it('should render some CellActions', () => {
        const action = { icon: 'glpyhicon glyphicon-link', callback: jest.fn() };
        const { wrapper } = setup({
          cellMetaData: {
            ...testCellMetaData,
            getCellActions: jest.fn().mockReturnValue([action])
          }
        });

        const renderedCellActions = wrapper.find(CellAction);

        expect(renderedCellActions.length).toBe(1);
        expect(renderedCellActions.props()).toEqual({
          ...action,
          isFirst: true
        });
      });
    });

    describe('when getCellActions is not in cellMetadata', () => {
      it('should not render any CellActions', () => {
        const { wrapper } = setup();

        const renderedCellActions = wrapper.find(CellAction);

        expect(renderedCellActions.length).toBe(0);
      });
    });
  });
});
