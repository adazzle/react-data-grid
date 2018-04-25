import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import CopyMask from '../CopyMask';

describe('CopyMask', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      columns: [
        { width: 50, left: 5 }
      ],
      rowHeight: 30,
      ...propsOverride
    };

    const wrapper = shallow(<CopyMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should render a CellMask with correct props for copied cell', () => {
    const mask = setup({ copiedPosition: { idx: 0, rowIdx: 3 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 30,
        width: 50,
        left: 5,
        top: 90,
        zIndex: 1
      })
    );
  });

  it('should not render a CellMask if there is no copied cell', () => {
    const mask = setup(null);

    expect(mask.length).toBe(0);
  });
});
