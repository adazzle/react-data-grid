import React from 'react';
import { mount } from 'enzyme';

import HeaderCell, { HeaderCellProps } from '../HeaderCell';
import { valueCellContentRenderer } from '../Cell/cellContentRenderers';
import { HeaderRowType } from '../common/enums';

interface Row {
  bla?: string;
}

describe('Header Cell Tests', () => {
  function DraggableHeaderCell() {
    return <div />;
  }

  function setup(overrideProps = {}, columnProps = {}) {
    const props: HeaderCellProps<Row> = {
      column: {
        idx: 0,
        key: 'bla',
        name: 'bla',
        width: 150,
        left: 300,
        cellContentRenderer: valueCellContentRenderer,
        ...columnProps
      },
      lastFrozenColumnIndex: -1,
      rowType: HeaderRowType.HEADER,
      onResize: jest.fn(),
      height: 50,
      onHeaderDrop() { },
      draggableHeaderCell: DraggableHeaderCell,
      allRowsSelected: false,
      onAllRowsSelectionChange() {},
      ...overrideProps
    };
    const wrapper = mount<HeaderCell<Row>>(<HeaderCell<Row> {...props} />);
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
    it('dragging handle should call onResize callback with width and column', () => {
      const { wrapper, props } = setup({}, { resizable: true });
      wrapper.simulate('mousedown', { button: 0, clientX: 0 });
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }));
      expect(props.onResize).toHaveBeenCalledWith(props.column, 200);
    });
  });

  describe('getCell method', () => {
    it('pass the column as property to cell renderer if it is a function', () => {
      const rendererFunction = jest.fn(() => <div>Custom</div>);
      const { props } = setup({ renderer: rendererFunction });
      expect(rendererFunction).toHaveBeenCalledWith({
        column: props.column,
        rowType: HeaderRowType.HEADER,
        allRowsSelected: false,
        onAllRowsSelectionChange: expect.any(Function)
      }, {});
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
