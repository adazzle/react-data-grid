import React from 'react';
import { shallow, mount } from 'enzyme';

import HeaderCell from '../HeaderCell';
import SortableHeaderCell from '../common/cells/headerCells/SortableHeaderCell';
import Draggable from '../Draggable';

describe('Header Cell Tests', () => {
  let testProps;
  beforeEach(() => {
    testProps = {
      rowType: 'header',
      column: {
        width: 150,
        left: 300,
        name: 'bla',
        key: 'bla'
      },
      onResize: jest.fn(),
      onResizeEnd: jest.fn(),
      height: 50,
      name: 'bla'
    };
  });

  function setup(overrideProps = {}) {
    const props = { ...testProps, ...overrideProps };
    const wrapper = shallow(<HeaderCell {...props} />);
    return { wrapper, props };
  }

  describe('When custom render is supplied', () => {
    it('will render', () => {
      const CustomRenderer = () => <div>Custom</div>;
      const { wrapper } = setup({ renderer: <CustomRenderer /> });
      expect(wrapper.find(CustomRenderer).length).toBe(1);
    });

    it('will have height passed in props', () => {
      const CustomRenderer = () => <div>Custom</div>;
      const { wrapper } = setup({ renderer: <CustomRenderer /> });
      expect(wrapper.find(CustomRenderer).props().height).toBe(testProps.height);
    });
  });

  describe('When column is resizable', () => {
    beforeEach(() => {
      testProps.column.resizable = true;
    });

    afterEach(() => {
      testProps.column.resizable = false;
    });

    it('should render a Draggable', () => {
      const { wrapper } = setup();
      const draggable = wrapper.find(Draggable);
      expect(draggable.length).toBe(1);
    });

    it('dragging handle should call onResize callback with width and column', () => {
      const wrapper = mount(<HeaderCell {...testProps} />);
      const draggable = wrapper.find(Draggable);
      draggable.props().onDrag(200, 0);
      expect(testProps.onResize).toHaveBeenCalled();
      expect(testProps.onResize.mock.calls[0][0]).toEqual(testProps.column);
      expect(testProps.onResize.mock.calls[0][1]).toEqual(200);
    });

    it('finish dragging should call onResizeEnd with correct params', () => {
      const wrapper = mount(<HeaderCell {...testProps} />);
      const draggable = wrapper.find(Draggable);
      draggable.props().onDragEnd(250, 0);
      expect(testProps.onResizeEnd).toHaveBeenCalled();
      expect(testProps.onResizeEnd.mock.calls[0][0]).toEqual(testProps.column);
      expect(testProps.onResizeEnd.mock.calls[0][1]).toEqual(250);
    });
  });

  describe('getCell method', () => {
    it('pass the column as property to cell renderer if it is a function', () => {
      const rendererFunction = jest.fn();
      const { props } = setup({ renderer: rendererFunction });
      expect(rendererFunction.mock.calls[0][0]).toEqual({ column: props.column });
    });
    it('should not pass the column as property to cell renderer if it is an HTML element', () => {
      const renderer = <div>Value</div>;
      const { wrapper } = setup({ renderer });
      const cell = wrapper.instance().getCell();
      expect(cell.props.column).toBeUndefined();
    });
    it('should pass the column as property to cell renderer if it is a React class', () => {
      const renderer = <SortableHeaderCell columnKey="colKey" onSort={jest.fn()} />;
      const { wrapper, props } = setup({ renderer });
      const cell = wrapper.instance().getCell();
      expect(cell.props.column).toBe(props.column);
    });
  });
});
