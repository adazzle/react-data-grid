import React from 'react';
import { shallow } from 'enzyme';

import { sel } from '../../__tests__/utils';
import CellMask from '../CellMask';

describe('CellMask', () => {
  const setup = (children) => {
    const props = {
      height: 30,
      width: 50,
      left: 5,
      top: 10,
      zIndex: 2
    };

    const wrapper = shallow(<CellMask {...props}>{children}</CellMask>);

    return {
      props,
      mask: wrapper.find(sel('cell-mask'))
    }
  };

  it('should render CellMask with correct style', () => {
    const {
      props: { height, width, left, top, zIndex },
      mask
    } = setup();

    expect(mask.prop('style')).toEqual(
      jasmine.objectContaining({
        height,
        width,
        zIndex,
        transform: `translate(${left}px, ${top}px)`
      })
    );
  });

  it('should render any children', () => {
    const FakeChild = <div>test</div>;
    const { mask } = setup(FakeChild);

    expect(mask.contains(FakeChild)).toBe(true);
  });
});
