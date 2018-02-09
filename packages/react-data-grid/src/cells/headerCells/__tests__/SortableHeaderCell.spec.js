import React from 'react';
import SortableHeaderCell from '../SortableHeaderCell';
import { shallow } from 'enzyme';

fdescribe('<SortableHeaderCell/>', () => {
  const setup = overrideProps => {
    const props = Object.assign({},
      overrideProps
    );
    const wrapper = shallow(<SortableHeaderCell {...props} />);
    return { wrapper, props };
  };
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
