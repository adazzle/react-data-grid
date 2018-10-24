import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import CopyMask from '../CopyMask';
import zIndexes from 'common/constants/zIndexes';

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

  it('should render the CellMask component with correct position for the copied cell', () => {
    const mask = setup({ copiedPosition: { idx: 0, rowIdx: 3 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 30, // = rowHeight
        width: 50,
        left: 5,
        top: 90, // = rowHeight * rowIdx
        zIndex: zIndexes.CELL_MASK,
        className: 'react-grid-cell-copied'
      })
    );
  });
});
