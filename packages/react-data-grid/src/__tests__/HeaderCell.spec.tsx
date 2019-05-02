import React from 'react';
import { mount } from 'enzyme';

import HeaderCell from '../HeaderCell';
import Draggable from '../Draggable';
import { HeaderRowType } from '../common/enums';

describe('Header Cell Tests', () => {
  function DraggableHeaderCell() {
    return <div />;
  }

  function setup(overrideProps = {}, columnProps = {}) {
    const props = {
      column: {
        idx: 0,
        key: 'bla',
        name: 'bla',
        width: 150,
        left: 300,
        ...columnProps
      },
      rowType: HeaderRowType.HEADER,
      onResize: jest.fn(),
      onResizeEnd: jest.fn(),
      height: 50,
      name: 'bla',
      onHeaderDrop() { },
      draggableHeaderCell: DraggableHeaderCell,
      ...overrideProps
    };
    const wrapper = mount<HeaderCell>(<HeaderCell {...props} />);
    return { wrapper, props };
  }

  describe('When custom render is supplied', () => {
    it('will have height passed in props', () => {
      const CustomRenderer = () => <div>Custom</div>;
      const { wrapper, props } = setup({ renderer: <CustomRenderer /> });
      expect(wrapper.find(CustomRenderer).prop('height')).toBe(props.height);
    });
  });

  describe('When column is resizable', () => {
    it('should render a Draggable', () => {
      const { wrapper } = setup({}, { resizable: true });
      const draggable = wrapper.find(Draggable);
      expect(draggable.length).toBe(1);
    });

    it('dragging handle should call onResize callback with width and column', () => {
      const { wrapper, props } = setup({}, { resizable: true });
      const draggable = wrapper.find(Draggable);
      draggable.props().onDrag(200, 0);
      expect(props.onResize).toHaveBeenCalled();
      expect(props.onResize.mock.calls[0][0]).toEqual(props.column);
      expect(props.onResize.mock.calls[0][1]).toEqual(200);
    });

    it('finish dragging should call onResizeEnd with correct params', () => {
      const { wrapper, props } = setup({}, { resizable: true });
      const draggable = wrapper.find(Draggable);
      draggable.props().onDragEnd(250, 0);
      expect(props.onResizeEnd).toHaveBeenCalled();
      expect(props.onResizeEnd.mock.calls[0][0]).toEqual(props.column);
      expect(props.onResizeEnd.mock.calls[0][1]).toEqual(250);
    });
  });

  describe('getCell method', () => {
    it('pass the column as property to cell renderer if it is a function', () => {
      const rendererFunction = jest.fn(() => <div>Custom</div>);
      const { props } = setup({ renderer: rendererFunction });
      expect(rendererFunction).toHaveBeenCalledWith({ column: props.column, rowType: HeaderRowType.HEADER }, {});
    });

    it('should not pass the column as property to cell renderer if it is a jsx object', () => {
      const renderer = <div>Value</div>;
      const { wrapper } = setup({ renderer });
      const cell = wrapper.instance().getCell();
      expect(cell!.props.column).toBeUndefined();
    });
  });

  describe('Render draggableHeaderCell', () => {
    it('should not render DraggableHeaderCell when draggable is false', () => {
      const { wrapper } = setup({}, { draggable: false });
      expect(wrapper.find(DraggableHeaderCell).length).toBe(0);
    });

    it('should not render DraggableHeaderCell when draggable is true', () => {
      const { wrapper } = setup({}, { draggable: true });
      expect(wrapper.find(DraggableHeaderCell).length).toBe(1);
    });
  });
});
