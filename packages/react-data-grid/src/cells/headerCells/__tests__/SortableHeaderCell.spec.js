import React from 'react';
import SortableHeaderCell, {DEFINE_SORT} from '../SortableHeaderCell';
import { shallow } from 'enzyme';

const defaultProps = {
  columnKey: 'col1',
  column: {
    name: 'col1',
    key: 'col1'
  },
  onSort: jasmine.createSpy(),
  sortDirection: DEFINE_SORT.NONE
};

describe('<SortableHeaderCell/>', () => {
  const setup = overrideProps => {
    const props = Object.assign({}, defaultProps, overrideProps);
    const wrapper = shallow(<SortableHeaderCell {...props} />);
    return { wrapper, props };
  };
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should toggle sort direction when clicked', () => {
    const { wrapper, props } = setup();
    wrapper.simulate('click');
    expect(props.onSort).toHaveBeenCalledWith(props.columnKey, DEFINE_SORT.ASC);
  });

  describe('When sortDescendingFirst is true', () => {
    it('should set sort descending first when clicked', () => {
      const { wrapper, props } = setup({sortDescendingFirst: true});
      wrapper.simulate('click');
      expect(props.onSort).toHaveBeenCalledWith(props.columnKey, DEFINE_SORT.DESC);
    });
  });

  describe('When headerRenderer of column is set', () => {
    it('should render the header renderer', () => {
      const HeaderRenderer = () => (<span>Custom</span>);
      const { wrapper } = setup({headerRenderer: <HeaderRenderer/>});
      expect(wrapper.find(HeaderRenderer).length).toBe(1);
    });
  });
});
