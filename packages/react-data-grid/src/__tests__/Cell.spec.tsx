import React, { PropsWithChildren } from 'react';
import { shallow } from 'enzyme';

import Cell, { Props } from '../Cell';
import helpers from '../helpers/test/GridPropHelpers';
import CellAction from '../CellAction';
import { SimpleCellFormatter } from '../formatters';
import { CalculatedColumn, CellMetaData } from '../common/types';

const testCellMetaData: CellMetaData = {
  rowKey: 'row',
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

const defaultColumn: CalculatedColumn = { idx: 0, key: 'col1', name: 'col1', width: 100, left: 0 };

const testProps: Props = {
  rowIdx: 0,
  idx: 1,
  column: defaultColumn,
  value: 'Wicklow',
  cellMetaData: testCellMetaData,
  rowData: { name: 'Johnny Test', location: 'Wicklow', likesTesting: 'Absolutely' },
  height: 40,
  isScrolling: false,
  scrollLeft: 0
};

const renderComponent = (extraProps?: PropsWithChildren<Partial<Props>>) => {
  return shallow<Cell>(<Cell {...testProps} {...extraProps} />);
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
    function shallowRenderComponent(props: Props) {
      return shallow<Cell>(<Cell {...props} />);
    }

    const requiredProperties: Props = {
      rowIdx: 18,
      idx: 19,
      height: 60,
      column: helpers.columns[0],
      value: 'requiredValue',
      cellMetaData: testCellMetaData,
      rowData: helpers.rowGetter(11),
      expandableOptions,
      isScrolling: false,
      scrollLeft: 0
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
    const setup = (propsOverride: Partial<Props> = {}) => {
      const props: Props = {
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
        ...propsOverride
      };

      const wrapper = shallow<Cell>(<Cell {...props} />);
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
