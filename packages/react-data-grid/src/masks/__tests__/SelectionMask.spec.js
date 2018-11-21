import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import SelectionMask from '../SelectionMask';

describe('SelectionMask', () => {
  const ROW_HEIGHT = 50;
  const setup = (propsOverride = {}) => {
    const props = {
      selectedPosition: { idx: 0, rowIdx: 3 },
      getSelectedDimensions: () => ({
        height: 30,
        width: 50,
        left: 5,
        top: 90
      }),
      ...propsOverride
    };

    const wrapper = shallow(<SelectionMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should render the CellMask component with correct position for the selected cell', () => {
    const mask = setup();

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 30,
        width: 50,
        left: 5,
        top: 90,
        className: 'rdg-selected',
        children: undefined
      })
    );
  });
});
