import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import DragMask from '../DragMask';

describe('DragMask', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      columns: [
        { width: 50, left: 5 }
      ],
      rowHeight: 30,
      ...propsOverride
    };

    const wrapper = shallow(<DragMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should not render the CellMask component if the drag handle is on the same row as the dragged cell', () => {
    const mask = setup({ draggedPosition: { idx: 0, rowIdx: 2, overRowIdx: 2 } });

    expect(mask.length).toBe(0);
  });

  it('should render the CellMask component with correct position for the dragged down cell', () => {
    const mask = setup({ draggedPosition: { idx: 0, rowIdx: 2, overRowIdx: 6 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 120, // rowHeight * (overRowIdx - rowIdx)
        width: 50,
        left: 5,
        top: 90, // = rowHeight * rowIdx
        zIndex: 1
      })
    );
  });

  it('should render the CellMask component with correct position for the dragged up cell', () => {
    const mask = setup({ draggedPosition: { idx: 0, rowIdx: 6, overRowIdx: 4 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 60, // rowHeight * (rowIdx - overRowIdx)
        width: 50,
        left: 5,
        top: 120, // = rowHeight * overRowIdx
        zIndex: 1
      })
    );
  });
});
