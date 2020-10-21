import React from 'react';
import { shallow } from 'enzyme';
import SortableHeaderCell, { Props } from './SortableHeaderCell';
import { ValueFormatter } from '../formatters';

interface Row { col1: string }

describe('SortableHeaderCell', () => {
  const setup = (overrideColumn = {}) => {
    const props: Props<Row, unknown> = {
      column: {
        idx: 0,
        name: 'col1',
        key: 'col1',
        width: 100,
        left: 0,
        resizable: false,
        sortable: false,
        formatter: ValueFormatter,
        ...overrideColumn
      },
      onSort: jest.fn(),
      sortDirection: 'NONE',
      children: <div>Test</div>
    };
    const wrapper = shallow(<SortableHeaderCell {...props} />);
    return { wrapper, props };
  };

  it('should render children', () => {
    expect(setup().wrapper.text()).toContain('Test');
  });

  it('should toggle sort direction when clicked', () => {
    const { wrapper, props } = setup();
    wrapper.simulate('click');
    expect(props.onSort).toHaveBeenCalledWith(props.column.key, 'ASC');
  });

  describe('When sortDescendingFirst is true', () => {
    it('should set sort descending first when clicked', () => {
      const { wrapper, props } = setup({ sortDescendingFirst: true });
      wrapper.simulate('click');
      expect(props.onSort).toHaveBeenCalledWith(props.column.key, 'DESC');
    });
  });
});
