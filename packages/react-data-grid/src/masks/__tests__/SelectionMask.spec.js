import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import SelectionMask from '../SelectionMask';

describe('SelectionMask', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      selectedPosition: { idx: 0, rowIdx: 3 },
      columns: [
        { width: 50, left: 5 }
      ],
      rowHeight: 30,
      isGroupedRow: false,
      scrollLeft: 0,
      ...propsOverride
    };

    const wrapper = shallow(<SelectionMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should render the CellMask component with correct position for the selected cell', () => {
    const mask = setup();

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

  it('should set cell mask width to be 100% if row is a grouped row', () => {
    const mask = setup({isGroupedRow: true});
    expect(mask.props().width).toBe('100%');
  });

  it('should set cell mask left to be ${scrollLeft} if row is a grouped row', () => {
    const scrollLeft = 120;
    const mask = setup({isGroupedRow: true, scrollLeft});
    expect(mask.props().left).toBe(scrollLeft);
  });
});
