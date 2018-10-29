import React from 'react';
import { mount } from 'enzyme';

import CellExpander from '../CellExpander';
import { CellExpand } from 'common/constants';

const setup = (overrideExpandableOptions = {}) => {
  const props = {
    expandableOptions: {
      expanded: true,
      ...overrideExpandableOptions
    },
    onCellExpand: jasmine.createSpy()
  };

  return {
    props,
    wrapper: mount(<CellExpander {...props} />)
  };
};

describe('CellExpand', () => {
  it('should create an instance of CellExpand', () => {
    const { wrapper } = setup({ expanded: false });

    expect(wrapper.find('.rdg-cell-expand').length).toBe(1);
    expect(wrapper.find('span').text()).toBe(CellExpand.RIGHT_TRIANGLE);
  });

  it('should call onCellExpand when clicked', () => {
    const { wrapper, props } = setup({ expanded: false });

    wrapper.find('span').simulate('click');

    expect(props.onCellExpand.calls.count()).toEqual(1);
    expect(wrapper.find('span').text()).toBe(CellExpand.DOWN_TRIANGLE);
  });
});
