import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import SelectionRangeMask from '../SelectionRangeMask';
import zIndexes from 'common/constants/zIndexes';

describe('SelectionRangeMask', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      selectedRange: {
        topLeft: { idx: 0, rowIdx: 3 },
        bottomRight: { idx: 1, rowIdx: 4 },
        startCell: { idx: 0, rowIdx: 3 },
        cursorCell: { idx: 1, rowIdx: 4 }
      },
      columns: [
        { width: 50, left: 5 },
        { width: 40, left: 55 }
      ],
      rowHeight: 30,
      isGroupedRow: false,
      scrollLeft: 0,
      ...propsOverride
    };

    const wrapper = shallow(<SelectionRangeMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should render the CellMask component with correct position for the selected cells (topLeft->bottomRight)', () => {
    const mask = setup();

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 60, // = rowHeight * 2
        width: 90, // = columns[0].width + columns[1].width
        left: 5, // = left of leftmost column
        top: 90, // = rowHeight * rowIdx of topmost column
        zIndex: zIndexes.CELL_MASK
      })
    );
  });
});
