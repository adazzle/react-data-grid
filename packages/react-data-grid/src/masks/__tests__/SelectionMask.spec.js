import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import SelectionMask from '../SelectionMask';

describe('SelectionMask', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      columns: [
        { width: 50, left: 5 }
      ],
      rowHeight: 30,
      ...propsOverride
    };

    const wrapper = shallow(<SelectionMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should render the CellMask component with correct position for the selected cell', () => {
    const mask = setup({ selectedPosition: { idx: 0, rowIdx: 3 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 30, // = rowHeight
        width: 50,
        left: 5,
        top: 90, // = rowHeight * rowIdx
        zIndex: 1
      })
    );
  });
});
