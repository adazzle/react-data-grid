import React from 'react';
import { shallow } from 'enzyme';
import SortableHeaderCell, { Props } from '../SortableHeaderCell';
import { DEFINE_SORT } from '../../../enums';
import { valueCellContentRenderer } from '../../../../Cell/cellContentRenderers';

interface Row { col1: string }

describe('<SortableHeaderCell/>', () => {
  const setup = (overrideColumn = {}) => {
    const props: Props<Row> = {
      column: {
        idx: 0,
        name: 'col1',
        key: 'col1',
        width: 100,
        left: 0,
        cellContentRenderer: valueCellContentRenderer,
        ...overrideColumn
      },
      onSort: jest.fn(),
      sortDirection: DEFINE_SORT.NONE,
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
    expect(props.onSort).toHaveBeenCalledWith(props.column.key, DEFINE_SORT.ASC);
  });

  describe('When sortDescendingFirst is true', () => {
    it('should set sort descending first when clicked', () => {
      const { wrapper, props } = setup({ sortDescendingFirst: true });
      wrapper.simulate('click');
      expect(props.onSort).toHaveBeenCalledWith(props.column.key, DEFINE_SORT.DESC);
    });
  });
});
