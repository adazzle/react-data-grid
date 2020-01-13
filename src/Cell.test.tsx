import React, { PropsWithChildren } from 'react';
import { mount } from 'enzyme';

import Cell, { CellProps } from './Cell';
import helpers, { Row } from './test/GridPropHelpers';
import { SimpleCellFormatter } from './formatters';
import { CalculatedColumn, FormatterProps } from './common/types';
import EventBus from './EventBus';

const defaultColumn: CalculatedColumn<Row> = {
  idx: 0,
  key: 'description',
  name: 'Desciption',
  width: 100,
  left: 0,
  formatter: SimpleCellFormatter
};

const testProps: CellProps<Row> = {
  rowIdx: 0,
  idx: 1,
  column: defaultColumn,
  lastFrozenColumnIndex: -1,
  rowData: { id: 1, description: 'Wicklow' },
  isRowSelected: false,
  scrollLeft: 0,
  isSummaryRow: false,
  eventBus: new EventBus()
};

const renderComponent = (extraProps?: PropsWithChildren<Partial<CellProps<Row>>>) => {
  return mount(<Cell<Row> {...testProps} {...extraProps} />);
};

describe('Cell', () => {
  it('should render a SimpleCellFormatter with value', () => {
    const wrapper = renderComponent();
    const formatter = wrapper.find(SimpleCellFormatter);
    expect(formatter.props().row[defaultColumn.key]).toStrictEqual('Wicklow');
  });

  it('should render a custom formatter when specified on column', () => {
    const CustomFormatter = (props: FormatterProps) => <div>{props.row[props.column.key]}</div>;

    const column = {
      ...defaultColumn,
      formatter: CustomFormatter
    };

    const wrapper = renderComponent({ column });
    const formatterInstance = wrapper.find(CustomFormatter);
    expect(formatterInstance.prop('row')[column.key]).toStrictEqual('Wicklow');
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
      column: helpers.columns[0],
      lastFrozenColumnIndex: -1,
      rowData: helpers.rows[11],
      isRowSelected: false,
      scrollLeft: 0,
      isSummaryRow: false,
      eventBus: new EventBus()
    };

    it('passes classname property', () => {
      const wrapper = shallowRenderComponent(requiredProperties);
      const cellDiv = wrapper.find('div').at(0);
      expect(cellDiv.hasClass('rdg-cell')).toBe(true);
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
});
