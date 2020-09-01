import React, { PropsWithChildren } from 'react';
import { mount } from 'enzyme';

import Cell from './Cell';
import helpers, { Row } from './test/GridPropHelpers';
import { SimpleCellFormatter } from './formatters';
import { CalculatedColumn, CellRendererProps, FormatterProps } from './types';
import EventBus from './EventBus';

const defaultColumn: CalculatedColumn<Row> = {
  idx: 0,
  key: 'description',
  name: 'Desciption',
  width: 100,
  left: 0,
  resizable: false,
  sortable: false,
  formatter: SimpleCellFormatter
};

const testProps: CellRendererProps<Row> = {
  rowIdx: 0,
  column: defaultColumn,
  row: { id: 1, description: 'Wicklow' },
  isRowSelected: false,
  eventBus: new EventBus(),
  isCellSelected: true,
  isCopied: false,
  isDraggedOver: false
};

const renderComponent = (extraProps?: PropsWithChildren<Partial<CellRendererProps<Row>>>) => {
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

  describe('Rendering Cell component', () => {
    function shallowRenderComponent(props: CellRendererProps<Row>) {
      return mount(<Cell<Row> {...props} />);
    }

    const requiredProperties: CellRendererProps<Row> = {
      rowIdx: 18,
      column: helpers.columns[0],
      row: helpers.rows[11],
      isRowSelected: false,
      eventBus: new EventBus(),
      isCellSelected: true,
      isCopied: false,
      isDraggedOver: false
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
