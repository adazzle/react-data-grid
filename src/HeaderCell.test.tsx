import React from 'react';
import { mount } from 'enzyme';

import HeaderCell, { HeaderCellProps } from './HeaderCell';
import { ValueFormatter } from './formatters';
import { CalculatedColumn } from './common/types';

interface Row {
  bla?: string;
}

describe('HeaderCell', () => {
  function DraggableHeaderCell() {
    return <div />;
  }

  function setup(overrideProps = {}, columnProps = {}) {
    const props: HeaderCellProps<Row, unknown> = {
      column: {
        idx: 0,
        key: 'bla',
        name: 'bla',
        width: 150,
        left: 300,
        formatter: ValueFormatter,
        ...columnProps
      },
      lastFrozenColumnIndex: -1,
      onResize: jest.fn(),
      height: 50,
      onHeaderDrop() { },
      draggableHeaderCell: DraggableHeaderCell,
      allRowsSelected: false,
      onAllRowsSelectionChange() {},
      ...overrideProps
    };
    const wrapper = mount(<HeaderCell {...props} />);
    return { wrapper, props };
  }

  describe('When custom render is supplied', () => {
    it('pass the column as property to cell renderer if it is a function', () => {
      const CustomRenderer = (column: CalculatedColumn<Row>) => <div>{column.name}</div>;
      const { wrapper } = setup({ renderer: CustomRenderer });
      expect(wrapper.find('.rdg-cell').at(0).text()).toBe('bla');
    });
  });

  describe('When column is resizable', () => {
    it('dragging handle should call onResize callback with width and column', () => {
      const { wrapper, props } = setup({}, { resizable: true });
      wrapper.simulate('mousedown', { button: 0, clientX: 0 });
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }));
      expect(props.onResize).toHaveBeenCalledWith(props.column, 200);
    });
  });

  describe('Render draggableHeaderCell', () => {
    it('should not render DraggableHeaderCell when draggable is false', () => {
      const { wrapper } = setup({}, { draggable: false });
      expect(wrapper.find(DraggableHeaderCell)).toHaveLength(0);
    });

    it('should not render DraggableHeaderCell when draggable is true', () => {
      const { wrapper } = setup({}, { draggable: true });
      expect(wrapper.find(DraggableHeaderCell)).toHaveLength(1);
    });
  });
});
