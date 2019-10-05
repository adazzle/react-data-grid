import React from 'react';
import { mount } from 'enzyme';

import CellExpander, { CellExpanderProps } from '../CellExpander';
import { CellExpand } from '../../common/enums';

const setup = (overrideExpandableOptions = {}) => {
  const props: CellExpanderProps = {
    expanded: true,
    onCellExpand: jest.fn(),
    ...overrideExpandableOptions
  };

  return {
    props,
    wrapper: mount(<CellExpander {...props} />)
  };
};

describe('CellExpand', () => {
  it('should show the collapse icon when row is collapsed', () => {
    const { wrapper } = setup({ expanded: false });
    expect(wrapper.text()).toContain(CellExpand.RIGHT_TRIANGLE);
    wrapper.unmount();
  });

  it('should show the expand icon when row is expanded', () => {
    const { wrapper } = setup({ expanded: true });
    expect(wrapper.text()).toContain(CellExpand.DOWN_TRIANGLE);
    wrapper.unmount();
  });

  it('should call onCellExpand when clicked', () => {
    const { wrapper, props } = setup({ expanded: true });
    wrapper.find('span').simulate('click', { stopPropagation() { } });

    expect(props.onCellExpand).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
