import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import SelectionMask from '../SelectionMask';
import zIndexes from '../../constants/zIndexes';

describe('SelectionMask', () => {
  const TOP = 45;
  const ROW_HEIGHT = 50;
  const setup = (propsOverride = {}) => {
    const props = {
      selectedPosition: { idx: 0, rowIdx: 3 },
      columns: [
        { width: 50, left: 5 }
      ],
      getSelectedRowHeight: () => ROW_HEIGHT,
      getSelectedRowTop: () => TOP,
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
        height: ROW_HEIGHT,
        width: 50,
        left: 5,
        top: TOP,
        zIndex: zIndexes.CELL_MASK,
        className: 'rdg-selected',
        children: undefined
      })
    );
  });
});
